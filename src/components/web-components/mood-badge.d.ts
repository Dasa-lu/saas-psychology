declare namespace JSX {
    interface IntrinsicElements {
        'mood-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            value?: number | string;
            type?: 'mood' | 'anxiety';
            label?: string;
        };
    }
}
