import { useEffect, useState } from 'react';

export function OfflineIndicator() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const goOnline = () => setIsOnline(true);
        const goOffline = () => setIsOnline(false);
        window.addEventListener('online', goOnline);
        window.addEventListener('offline', goOffline);
        return () => {
            window.removeEventListener('online', goOnline);
            window.removeEventListener('offline', goOffline);
        };
    }, []);

    if (isOnline) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            background: '#f97316',
            color: 'white',
            textAlign: 'center',
            padding: '8px 16px',
            zIndex: 9999,
            fontSize: '14px',
            fontWeight: 500,
        }}>
            Jste offline – aplikace pracuje s lokálními daty.
        </div>
    );
}
