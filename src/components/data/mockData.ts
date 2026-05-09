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
            date: new Date(2026, 5, 24),
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
    {
        id: 's1',
        clientId: '1',
        date: new Date(2026, 5, 25),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's2',
        clientId: '3',
        date: new Date(2026, 5, 25),
        startTime: '10:30',
        endTime: '11:30',
        status: 'scheduled'
    },
    {
        id: 's3',
        clientId: '5',
        date: new Date(2026, 5, 25),
        startTime: '14:00',
        endTime: '15:00',
        status: 'scheduled'
    },
    {
        id: 's4',
        clientId: '2',
        date: new Date(2026, 5, 26),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's5',
        clientId: '4',
        date: new Date(2026, 5, 26),
        startTime: '11:00',
        endTime: '12:00',
        status: 'scheduled'
    },
    {
        id: 's6',
        clientId: '1',
        date: new Date(2026, 5, 26),
        startTime: '13:00',
        endTime: '14:00',
        status: 'scheduled'
    },
    {
        id: 's7',
        clientId: '3',
        date: new Date(2026, 5, 27),
        startTime: '10:00',
        endTime: '11:00',
        status: 'scheduled'
    },
    {
        id: 's8',
        clientId: '5',
        date: new Date(2026, 5, 27),
        startTime: '15:00',
        endTime: '16:00',
        status: 'scheduled'
    },

    {
        id: 's9',
        clientId: '2',
        date: new Date(2026, 5, 2),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's10',
        clientId: '4',
        date: new Date(2026, 5, 2),
        startTime: '14:00',
        endTime: '15:00',
        status: 'scheduled'
    },
    {
        id: 's11',
        clientId: '1',
        date: new Date(2026, 5, 3),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's12',
        clientId: '3',
        date: new Date(2026, 5, 3),
        startTime: '11:00',
        endTime: '12:00',
        status: 'scheduled'
    },
    {
        id: 's13',
        clientId: '5',
        date: new Date(2026, 5, 5),
        startTime: '15:00',
        endTime: '16:00',
        status: 'scheduled'
    },

    // Week of May 9–15, 2026
    {
        id: 's14',
        clientId: '1',
        date: new Date(2026, 5, 9),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's15',
        clientId: '2',
        date: new Date(2026, 5, 10),
        startTime: '10:00',
        endTime: '11:00',
        status: 'scheduled'
    },
    {
        id: 's16',
        clientId: '3',
        date: new Date(2026, 5, 11),
        startTime: '11:00',
        endTime: '12:00',
        status: 'scheduled'
    },
    {
        id: 's17',
        clientId: '5',
        date: new Date(2026, 5, 12),
        startTime: '14:00',
        endTime: '15:00',
        status: 'scheduled'
    },

    {
        id: 's18',
        clientId: '1',
        date: new Date(2026, 5, 16),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's19',
        clientId: '4',
        date: new Date(2026, 5, 17),
        startTime: '12:00',
        endTime: '13:00',
        status: 'scheduled'
    },
    {
        id: 's20',
        clientId: '3',
        date: new Date(2026, 4, 18),
        startTime: '10:30',
        endTime: '11:30',
        status: 'scheduled'
    },
    {
        id: 's21',
        clientId: '5',
        date: new Date(2026, 4, 19),
        startTime: '15:00',
        endTime: '16:00',
        status: 'scheduled'
    },

    // Week of May 23–29, 2026
    {
        id: 's22',
        clientId: '2',
        date: new Date(2026, 4, 23),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's23',
        clientId: '1',
        date: new Date(2026, 4, 24),
        startTime: '13:00',
        endTime: '14:00',
        status: 'scheduled'
    },
    {
        id: 's24',
        clientId: '3',
        date: new Date(2026, 4, 25),
        startTime: '10:00',
        endTime: '11:00',
        status: 'scheduled'
    },
    {
        id: 's25',
        clientId: '5',
        date: new Date(2026, 4, 26),
        startTime: '14:00',
        endTime: '15:00',
        status: 'scheduled'
    },

    // Week of May 5–9, 2026 (around today)
    {
        id: 's46',
        clientId: '1',
        date: new Date(2026, 4, 5),
        startTime: '09:00',
        endTime: '10:00',
        status: 'completed'
    },
    {
        id: 's47',
        clientId: '2',
        date: new Date(2026, 4, 6),
        startTime: '10:00',
        endTime: '11:00',
        status: 'completed'
    },
    {
        id: 's48',
        clientId: '3',
        date: new Date(2026, 4, 6),
        startTime: '13:00',
        endTime: '14:00',
        status: 'completed'
    },
    {
        id: 's49',
        clientId: '4',
        date: new Date(2026, 4, 7),
        startTime: '11:00',
        endTime: '12:00',
        status: 'completed'
    },
    {
        id: 's50',
        clientId: '5',
        date: new Date(2026, 4, 7),
        startTime: '15:00',
        endTime: '16:00',
        status: 'completed'
    },
    {
        id: 's51',
        clientId: '1',
        date: new Date(2026, 4, 9),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's52',
        clientId: '3',
        date: new Date(2026, 4, 9),
        startTime: '11:00',
        endTime: '12:00',
        status: 'scheduled'
    },

    // Week of May 12–16, 2026
    {
        id: 's53',
        clientId: '2',
        date: new Date(2026, 4, 12),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's54',
        clientId: '4',
        date: new Date(2026, 4, 12),
        startTime: '14:00',
        endTime: '15:00',
        status: 'scheduled'
    },
    {
        id: 's55',
        clientId: '1',
        date: new Date(2026, 4, 13),
        startTime: '10:00',
        endTime: '11:00',
        status: 'scheduled'
    },
    {
        id: 's56',
        clientId: '5',
        date: new Date(2026, 4, 13),
        startTime: '15:00',
        endTime: '16:00',
        status: 'scheduled'
    },
    {
        id: 's57',
        clientId: '3',
        date: new Date(2026, 4, 14),
        startTime: '11:00',
        endTime: '12:00',
        status: 'scheduled'
    },
    {
        id: 's58',
        clientId: '2',
        date: new Date(2026, 4, 15),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's59',
        clientId: '4',
        date: new Date(2026, 4, 16),
        startTime: '12:00',
        endTime: '13:00',
        status: 'scheduled'
    },
    {
        id: 's60',
        clientId: '1',
        date: new Date(2026, 4, 16),
        startTime: '14:00',
        endTime: '15:00',
        status: 'scheduled'
    },

    {
        id: 's26',
        clientId: '1',
        date: new Date(2026, 4, 30),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's27',
        clientId: '2',
        date: new Date(2026, 4, 31),
        startTime: '10:00',
        endTime: '11:00',
        status: 'scheduled'
    },
    {
        id: 's28',
        clientId: '4',
        date: new Date(2026, 5, 1),
        startTime: '11:00',
        endTime: '12:00',
        status: 'scheduled'
    },
    {
        id: 's29',
        clientId: '5',
        date: new Date(2026, 5, 2),
        startTime: '15:00',
        endTime: '16:00',
        status: 'scheduled'
    },

    // Week of April 6–12, 2026
    {
        id: 's30',
        clientId: '1',
        date: new Date(2026, 5, 6),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's31',
        clientId: '3',
        date: new Date(2026, 5, 7),
        startTime: '10:30',
        endTime: '11:30',
        status: 'scheduled'
    },
    {
        id: 's32',
        clientId: '2',
        date: new Date(2026, 5, 8),
        startTime: '13:00',
        endTime: '14:00',
        status: 'scheduled'
    },
    {
        id: 's33',
        clientId: '5',
        date: new Date(2026, 6, 9),
        startTime: '15:00',
        endTime: '16:00',
        status: 'scheduled'
    },

    // Week of April 13–19, 2026
    {
        id: 's34',
        clientId: '1',
        date: new Date(2026, 6, 13),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's35',
        clientId: '4',
        date: new Date(2026, 6, 14),
        startTime: '11:00',
        endTime: '12:00',
        status: 'scheduled'
    },
    {
        id: 's36',
        clientId: '3',
        date: new Date(2026, 6, 15),
        startTime: '10:00',
        endTime: '11:00',
        status: 'scheduled'
    },
    {
        id: 's37',
        clientId: '5',
        date: new Date(2026, 6, 16),
        startTime: '14:00',
        endTime: '15:00',
        status: 'scheduled'
    },

    // Week of April 20–26, 2026
    {
        id: 's38',
        clientId: '2',
        date: new Date(2026, 6, 20),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's39',
        clientId: '1',
        date: new Date(2026, 6, 21),
        startTime: '13:00',
        endTime: '14:00',
        status: 'scheduled'
    },
    {
        id: 's40',
        clientId: '3',
        date: new Date(2026, 6, 22),
        startTime: '10:30',
        endTime: '11:30',
        status: 'scheduled'
    },
    {
        id: 's41',
        clientId: '5',
        date: new Date(2026, 6, 23),
        startTime: '15:00',
        endTime: '16:00',
        status: 'scheduled'
    },

    {
        id: 's42',
        clientId: '1',
        date: new Date(2026, 6, 27),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
    },
    {
        id: 's43',
        clientId: '2',
        date: new Date(2026, 6, 28),
        startTime: '10:00',
        endTime: '11:00',
        status: 'scheduled'
    },
    {
        id: 's44',
        clientId: '4',
        date: new Date(2026, 6, 29),
        startTime: '11:00',
        endTime: '12:00',
        status: 'scheduled'
    },
    {
        id: 's45',
        clientId: '5',
        date: new Date(2026, 6, 30),
        startTime: '14:00',
        endTime: '15:00',
        status: 'scheduled'
    }
];
