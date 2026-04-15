import {type Client, clients, type Session, sessions} from "./mockData.ts";

export function getClientById(id: string): Client | undefined {
    return clients.find(client => client.id === id);
}

export function getSessionsForDate(date: Date): Session[] {
    return sessions.filter(session =>
        session.date.getDate() === date.getDate() &&
        session.date.getMonth() === date.getMonth() &&
        session.date.getFullYear() === date.getFullYear()
    );
}

export function getClientsForDate(date: Date): Client[] {
    const dateSessions = getSessionsForDate(date);
    return dateSessions.map(session =>
        clients.find(client => client.id === session.clientId)
    ).filter(Boolean) as Client[];
}

export function getDatesWithSessions(): Date[] {
    return sessions.map(session => session.date);
}