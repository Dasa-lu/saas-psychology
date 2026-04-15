export type HomeworkCategory =
    | 'Úzkost'
    | 'Vztahy'
    | 'Trauma'
    | 'Deprese'
    | 'Mindfulness'
    | 'Sociální dovednosti';

export interface Homework {
    id: string;
    title: string;
    description: string;
    category: HomeworkCategory;
}

export const homeworks: Homework[] = [
    {
        id: 'hw1',
        title: 'Deník úzkosti',
        description: 'Každý den zapsat situace, které vyvolaly úzkost, její intenzitu (1–10) a co ji spustilo.',
        category: 'Úzkost',
    },
    {
        id: 'hw2',
        title: 'Dechová cvičení',
        description: 'Třikrát denně provést 5minutové dechové cvičení (4-7-8 technika) a zapsat pocity před a po.',
        category: 'Úzkost',
    },
    {
        id: 'hw3',
        title: 'Postupná expozice',
        description: 'Každý den vybrat jednu mírně stresující sociální situaci a záměrně ji absolvovat. Zapsat reakci.',
        category: 'Sociální dovednosti',
    },
    {
        id: 'hw4',
        title: 'Aktivní naslouchání',
        description: 'Během rozhovoru s blízkým se soustředit pouze na poslouchání bez přerušování. Zapsat co bylo těžké.',
        category: 'Vztahy',
    },
    {
        id: 'hw5',
        title: 'Dopis partnerovi',
        description: 'Napsat dopis partnerovi o jedné věci, která vám ve vztahu chybí — bez výčitek, z pohledu vlastních potřeb.',
        category: 'Vztahy',
    },
    {
        id: 'hw6',
        title: 'Grounding technika 5-4-3-2-1',
        description: 'Při pocitu přemožení pojmenovat 5 věcí viditelných, 4 hmatatelné, 3 slyšitelné, 2 čichatelné, 1 chuť.',
        category: 'Trauma',
    },
    {
        id: 'hw7',
        title: 'Bezpečné místo',
        description: 'Každý večer 10 minut vizualizovat bezpečné místo — popsat ho písemně co nejpodrobněji.',
        category: 'Trauma',
    },
    {
        id: 'hw8',
        title: 'Deník pozitivních věcí',
        description: 'Každý večer zapsat tři věci, které se ten den povedly nebo přinesly radost, i ty nejmenší.',
        category: 'Deprese',
    },
    {
        id: 'hw9',
        title: 'Pohyb venku',
        description: 'Každý den alespoň 20 minut chůze venku. Zapsat náladu před a po procházce.',
        category: 'Deprese',
    },
    {
        id: 'hw10',
        title: 'Body scan meditace',
        description: 'Každý večer 10minutová meditace zaměřená na skenování těla — sledovat napětí bez hodnocení.',
        category: 'Mindfulness',
    },
    {
        id: 'hw11',
        title: 'Vědomé jídlo',
        description: 'Jedno jídlo denně sníst bez telefonu či televize, plně soustředěně — vnímat chutě, textury, vůně.',
        category: 'Mindfulness',
    },
    {
        id: 'hw12',
        title: 'Navázání kontaktu',
        description: 'Tento týden oslovit jednoho člověka, se kterým byl přerušen kontakt — zpráva, hovor nebo setkání.',
        category: 'Sociální dovednosti',
    },
];

export const categoryColors: Record<HomeworkCategory, { bg: string; text: string; border: string }> = {
    'Úzkost':              { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
    'Vztahy':              { bg: '#fdf4ff', text: '#7e22ce', border: '#e9d5ff' },
    'Trauma':              { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
    'Deprese':             { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
    'Mindfulness':         { bg: '#f0fdfa', text: '#0f766e', border: '#99f6e4' },
    'Sociální dovednosti': { bg: '#fefce8', text: '#a16207', border: '#fde68a' },
};
