import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { Client, Session } from '../data/mockData';
import './NewClientForm.css';

const COLORS = ['purple', 'blue', 'green', 'orange', 'pink', 'teal'] as const;

function computeEndTime(startTime: string, durationMinutes: number): string {
    const [h, m] = startTime.split(':').map(Number);
    const total = h * 60 + m + durationMinutes;
    return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

export default function NewClientForm() {
    const navigate = useNavigate();
    const { clients, addClient, addSession } = useData();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [mainTopic, setMainTopic] = useState('');
    const [homework, setHomework] = useState('');
    const [sessionDate, setSessionDate] = useState('');
    const [sessionTime, setSessionTime] = useState('');
    const [duration, setDuration] = useState(60);

    const todayIso = new Date().toISOString().split('T')[0];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const color = COLORS[clients.length % COLORS.length];
        const newId = Date.now().toString();

        const newClient: Client = {
            id: newId,
            name,
            mainTopic,
            currentHomework: homework || 'Zatím nebyl zadán.',
            lastCheckIn: { mood: 5, anxiety: 5, date: new Date() },
            sessions: [],
            contactInfo: { email, phone },
            startDate: new Date(),
            color,
            status: 'active',
        };

        const [year, month, day] = sessionDate.split('-').map(Number);
        const newSession: Session = {
            id: `s-${newId}`,
            clientId: newId,
            date: new Date(year, month - 1, day),
            startTime: sessionTime,
            endTime: computeEndTime(sessionTime, duration),
            status: 'scheduled',
        };

        addClient(newClient);
        addSession(newSession);
        navigate('/clients');
    };

    return (
        <div className="NewClientForm">
            <header className="NewClientForm__topbar">
                <button type="button" className="NewClientForm__back-btn" onClick={() => navigate('/clients')}>
                    <ArrowLeft className="NewClientForm__back-icon" />
                    Zpět na klienty
                </button>
            </header>

            <div className="NewClientForm__scroll">
                <article className="NewClientForm__card">
                    <h1 className="NewClientForm__title">Nový klient</h1>

                    <form onSubmit={handleSubmit}>
                        <section className="NewClientForm__section">
                            <h2 className="NewClientForm__section-title">Informace o klientovi</h2>

                            <div className="NewClientForm__field">
                                <label htmlFor="name">Jméno *</label>
                                <input id="name" type="text" value={name} onChange={e => setName(e.target.value)}
                                    placeholder="Jana Nováková" required autoFocus />
                            </div>

                            <div className="NewClientForm__field">
                                <label htmlFor="email">Email *</label>
                                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                                    placeholder="jana@example.cz" required />
                            </div>

                            <div className="NewClientForm__field">
                                <label htmlFor="phone">Telefon</label>
                                <input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                                    placeholder="+420 123 456 789" />
                            </div>

                            <div className="NewClientForm__field">
                                <label htmlFor="mainTopic">Hlavní téma *</label>
                                <input id="mainTopic" type="text" value={mainTopic} onChange={e => setMainTopic(e.target.value)}
                                    placeholder="Úzkost, deprese, vztahy..." required />
                            </div>

                            <div className="NewClientForm__field">
                                <label htmlFor="homework">Domácí úkol</label>
                                <textarea id="homework" value={homework} onChange={e => setHomework(e.target.value)}
                                    placeholder="Zadejte domácí úkol..." rows={3} />
                            </div>
                        </section>

                        <section className="NewClientForm__section">
                            <h2 className="NewClientForm__section-title">První sezení</h2>

                            <div className="NewClientForm__row">
                                <div className="NewClientForm__field">
                                    <label htmlFor="sessionDate">Datum *</label>
                                    <input id="sessionDate" type="date" value={sessionDate}
                                        onChange={e => setSessionDate(e.target.value)} min={todayIso} required />
                                </div>

                                <div className="NewClientForm__field">
                                    <label htmlFor="sessionTime">Čas začátku *</label>
                                    <input id="sessionTime" type="time" value={sessionTime}
                                        onChange={e => setSessionTime(e.target.value)} required />
                                </div>

                                <div className="NewClientForm__field">
                                    <label htmlFor="duration">Délka (min) *</label>
                                    <input id="duration" type="number" value={duration}
                                        onChange={e => setDuration(Number(e.target.value))} min={30} max={120} required />
                                </div>
                            </div>
                        </section>

                        <div className="NewClientForm__actions">
                            <button type="button" className="NewClientForm__cancel-btn" onClick={() => navigate('/clients')}>
                                Zrušit
                            </button>
                            <button type="submit" className="NewClientForm__submit-btn">
                                Přidat klienta
                            </button>
                        </div>
                    </form>
                </article>
            </div>
        </div>
    );
}
