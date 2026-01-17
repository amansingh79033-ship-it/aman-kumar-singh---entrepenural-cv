export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    try {
        const { password } = await request.json();

        if (password === 'aman2025@#') {
            // In a real app, you would return a secure HttpOnly cookie here.
            // For this simple version, we'll return a success token.
            return new Response(JSON.stringify({ success: true, token: 'authenticated_session_token' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ success: false, error: 'Invalid credentials' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
