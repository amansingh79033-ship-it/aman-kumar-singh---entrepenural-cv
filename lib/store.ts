import { create } from 'zustand';

export interface Visit {
    id: string;
    ip: string;
    path: string;
    timestamp: number;
    status: 'active' | 'frozen';
    userAgent: string;
}

export interface ShowcaseItem {
    id: string;
    image: string;
    title: string;
}

export interface Resource {
    id: string;
    name: string;
    url: string;
    type: 'video' | 'image' | 'pdf' | 'archive' | 'other';
    size: number;
    downloads: number;
    uploadedAt: number;
}

export interface VoiceMessage {
    id: string;
    audioUrl: string;
    duration: number;
    timestamp: number;
}

interface AppState {
    visits: Visit[];
    messages: VoiceMessage[];
    frozenIps: string[];
    showcaseItems: ShowcaseItem[];
    resources: Resource[];
    music: MusicItem[];
    activePoemId: string | null;

    // Actions
    fetchData: () => Promise<void>;
    addVisit: (visit: Omit<Visit, 'id' | 'timestamp' | 'status'>) => Promise<void>;
    addMessage: (message: Omit<VoiceMessage, 'id' | 'timestamp'>) => Promise<void>;
    freezeIp: (ip: string) => Promise<void>;
    unfreezeIp: (ip: string) => Promise<void>;
    isIpFrozen: (ip: string) => boolean;

    // UI Helpers (optimistic or local for now, could be server later)
    setShowcaseImage: (id: string, base64: string) => void;
    addShowcaseFrame: (image: string, title: string) => void;
    removeShowcaseFrame: (id: string) => void;
    reorderShowcase: (startIndex: number, endIndex: number) => void;

    toggleVisitStatus: (visitId: string) => Promise<void>;
    addResource: (resource: Omit<Resource, 'id' | 'downloads' | 'uploadedAt'>) => void;
    removeResource: (id: string) => void;
    incrementDownloadCount: (id: string) => void;

    addMusic: (music: Omit<MusicItem, 'id' | 'timestamp'>) => Promise<void>;
    removeMusic: (id: string) => Promise<void>;
    setActivePoemId: (id: string | null) => void;
}

export interface MusicItem {
    id: string;
    title: string;
    artist: string;
    url: string;
    duration: number;
    timestamp: number;
}

export const useStore = create<AppState>((set, get) => ({
    visits: [],
    messages: [],
    frozenIps: [],
    showcaseItems: [],
    resources: [],
    activePoemId: null,

    fetchData: async () => {
        try {
            const res = await fetch('/api/data');
            if (res.ok) {
                const data = await res.json();
                set({
                    visits: data.visits || [],
                    messages: data.messages || [],
                    resources: data.resources || [],
                    showcaseItems: data.showcaseItems || [],
                    frozenIps: data.frozenIps || [],
                    music: data.music || []
                });
            }
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        }
    },

    addVisit: async (data) => {
        // Optimistic update
        const visit: Visit = {
            ...data,
            id: 'temp-' + Date.now(),
            timestamp: Date.now(),
            status: get().frozenIps.includes(data.ip) ? 'frozen' : 'active',
        };
        set((state) => ({ visits: [visit, ...state.visits].slice(0, 1000) }));

        // Server sync
        try {
            await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'addVisit', payload: data })
            });
        } catch (e) {
            console.error("Failed to sync visit", e);
        }
    },

    addMessage: async (data) => {
        // Optimistic
        const message: VoiceMessage = {
            ...data,
            id: 'temp-' + Date.now(),
            timestamp: Date.now(),
        };
        set((state) => ({ messages: [message, ...state.messages] }));

        await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'addMessage', payload: data })
        });
    },

    freezeIp: async (ip) => {
        set((state) => ({
            frozenIps: [...state.frozenIps, ip],
            visits: state.visits.map(v => v.ip === ip ? { ...v, status: 'frozen' } : v)
        }));

        await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'freezeIp', payload: { ip } })
        });
    },

    unfreezeIp: async (ip) => {
        set((state) => ({
            frozenIps: state.frozenIps.filter(i => i !== ip),
            visits: state.visits.map(v => v.ip === ip ? { ...v, status: 'active' } : v)
        }));

        await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'unfreezeIp', payload: { ip } })
        });
    },

    isIpFrozen: (ip) => get().frozenIps.includes(ip),

    // These remain local/demo for now as per minimal implementation requests or extend pattern above
    // Showcase Actions
    setShowcaseImage: async (id, base64) => {
        set((state) => ({
            showcaseItems: state.showcaseItems.map(item =>
                item.id === id ? { ...item, image: base64 } : item
            )
        }));
        await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'setShowcaseImage', payload: { id, image: base64 } })
        });
    },

    addShowcaseFrame: async (image, title) => {
        // Optimistic update
        const tempId = Math.random().toString(36).substr(2, 9);
        set((state) => ({
            showcaseItems: [...state.showcaseItems, { id: tempId, image, title }]
        }));

        await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'addShowcaseFrame', payload: { image, title } })
        });
        // Ideally we'd replace the temp ID with the real one from DB, but for MVP we re-fetch polling
    },

    removeShowcaseFrame: async (id) => {
        set((state) => ({
            showcaseItems: state.showcaseItems.filter(item => item.id !== id)
        }));
        await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'removeShowcaseFrame', payload: { id } })
        });
    },

    reorderShowcase: (startIndex, endIndex) => set((state) => {
        const items = [...state.showcaseItems];
        const [reorderedItem] = items.splice(startIndex, 1);
        items.splice(endIndex, 0, reorderedItem);
        // Note: Reorder persistence is not yet implemented on backend for this MVP
        return { showcaseItems: items };
    }),

    toggleVisitStatus: async (visitId) => {
        const visit = get().visits.find(v => v.id === visitId);
        if (!visit) return;
        const ip = visit.ip;
        if (visit.status === 'active') {
            await get().freezeIp(ip);
        } else {
            await get().unfreezeIp(ip);
        }
    },

    // Resource Actions
    addResource: async (data) => {
        // Optimistic
        set((state) => ({
            resources: [{ ...data, id: 'temp-' + Date.now(), downloads: 0, uploadedAt: Date.now() }, ...state.resources]
        }));

        await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'addResource', payload: data })
        });
    },

    removeResource: async (id) => {
        set((state) => ({
            resources: state.resources.filter(r => r.id !== id)
        }));
        await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'removeResource', payload: { id } })
        });
    },

    incrementDownloadCount: async (id) => {
        set((state) => ({
            resources: state.resources.map(r => r.id === id ? { ...r, downloads: r.downloads + 1 } : r)
        }));
        await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'incrementDownloadCount', payload: { id } })
        });
    },

    music: [],
    addMusic: async (data) => {
        const tempId = 'temp-' + Date.now();
        set((state) => ({
            music: [{ ...data, id: tempId, timestamp: Date.now() }, ...state.music]
        }));
        await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'addMusic', payload: data })
        });
        get().fetchData();
    },

    removeMusic: async (id) => {
        set((state) => ({
            music: state.music.filter(m => m.id !== id)
        }));
        await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'removeMusic', payload: { id } })
        });
    },

    setActivePoemId: (id) => set({ activePoemId: id })
}));
