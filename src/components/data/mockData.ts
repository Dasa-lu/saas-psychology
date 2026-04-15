export interface Client {
    id: string;
    name: string;
    mainTopic: string;
    currentHomework: string;
    lastCheckIn: {
        mood: number; // 1-10 scale
        anxiety: number; // 1-10 scale
        date: Date;
        notes?: string;
    };
    sessions: Session[];
    contactInfo?: {
        email: string;
        phone: string;
    };
    startDate: Date;
    color: string; // Avatar and session color
    status: 'active' | 'pending' | 'completed';
}

export interface Session {
    id: string;
    clientId: string;
    date: Date;
    startTime: string;
    endTime: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    notes?: string;
}

export const clients: Client[] = [
    {
        id: '1',
        name: 'Jana Nováková',
        mainTopic: 'Úzkost a stres v práci',
        currentHomework: 'Vést deník situací vyvolávajících úzkost po dobu týdne',
        lastCheckIn: {
            mood: 6,
            anxiety: 7,
            date: new Date(2026, 3, 23),
            notes: 'Lepší týden, stále problémy s prezentacemi'
        },
        sessions: [],
        contactInfo: {
            email: 'jana.novakova@email.cz',
            phone: '+420 123 456 789'
        },
        startDate: new Date(2025, 3, 25),
        color: 'purple',
        status: 'active'
    },
    {
        id: '2',
        name: 'Petr Svoboda',
        mainTopic: 'Vztahové potíže, komunikace v manželství',
        currentHomework: 'Praktikovat aktivní naslouchání s partnerkou 2x denně',
        lastCheckIn: {
            mood: 7,
            anxiety: 4,
            date: new Date(2026, 3, 22),
            notes: 'Pokrok v komunikaci s manželkou'
        },
        sessions: [],
        contactInfo: {
            email: 'p.svoboda@email.cz',
            phone: '+420 234 567 890'
        },
        startDate: new Date(2026, 3, 15),
        color: 'blue',
        status: 'active'
    },
    {
        id: '3',
        name: 'Marie Dvořáková',
        mainTopic: 'Deprese a ztráta motivace',
        currentHomework: 'Každý den 30 minut venku + zápis 3 pozitivních věcí',
        lastCheckIn: {
            mood: 4,
            anxiety: 6,
            date: new Date(2026, 1, 24),
            notes: 'Náročný týden, ale dodržuje cvičení'
        },
        sessions: [],
        contactInfo: {
            email: 'marie.dvorakova@email.cz',
            phone: '+420 345 678 901'
        },
        startDate: new Date(2026, 0, 8),
        color: 'green',
        status: 'active'
    },
    {
        id: '4',
        name: 'Tomáš Černý',
        mainTopic: 'Panic disorder, sociální fobie',
        currentHomework: 'Dechová cvičení 3x denně + postupná expozice sociálním situacím',
        lastCheckIn: {
            mood: 5,
            anxiety: 8,
            date: new Date(2026, 1, 21),
            notes: 'Měl panický záchvat v obchodě'
        },
        sessions: [],
        contactInfo: {
            email: 'tomas.cerny@email.cz',
            phone: '+420 456 789 012'
        },
        startDate: new Date(2025, 10, 20),
        color: 'orange',
        status: 'pending'
    },
    {
        id: '5',
        name: 'Lenka Procházková',
        mainTopic: 'Trauma z dětství, PTSD',
        currentHomework: 'Pokračovat v grounding technikách při flashbackech',
        lastCheckIn: {
            mood: 6,
            anxiety: 7,
            date: new Date(2026, 1, 25),
            notes: 'Lepší spánek, méně nočních můr'
        },
        sessions: [],
        contactInfo: {
            email: 'lenka.prochazkova@email.cz',
            phone: '+420 567 890 123'
        },
        startDate: new Date(2026, 1, 1),
        color: 'pink',
        status: 'active'
    }
];

