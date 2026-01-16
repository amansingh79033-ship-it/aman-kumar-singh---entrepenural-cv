import { createTables } from './db';

export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    try {
        await createTables();
        return new Response(JSON.stringify({ success: true, message: 'Database initialized' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to init db', details: error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
