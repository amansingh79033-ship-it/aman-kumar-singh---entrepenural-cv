import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Mock database storage for local development
let db = {
    visits: [],
    messages: [],
    resources: [],
    showcaseItems: [],
    frozenIps: []
};

app.get('/api/data', (req, res) => {
    console.log('GET /api/data');
    res.json(db);
});

app.post('/api/data', (req, res) => {
    const { action, payload } = req.body;
    console.log(`POST /api/data - Action: ${action}`, payload);

    switch (action) {
        case 'addVisit':
            const newVisit = {
                ...payload,
                id: Date.now().toString(),
                timestamp: Date.now(),
                status: db.frozenIps.includes(payload.ip) ? 'frozen' : 'active'
            };
            db.visits.unshift(newVisit);
            if (db.visits.length > 1000) db.visits.pop();
            break;

        case 'addMessage':
            db.messages.unshift({
                ...payload,
                id: Date.now().toString(),
                timestamp: Date.now()
            });
            break;

        case 'freezeIp':
            if (!db.frozenIps.includes(payload.ip)) {
                db.frozenIps.push(payload.ip);
            }
            db.visits = db.visits.map(v => v.ip === payload.ip ? { ...v, status: 'frozen' } : v);
            break;

        case 'unfreezeIp':
            db.frozenIps = db.frozenIps.filter(ip => ip !== payload.ip);
            db.visits = db.visits.map(v => v.ip === payload.ip ? { ...v, status: 'active' } : v);
            break;

        case 'addResource':
            db.resources.unshift({
                ...payload,
                id: Date.now().toString(),
                downloads: 0,
                uploadedAt: Date.now()
            });
            break;

        case 'removeResource':
            db.resources = db.resources.filter(r => r.id !== payload.id);
            break;

        case 'incrementDownloadCount':
            db.resources = db.resources.map(r => r.id === payload.id ? { ...r, downloads: r.downloads + 1 } : r);
            break;

        case 'addShowcaseFrame':
            db.showcaseItems.push({
                ...payload,
                id: Date.now().toString()
            });
            break;

        case 'removeShowcaseFrame':
            db.showcaseItems = db.showcaseItems.filter(item => item.id !== payload.id);
            break;

        case 'setShowcaseImage':
            db.showcaseItems = db.showcaseItems.map(item => item.id === payload.id ? { ...item, image: payload.image } : item);
            break;

        default:
            return res.status(400).json({ error: 'Unknown action' });
    }

    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Dev API server listening at http://localhost:${port}`);
});