export const sessions: Session[] = [
    // February 25, 2026
    {
        id: 's1',
        clientId: '1',
        date: new Date(2026, 1, 25),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's2',
        clientId: '3',
        date: new Date(2026, 1, 25),
        startTime: '10:30',
        endTime: '11:30',
        status: 'scheduled'
    },
    {
        id: 's3',
        clientId: '5',
        date: new Date(2026, 1, 25),
        startTime: '14:00',
        endTime: '15:00',
        status: 'scheduled'
    },
    // February 26, 2026
    {
        id: 's4',
        clientId: '2',
        date: new Date(2026, 1, 26),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's5',
        clientId: '4',
        date: new Date(2026, 1, 26),
        startTime: '11:00',
        endTime: '12:00',
        status: 'scheduled'
    },
    {
        id: 's6',
        clientId: '1',
        date: new Date(2026, 1, 26),
        startTime: '13:00',
        endTime: '14:00',
        status: 'scheduled'
    },
    // February 27, 2026
    {
        id: 's7',
        clientId: '3',
        date: new Date(2026, 1, 27),
        startTime: '10:00',
        endTime: '11:00',
        status: 'scheduled'
    },
    {
        id: 's8',
        clientId: '5',
        date: new Date(2026, 1, 27),
        startTime: '15:00',
        endTime: '16:00',
        status: 'scheduled'
    },

    // Week of March 2–8, 2026
    {
        id: 's9',
        clientId: '2',
        date: new Date(2026, 2, 2),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's10',
        clientId: '4',
        date: new Date(2026, 2, 2),
        startTime: '14:00',
        endTime: '15:00',
        status: 'scheduled'
    },
    {
        id: 's11',
        clientId: '1',
        date: new Date(2026, 2, 3),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's12',
        clientId: '3',
        date: new Date(2026, 2, 3),
        startTime: '11:00',
        endTime: '12:00',
        status: 'scheduled'
    },
    {
        id: 's13',
        clientId: '5',
        date: new Date(2026, 2, 5),
        startTime: '15:00',
        endTime: '16:00',
        status: 'scheduled'
    },

    // Week of March 9–15, 2026
    {
        id: 's14',
        clientId: '1',
        date: new Date(2026, 2, 9),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's15',
        clientId: '2',
        date: new Date(2026, 2, 10),
        startTime: '10:00',
        endTime: '11:00',
        status: 'scheduled'
    },
    {
        id: 's16',
        clientId: '3',
        date: new Date(2026, 2, 11),
        startTime: '11:00',
        endTime: '12:00',
        status: 'scheduled'
    },
    {
        id: 's17',
        clientId: '5',
        date: new Date(2026, 2, 12),
        startTime: '14:00',
        endTime: '15:00',
        status: 'scheduled'
    },

    // Week of March 16–22, 2026
    {
        id: 's18',
        clientId: '1',
        date: new Date(2026, 2, 16),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's19',
        clientId: '4',
        date: new Date(2026, 2, 17),
        startTime: '12:00',
        endTime: '13:00',
        status: 'scheduled'
    },
    {
        id: 's20',
        clientId: '3',
        date: new Date(2026, 2, 18),
        startTime: '10:30',
        endTime: '11:30',
        status: 'scheduled'
    },
    {
        id: 's21',
        clientId: '5',
        date: new Date(2026, 2, 19),
        startTime: '15:00',
        endTime: '16:00',
        status: 'scheduled'
    },

    // Week of March 23–29, 2026
    {
        id: 's22',
        clientId: '2',
        date: new Date(2026, 2, 23),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's23',
        clientId: '1',
        date: new Date(2026, 2, 24),
        startTime: '13:00',
        endTime: '14:00',
        status: 'scheduled'
    },
    {
        id: 's24',
        clientId: '3',
        date: new Date(2026, 2, 25),
        startTime: '10:00',
        endTime: '11:00',
        status: 'scheduled'
    },
    {
        id: 's25',
        clientId: '5',
        date: new Date(2026, 2, 26),
        startTime: '14:00',
        endTime: '15:00',
        status: 'scheduled'
    },

    // Week of March 30 – April 5, 2026
    {
        id: 's26',
        clientId: '1',
        date: new Date(2026, 2, 30),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's27',
        clientId: '2',
        date: new Date(2026, 2, 31),
        startTime: '10:00',
        endTime: '11:00',
        status: 'scheduled'
    },
    {
        id: 's28',
        clientId: '4',
        date: new Date(2026, 3, 1),
        startTime: '11:00',
        endTime: '12:00',
        status: 'scheduled'
    },
    {
        id: 's29',
        clientId: '5',
        date: new Date(2026, 3, 2),
        startTime: '15:00',
        endTime: '16:00',
        status: 'scheduled'
    },

    // Week of April 6–12, 2026
    {
        id: 's30',
        clientId: '1',
        date: new Date(2026, 3, 6),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's31',
        clientId: '3',
        date: new Date(2026, 3, 7),
        startTime: '10:30',
        endTime: '11:30',
        status: 'scheduled'
    },
    {
        id: 's32',
        clientId: '2',
        date: new Date(2026, 3, 8),
        startTime: '13:00',
        endTime: '14:00',
        status: 'scheduled'
    },
    {
        id: 's33',
        clientId: '5',
        date: new Date(2026, 3, 9),
        startTime: '15:00',
        endTime: '16:00',
        status: 'scheduled'
    },

    // Week of April 13–19, 2026
    {
        id: 's34',
        clientId: '1',
        date: new Date(2026, 3, 13),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's35',
        clientId: '4',
        date: new Date(2026, 3, 14),
        startTime: '11:00',
        endTime: '12:00',
        status: 'scheduled'
    },
    {
        id: 's36',
        clientId: '3',
        date: new Date(2026, 3, 15),
        startTime: '10:00',
        endTime: '11:00',
        status: 'scheduled'
    },
    {
        id: 's37',
        clientId: '5',
        date: new Date(2026, 3, 16),
        startTime: '14:00',
        endTime: '15:00',
        status: 'scheduled'
    },

    // Week of April 20–26, 2026
    {
        id: 's38',
        clientId: '2',
        date: new Date(2026, 3, 20),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's39',
        clientId: '1',
        date: new Date(2026, 3, 21),
        startTime: '13:00',
        endTime: '14:00',
        status: 'scheduled'
    },
    {
        id: 's40',
        clientId: '3',
        date: new Date(2026, 3, 22),
        startTime: '10:30',
        endTime: '11:30',
        status: 'scheduled'
    },
    {
        id: 's41',
        clientId: '5',
        date: new Date(2026, 3, 23),
        startTime: '15:00',
        endTime: '16:00',
        status: 'scheduled'
    },

    // Week of April 27 – May 3, 2026
    {
        id: 's42',
        clientId: '1',
        date: new Date(2026, 3, 27),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's43',
        clientId: '2',
        date: new Date(2026, 3, 28),
        startTime: '10:00',
        endTime: '11:00',
        status: 'scheduled'
    },
    {
        id: 's44',
        clientId: '4',
        date: new Date(2026, 3, 29),
        startTime: '11:00',
        endTime: '12:00',
        status: 'scheduled'
    },
    {
        id: 's45',
        clientId: '5',
        date: new Date(2026, 3, 30),
        startTime: '14:00',
        endTime: '15:00',
        status: 'scheduled'
    }
];


// export function getClientById(id: string): Client | undefined {
//     return clients.find(client => client.id === id);
// }
//
// export function getSessionsForDate(date: Date): Session[] {
//     return sessions.filter(session =>
//         session.date.getDate() === date.getDate() &&
//         session.date.getMonth() === date.getMonth() &&
//         session.date.getFullYear() === date.getFullYear()
//     );
// }
//
// export function getClientsForDate(date: Date): Client[] {
//     const dateSessions = getSessionsForDate(date);
//     return dateSessions.map(session =>
//         clients.find(client => client.id === session.clientId)
//     ).filter(Boolean) as Client[];
// }
//
// export function getDatesWithSessions(): Date[] {
//     return sessions.map(session => session.date);
// }