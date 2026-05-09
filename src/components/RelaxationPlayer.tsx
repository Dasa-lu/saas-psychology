import { useRef, useState } from 'react';

type ToneType = 'white-noise' | 'binaural' | 'rain';

const TONE_LABELS: Record<ToneType, string> = {
    'white-noise': 'Bílý šum',
    binaural: 'Binaurální beat',
    rain: 'Déšť',
};

export function RelaxationPlayer() {
    const [playing, setPlaying] = useState(false);
    const [toneType, setToneType] = useState<ToneType>('white-noise');
    const ctxRef = useRef<AudioContext | null>(null);
    const sourcesRef = useRef<(AudioBufferSourceNode | OscillatorNode)[]>([]);

    const stop = () => {
        sourcesRef.current.forEach(n => {
            try { n.stop(); } catch { /* already stopped */ }
        });
        sourcesRef.current = [];
        ctxRef.current?.close();
        ctxRef.current = null;
        setPlaying(false);
    };

    const startWhiteNoise = (ctx: AudioContext) => {
        const bufLen = ctx.sampleRate * 3;
        const buffer = ctx.createBuffer(1, bufLen, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const gain = ctx.createGain();
        gain.gain.value = 0.12;
        source.connect(gain);
        gain.connect(ctx.destination);
        source.start();
        return [source];
    };

    const startBinaural = (ctx: AudioContext) => {
        const merger = ctx.createChannelMerger(2);
        merger.connect(ctx.destination);

        const makeOsc = (freq: number, channel: 0 | 1) => {
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = freq;
            const gain = ctx.createGain();
            gain.gain.value = 0.28;
            osc.connect(gain);
            gain.connect(merger, 0, channel);
            osc.start();
            return osc;
        };

        return [makeOsc(200, 0), makeOsc(210, 1)];
    };

    const startRain = (ctx: AudioContext) => {
        return Array.from({ length: 8 }, () => {
            const bufLen = ctx.sampleRate * 2;
            const buffer = ctx.createBuffer(1, bufLen, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;

            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.loop = true;

            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 300 + Math.random() * 2000;
            filter.Q.value = 0.4;

            const gain = ctx.createGain();
            gain.gain.value = 0.025;

            source.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            source.start();
            return source;
        });
    };

    const play = () => {
        if (playing) { stop(); return; }

        const ctx = new AudioContext();
        ctxRef.current = ctx;

        const sources =
            toneType === 'white-noise' ? startWhiteNoise(ctx) :
            toneType === 'binaural'    ? startBinaural(ctx) :
                                         startRain(ctx);

        sourcesRef.current = sources;
        setPlaying(true);
    };

    return (
        <div className="RelaxationPlayer">
            <span className="RelaxationPlayer__label">Relaxační zvuky</span>
            <select
                className="RelaxationPlayer__select"
                value={toneType}
                disabled={playing}
                onChange={e => setToneType(e.target.value as ToneType)}
            >
                {(Object.keys(TONE_LABELS) as ToneType[]).map(k => (
                    <option key={k} value={k}>{TONE_LABELS[k]}</option>
                ))}
            </select>
            <button className={`RelaxationPlayer__btn${playing ? ' RelaxationPlayer__btn--active' : ''}`} onClick={play}>
                {playing ? '⏹ Zastavit' : '▶ Přehrát'}
            </button>
        </div>
    );
}
