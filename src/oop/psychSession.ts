// Prototypová dědičnost
interface IPsychSession {
    clientName: string;
    date: string;
    getSummary(): string;
}

interface IGroupSession extends IPsychSession {
    participants: string[];
}

function PsychSession(this: IPsychSession, clientName: string, date: string) {
    this.clientName = clientName;
    this.date = date;
}

PsychSession.prototype.getSummary = function (this: IPsychSession): string {
    return `Sezení ${this.date} — klient: ${this.clientName}`;
};

function GroupSession(this: IGroupSession, participants: string[], date: string) {
    (PsychSession as unknown as (this: IPsychSession, clientName: string, date: string) => void)
        .call(this, 'Skupina', date);
    this.participants = participants;
}

GroupSession.prototype = Object.create(PsychSession.prototype);
GroupSession.prototype.constructor = GroupSession;

GroupSession.prototype.getSummary = function (this: IGroupSession): string {
    return PsychSession.prototype.getSummary.call(this) +
        ` | účastníci: ${this.participants.join(', ')}`;
};

const s = new (PsychSession as unknown as new (clientName: string, date: string) => IPsychSession)('Jana Nováková', '2026-05-10');
const g = new (GroupSession as unknown as new (participants: string[], date: string) => IGroupSession)(['Petr', 'Eva', 'Tomáš'], '2026-05-10');

console.log('[OOP] Individuální:', s.getSummary());
console.log('[OOP] Skupinové:', g.getSummary());
console.log('[OOP] instanceof PsychSession:', g instanceof (PsychSession as unknown as new () => IPsychSession));

// Helper used by components — creates a PsychSession and returns its summary
export function getSessionLabel(clientName: string, date: string): string {
    return new (PsychSession as unknown as new (clientName: string, date: string) => IPsychSession)(clientName, date).getSummary();
}

export { PsychSession, GroupSession };
