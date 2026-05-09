import { useEffect, useRef } from 'react';

interface MoodChartProps {
    mood: number;
    anxiety: number;
}

const SVG_NS = 'http://www.w3.org/2000/svg';

const getMoodColor = (v: number) =>
    v >= 8 ? '#22c55e' : v >= 6 ? '#eab308' : v >= 4 ? '#f97316' : '#ef4444';

const getAnxietyColor = (v: number) =>
    v >= 8 ? '#ef4444' : v >= 6 ? '#f97316' : v >= 4 ? '#eab308' : '#22c55e';

export function MoodChart({ mood, anxiety }: MoodChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        while (svg.firstChild) svg.removeChild(svg.firstChild);

        const BAR_W = 44;
        const GAP = 36;
        const MAX_BAR_H = 80;
        const BASE_Y = 100;
        const START_X = 28;

        const data = [
            { label: 'Nálada', value: mood, color: getMoodColor(mood) },
            { label: 'Úzkost', value: anxiety, color: getAnxietyColor(anxiety) },
        ];

        const tooltip = document.createElementNS(SVG_NS, 'g');
        tooltip.setAttribute('visibility', 'hidden');
        tooltip.setAttribute('pointer-events', 'none');

        const tooltipBg = document.createElementNS(SVG_NS, 'rect');
        tooltipBg.setAttribute('width', '90');
        tooltipBg.setAttribute('height', '22');
        tooltipBg.setAttribute('rx', '5');
        tooltipBg.setAttribute('fill', '#1f2937');
        tooltipBg.setAttribute('opacity', '0.88');

        const tooltipText = document.createElementNS(SVG_NS, 'text');
        tooltipText.setAttribute('x', '45');
        tooltipText.setAttribute('y', '15');
        tooltipText.setAttribute('text-anchor', 'middle');
        tooltipText.setAttribute('font-size', '11');
        tooltipText.setAttribute('fill', 'white');
        tooltipText.setAttribute('font-family', 'inherit');
        tooltipText.textContent = '';

        tooltip.appendChild(tooltipBg);
        tooltip.appendChild(tooltipText);

        data.forEach((item, i) => {
            const x = START_X + i * (BAR_W + GAP);
            const barH = Math.max(4, (item.value / 10) * MAX_BAR_H);
            const y = BASE_Y - barH;

            const rect = document.createElementNS(SVG_NS, 'rect');
            rect.setAttribute('x', String(x));
            rect.setAttribute('y', String(y));
            rect.setAttribute('width', String(BAR_W));
            rect.setAttribute('height', String(barH));
            rect.setAttribute('rx', '5');
            rect.setAttribute('fill', item.color);
            rect.style.cursor = 'pointer';
            rect.style.transition = 'opacity 0.15s';

            rect.addEventListener('mouseenter', () => {
                rect.setAttribute('opacity', '0.72');
                tooltipText.textContent = `${item.label}: ${item.value}/10`;
                tooltip.setAttribute('transform', `translate(${x + BAR_W / 2 - 45}, ${y - 28})`);
                tooltip.setAttribute('visibility', 'visible');
            });
            rect.addEventListener('mouseleave', () => {
                rect.setAttribute('opacity', '1');
                tooltip.setAttribute('visibility', 'hidden');
            });

            svg.appendChild(rect);

            const valText = document.createElementNS(SVG_NS, 'text');
            valText.setAttribute('x', String(x + BAR_W / 2));
            valText.setAttribute('y', String(y - 6));
            valText.setAttribute('text-anchor', 'middle');
            valText.setAttribute('font-size', '13');
            valText.setAttribute('font-weight', '700');
            valText.setAttribute('fill', item.color);
            valText.setAttribute('font-family', 'inherit');
            valText.textContent = String(item.value);
            svg.appendChild(valText);

            const labelText = document.createElementNS(SVG_NS, 'text');
            labelText.setAttribute('x', String(x + BAR_W / 2));
            labelText.setAttribute('y', String(BASE_Y + 16));
            labelText.setAttribute('text-anchor', 'middle');
            labelText.setAttribute('font-size', '11');
            labelText.setAttribute('fill', '#6b7280');
            labelText.setAttribute('font-family', 'inherit');
            labelText.textContent = item.label;
            svg.appendChild(labelText);
        });

        const line = document.createElementNS(SVG_NS, 'line');
        line.setAttribute('x1', String(START_X - 8));
        line.setAttribute('y1', String(BASE_Y));
        line.setAttribute('x2', String(START_X + 2 * BAR_W + GAP + 8));
        line.setAttribute('y2', String(BASE_Y));
        line.setAttribute('stroke', '#e5e7eb');
        line.setAttribute('stroke-width', '1.5');
        svg.insertBefore(line, svg.firstChild);

        svg.appendChild(tooltip);
    }, [mood, anxiety]);

    return (
        <svg
            ref={svgRef}
            width="180"
            height="130"
            aria-label="Graf nálady a úzkosti"
        />
    );
}
