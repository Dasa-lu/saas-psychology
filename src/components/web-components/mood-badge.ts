

const getMoodColor = (v: number) =>
    v >= 8 ? '#22c55e' : v >= 6 ? '#eab308' : v >= 4 ? '#f97316' : '#ef4444';

const getAnxietyColor = (v: number) =>
    v >= 8 ? '#ef4444' : v >= 6 ? '#f97316' : v >= 4 ? '#eab308' : '#22c55e';

class MoodBadge extends HTMLElement {
    static get observedAttributes() {
        return ['value', 'type', 'label'];
    }

    private shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    private render() {
        const value = Number(this.getAttribute('value') ?? 0);
        const type = this.getAttribute('type') ?? 'mood';
        const defaultLabel = type === 'anxiety' ? 'Úzkost' : 'Nálada';
        const label = this.getAttribute('label') ?? defaultLabel;

        const color = type === 'anxiety' ? getAnxietyColor(value) : getMoodColor(value);

        this.shadow.innerHTML = `
            <style>
                :host {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 12px;
                    border-radius: 9999px;
                    border: 1.5px solid ${color}55;
                    background: ${color}18;
                    font-family: inherit;
                    font-size: 13px;
                    color: #374151;
                    user-select: none;
                }
                .dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: ${color};
                    flex-shrink: 0;
                }
                .label {
                    color: #6b7280;
                }
                .value {
                    font-weight: 700;
                    color: ${color};
                }
            </style>
            <span class="dot"></span>
            <span class="label">${label}</span>
            <span class="value">${value}/10</span>
        `;
    }
}

if (!customElements.get('mood-badge')) {
    customElements.define('mood-badge', MoodBadge);
}
