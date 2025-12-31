
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Visit {
    id: string;
    ip: string;
    path: string;
    timestamp: number;
    status: 'active' | 'frozen';
    userAgent: string;
}

export interface VoiceMessage {
    id: string;
    audioUrl: string;
    timestamp: number;
    duration: number;
}

interface AppState {
    visits: Visit[];
    messages: VoiceMessage[];
    frozenIps: string[];
    addVisit: (visit: Omit<Visit, 'id' | 'timestamp' | 'status'>) => void;
    addMessage: (message: Omit<VoiceMessage, 'id' | 'timestamp'>) => void;
    freezeIp: (ip: string) => void;
    unfreezeIp: (ip: string) => void;
    isIpFrozen: (ip: string) => boolean;
}

// NOTE: Using Zustand for local persistence simulation as backend is not available
// This can be easily migrated to Firebase/Supabase
export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            visits: [],
            messages: [],
            frozenIps: [],
            addVisit: (data) => {
                const visit: Visit = {
                    ...data,
                    id: Math.random().toString(36).substr(2, 9),
                    timestamp: Date.now(),
                    status: get().frozenIps.includes(data.ip) ? 'frozen' : 'active',
                };
                set((state) => ({ visits: [visit, ...state.visits].slice(0, 1000) }));
            },
            addMessage: (data) => {
                const message: VoiceMessage = {
                    ...data,
                    id: Math.random().toString(36).substr(2, 9),
                    timestamp: Date.now(),
                };
                set((state) => ({ messages: [message, ...state.messages] }));
            },
            freezeIp: (ip) => set((state) => ({
                frozenIps: [...state.frozenIps, ip],
                visits: state.visits.map(v => v.ip === ip ? { ...v, status: 'frozen' } : v)
            })),
            unfreezeIp: (ip) => set((state) => ({
                frozenIps: state.frozenIps.filter(i => i !== ip),
                visits: state.visits.map(v => v.ip === ip ? { ...v, status: 'active' } : v)
            })),
            isIpFrozen: (ip) => get().frozenIps.includes(ip),
        }),
        {
            name: 'archive-storage',
        }
    )
);
