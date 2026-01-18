import { sql, createTables } from './db';

export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    try {
        if (request.method === 'GET') {
            try {
                const { rows: visitsRaw } = await sql`SELECT * FROM visits ORDER BY timestamp DESC LIMIT 1000`;
                const { rows: messagesRaw } = await sql`SELECT * FROM messages ORDER BY timestamp DESC`;
                const { rows: resourcesRaw } = await sql`SELECT * FROM resources ORDER BY uploaded_at DESC`;
                const { rows: showcaseItemsRaw } = await sql`SELECT * FROM showcase_items ORDER BY sort_order ASC`;
                const { rows: frozenIps } = await sql`SELECT ip FROM frozen_ips`;

                return new Response(JSON.stringify({
                    visits: (visitsRaw || []).map(v => ({ ...v, userAgent: v.user_agent })),
                    messages: (messagesRaw || []).map(m => ({ ...m, audioUrl: m.audio_url })),
                    resources: (resourcesRaw || []).map(r => ({ ...r, uploadedAt: r.uploaded_at })),
                    showcaseItems: showcaseItemsRaw || [],
                    frozenIps: (frozenIps || []).map(row => row.ip)
                }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
                });
            } catch (dbError: any) {
                // If tables don't exist, try creating them once
                if (dbError.message?.includes('relation') || dbError.message?.includes('does not exist')) {
                    console.log('Tables missing, initializing...');
                    await createTables();
                    return new Response(JSON.stringify({
                        visits: [], messages: [], resources: [], showcaseItems: [], frozenIps: []
                    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
                }
                throw dbError;
            }
        } else if (request.method === 'POST') {
            const body = await request.json();
            const { action, payload } = body;

            if (action === 'addVisit') {
                const { ip, path, userAgent } = payload;
                await sql`INSERT INTO visits (ip, path, timestamp, status, user_agent) VALUES (${ip}, ${path}, ${Date.now()}, 'active', ${userAgent || ''})`;
            }
            // ... rest of the handlers
            else if (action === 'addMessage') {
                const { audioUrl, duration } = payload;
                await sql`INSERT INTO messages (audio_url, duration, timestamp) VALUES (${audioUrl}, ${duration}, ${Date.now()})`;
            }
            else if (action === 'freezeIp') {
                const { ip } = payload;
                await sql`INSERT INTO frozen_ips (ip) VALUES (${ip}) ON CONFLICT DO NOTHING`;
                await sql`UPDATE visits SET status = 'frozen' WHERE ip = ${ip}`;
            }
            else if (action === 'unfreezeIp') {
                const { ip } = payload;
                await sql`DELETE FROM frozen_ips WHERE ip = ${ip}`;
                await sql`UPDATE visits SET status = 'active' WHERE ip = ${ip}`;
            }
            else if (action === 'addResource') {
                const { name, url, type, size } = payload;
                await sql`INSERT INTO resources (name, url, type, size, downloads, uploaded_at) VALUES (${name}, ${url}, ${type}, ${size}, 0, ${Date.now()})`;
            }
            else if (action === 'removeResource') {
                const { id } = payload;
                await sql`DELETE FROM resources WHERE id = ${id}`;
            }
            else if (action === 'incrementDownloadCount') {
                const { id } = payload;
                await sql`UPDATE resources SET downloads = downloads + 1 WHERE id = ${id}`;
            }
            else if (action === 'addShowcaseFrame') {
                const { image, title } = payload;
                const { rows } = await sql`SELECT MAX(sort_order) as max_order FROM showcase_items`;
                const nextOrder = (rows[0]?.max_order || 0) + 1;
                await sql`INSERT INTO showcase_items (image, title, sort_order) VALUES (${image}, ${title}, ${nextOrder})`;
            }
            else if (action === 'removeShowcaseFrame') {
                const { id } = payload;
                await sql`DELETE FROM showcase_items WHERE id = ${id}`;
            }
            else if (action === 'setShowcaseImage') {
                const { id, image } = payload;
                await sql`UPDATE showcase_items SET image = ${image} WHERE id = ${id}`;
            }

            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
