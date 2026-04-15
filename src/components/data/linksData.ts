export type LinkType = 'Video' | 'Článek' | 'Podcast' | 'Nástroj';

export interface ResourceLink {
    id: string;
    title: string;
    description: string;
    url: string;
    type: LinkType;
    source: string;
}

export const resourceLinks: ResourceLink[] = [
    {
        id: 'l1',
        title: 'What is CBT? Cognitive Behavioural Therapy explained',
        description: 'Přehledné vysvětlení kognitivně-behaviorální terapie pro klienty, kteří s ní začínají.',
        url: 'https://www.youtube.com/watch?v=9c_Bv_FBE-c',
        type: 'Video',
        source: 'YouTube',
    },
    {
        id: 'l2',
        title: 'How to Practice Mindfulness',
        description: 'Krátké video s průvodcem mindfulness meditací vhodné pro začátečníky.',
        url: 'https://www.youtube.com/watch?v=inpok4MKVLM',
        type: 'Video',
        source: 'YouTube',
    },
    {
        id: 'l3',
        title: 'Understanding Anxiety Disorders',
        description: 'Odborný článek vysvětlující různé typy úzkostných poruch, příznaky a možnosti léčby.',
        url: 'https://www.psychologytoday.com/us/basics/anxiety',
        type: 'Článek',
        source: 'Psychology Today',
    },
    {
        id: 'l4',
        title: 'The Science of Well-Being',
        description: 'Populární online kurz Yale University o psychologii štěstí a well-beingu.',
        url: 'https://www.coursera.org/learn/the-science-of-well-being',
        type: 'Nástroj',
        source: 'Coursera',
    },
    {
        id: 'l5',
        title: 'Grounding Techniques for Anxiety and PTSD',
        description: 'Praktický článek popisující grounding techniky využitelné při úzkosti a traumatu.',
        url: 'https://www.healthline.com/health/grounding-techniques',
        type: 'Článek',
        source: 'Healthline',
    },
    {
        id: 'l6',
        title: 'The Trauma Therapist Podcast',
        description: 'Podcast věnovaný traumaterapii — rozhovory s předními odborníky z oboru.',
        url: 'https://www.thetraumatherapistproject.com/podcast',
        type: 'Podcast',
        source: 'The Trauma Therapist Project',
    },
    {
        id: 'l7',
        title: 'How to Process Emotions — Therapy in a Nutshell',
        description: 'Video vysvětlující, jak zdravě zpracovávat emoce bez potlačování nebo přetížení.',
        url: 'https://www.youtube.com/watch?v=eE5rbCtJhFo',
        type: 'Video',
        source: 'YouTube',
    },
    {
        id: 'l8',
        title: 'Attachment Theory in Adults',
        description: 'Článek o teorii attachmentu a jejím dopadu na dospělé vztahy.',
        url: 'https://www.simplypsychology.org/attachment.html',
        type: 'Článek',
        source: 'Simply Psychology',
    },
    {
        id: 'l9',
        title: 'Insight Timer — Meditace a mindfulness',
        description: 'Bezplatná aplikace s tisíci řízenými meditacemi, dechová cvičení a spánkové programy.',
        url: 'https://insighttimer.com',
        type: 'Nástroj',
        source: 'Insight Timer',
    },
    {
        id: 'l10',
        title: 'The Mental Illness Happy Hour',
        description: 'Podcast otevřeně hovořící o duševním zdraví, traumatu a závislostech.',
        url: 'https://mentalpod.com',
        type: 'Podcast',
        source: 'Mental Illness Happy Hour',
    },
];

export const linkTypeStyles: Record<LinkType, { bg: string; text: string; border: string }> = {
    'Video':   { bg: '#fef2f2', text: '#b91c1c', border: '#fecaca'},
    'Článek':  { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
    'Podcast': { bg: '#f5f3ff', text: '#6d28d9', border: '#ddd6fe'},
    'Nástroj': { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0'},
};
