import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { clients as initialClients, sessions as initialSessions, type Client, type Session } from '../components/data/mockData';

interface DataContextValue {
    clients: Client[];
    sessions: Session[];
    addClient: (client: Client) => void;
    addSession: (session: Session) => void;
    updateSession: (updated: Session) => void;
}

const DataContext = createContext<DataContextValue | null>(null);

const LS_CLIENTS = 'psych_clients';
const LS_SESSIONS = 'psych_sessions';

function reviveDates<T>(obj: T): T {
    if (Array.isArray(obj)) return obj.map(reviveDates) as unknown as T;
    if (obj && typeof obj === 'object') {
        const result: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
            if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(v)) {
                result[k] = new Date(v);
            } else {
                result[k] = reviveDates(v);
            }
        }
        return result as T;
    }
    return obj;
}

function loadFromStorage<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        if (raw) return reviveDates(JSON.parse(raw) as T);
    } catch { /* empty */ }
    return fallback;
}

export function DataProvider({ children }: { children: ReactNode }) {
    const [clients, setClients] = useState<Client[]>(() =>
        loadFromStorage(LS_CLIENTS, initialClients)
    );
    const [sessions, setSessions] = useState<Session[]>(() =>
        loadFromStorage(LS_SESSIONS, initialSessions)
    );

    useEffect(() => {
        localStorage.setItem(LS_CLIENTS, JSON.stringify(clients));
    }, [clients]);

    useEffect(() => {
        localStorage.setItem(LS_SESSIONS, JSON.stringify(sessions));
    }, [sessions]);

    const addClient = (client: Client) => setClients(prev => [...prev, client]);
    const addSession = (session: Session) => setSessions(prev => [...prev, session]);
    const updateSession = (updated: Session) => setSessions(prev => prev.map(s => s.id === updated.id ? updated : s));

    return (
        <DataContext.Provider value={{ clients, sessions, addClient, addSession, updateSession }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData(): DataContextValue {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error('useData must be used inside DataProvider');
    return ctx;
}
