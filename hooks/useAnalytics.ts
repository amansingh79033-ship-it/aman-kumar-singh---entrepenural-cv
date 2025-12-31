
import { useEffect } from 'react';
import { useStore } from '../lib/store';

export const useAnalytics = (path: string) => {
    const addVisit = useStore(state => state.addVisit);
    const isIpFrozen = useStore(state => state.isIpFrozen);

    useEffect(() => {
        const track = async () => {
            try {
                // Fetch public IP
                const res = await fetch('https://api.ipify.org?format=json');
                const data = await res.json();
                const ip = data.ip;

                // Check if frozen
                if (isIpFrozen(ip)) {
                    // You could overlay a "Access Revoked" screen here
                    console.warn(`Access denied for node ${ip}`);
                    if (window.location.pathname !== '/frozen') {
                        // window.location.href = '/frozen'; // Redirect or handle as needed
                    }
                    return;
                }

                addVisit({
                    ip,
                    path,
                    userAgent: navigator.userAgent
                });
            } catch (err) {
                // Fallback for local/no connection
                addVisit({
                    ip: '127.0.0.1',
                    path,
                    userAgent: navigator.userAgent
                });
            }
        };

        track();
    }, [path, addVisit, isIpFrozen]);
};
