import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import { ArrowLeft, Mail, Phone, ClipboardList, BookOpen, Calendar } from 'lucide-react';
import { getClientById } from '../data/clientsHelperFunctions';
import { sessions } from '../data/mockData';
import { getInitials, getColorClasses, getStatusBadgeClasses, getStatusLabel } from '../utils/helpers';
import './ClientDetail.css';

const getMoodColor = (mood: number) => {
    if (mood >= 8) return '#22c55e';
    if (mood >= 6) return '#eab308';
    if (mood >= 4) return '#f97316';
    return '#ef4444';
};

const getAnxietyColor = (anxiety: number) => {
    if (anxiety >= 8) return '#ef4444';
    if (anxiety >= 6) return '#f97316';
    if (anxiety >= 4) return '#eab308';
    return '#22c55e';
};

const getSessionStatusLabel = (status: 'scheduled' | 'completed' | 'cancelled') => {
    const map = { scheduled: 'Naplánováno', completed: 'Dokončeno', cancelled: 'Zrušeno' };
    return map[status];
};

const getSessionStatusClass = (status: 'scheduled' | 'completed' | 'cancelled') => {
    const map = {
        scheduled: 'ClientDetail__session-badge--scheduled',
        completed: 'ClientDetail__session-badge--completed',
        cancelled: 'ClientDetail__session-badge--cancelled',
    };
    return map[status];
};

export default function ClientDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const client = getClientById(id ?? '');

    if (!client) {
        return (
            <div className="ClientDetail ClientDetail--notfound">
                <p>Klient nebyl nalezen.</p>
                <button className="ClientDetail__back-btn" onClick={() => navigate('/clients')}>
                    <ArrowLeft /> Zpět na klienty
                </button>
            </div>
        );
    }

    const colors = getColorClasses(client.color);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const clientSessions = sessions
        .filter(s => s.clientId === client.id && s.date >= today)
        .sort((a, b) => a.date.getTime() - b.date.getTime());

    return (
        <div className="ClientDetail">
            <div className="ClientDetail__topbar">
                <button className="ClientDetail__back-btn" onClick={() => navigate('/clients')}>
                    <ArrowLeft className="ClientDetail__back-icon" />
                    Zpět na klienty
                </button>
            </div>

            <div className="ClientDetail__scroll">
                {/* Header */}
                <div className="ClientDetail__header">
                    <div className={`ClientDetail__avatar ${colors.bg}`}>
                        <span>{getInitials(client.name)}</span>
                    </div>
                    <div className="ClientDetail__header-info">
                        <h1 className="ClientDetail__name">{client.name}</h1>
                        <p className="ClientDetail__since">
                            Klient od {format(client.startDate, 'd. MMMM yyyy', { locale: cs })}
                        </p>
                    </div>
                    <span className={`ClientDetail__badge ${getStatusBadgeClasses(client.status)}`}>
                        {getStatusLabel(client.status)}
                    </span>
                </div>

                <div className="ClientDetail__body">
                    {/* Contact */}
                    {client.contactInfo && (
                        <div className="ClientDetail__section">
                            <h2 className="ClientDetail__section-title">Kontakt</h2>
                            <div className="ClientDetail__contact">
                                {client.contactInfo.email && (
                                    <div className="ClientDetail__contact-row">
                                        <Mail className="ClientDetail__contact-icon" />
                                        <span>{client.contactInfo.email}</span>
                                    </div>
                                )}
                                {client.contactInfo.phone && (
                                    <div className="ClientDetail__contact-row">
                                        <Phone className="ClientDetail__contact-icon" />
                                        <span>{client.contactInfo.phone}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Main topic */}
                    <div className="ClientDetail__section">
                        <h2 className="ClientDetail__section-title">Hlavní téma</h2>
                        <div className={`ClientDetail__topic-box ${colors.light} ${colors.border}`}>
                            <ClipboardList className={`ClientDetail__topic-icon ${colors.text}`} />
                            <p className="ClientDetail__topic-text">{client.mainTopic}</p>
                        </div>
                    </div>

                    {/* Homework */}
                    <div className="ClientDetail__section">
                        <h2 className="ClientDetail__section-title">Aktuální domácí úkol</h2>
                        <div className="ClientDetail__homework-box">
                            <BookOpen className="ClientDetail__homework-icon" />
                            <p className="ClientDetail__homework-text">{client.currentHomework}</p>
                        </div>
                    </div>

                    {/* Last check-in */}
                    <div className="ClientDetail__section">
                        <h2 className="ClientDetail__section-title">
                            Poslední check-in &mdash; {format(client.lastCheckIn.date, 'd. MMM yyyy', { locale: cs })}
                        </h2>
                        <div className="ClientDetail__checkin-grid">
                            <div className="ClientDetail__stat-box ClientDetail__stat-box--mood">
                                <div className="ClientDetail__stat-row">
                                    <span className="ClientDetail__stat-name">Nálada</span>
                                    <div className="ClientDetail__stat-dot" style={{ background: getMoodColor(client.lastCheckIn.mood) }} />
                                </div>
                                <div className="ClientDetail__stat-value">{client.lastCheckIn.mood}/10</div>
                            </div>
                            <div className="ClientDetail__stat-box ClientDetail__stat-box--anxiety">
                                <div className="ClientDetail__stat-row">
                                    <span className="ClientDetail__stat-name">Úzkost</span>
                                    <div className="ClientDetail__stat-dot" style={{ background: getAnxietyColor(client.lastCheckIn.anxiety) }} />
                                </div>
                                <div className="ClientDetail__stat-value">{client.lastCheckIn.anxiety}/10</div>
                            </div>
                        </div>
                        {client.lastCheckIn.notes && (
                            <p className="ClientDetail__checkin-notes">{client.lastCheckIn.notes}</p>
                        )}
                    </div>

                    {/* Sessions */}
                    <div className="ClientDetail__section">
                        <h2 className="ClientDetail__section-title">
                            Sezení ({clientSessions.length})
                        </h2>
                        {clientSessions.length === 0 ? (
                            <p className="ClientDetail__empty">Žádná sezení.</p>
                        ) : (
                            <div className="ClientDetail__sessions">
                                {clientSessions.map(session => (
                                    <div key={session.id} className="ClientDetail__session-row">
                                        <Calendar className="ClientDetail__session-icon" />
                                        <div className="ClientDetail__session-info">
                                            <span className="ClientDetail__session-date">
                                                {format(session.date, 'EEEE d. MMM yyyy', { locale: cs })}
                                            </span>
                                            <span className="ClientDetail__session-time">
                                                {session.startTime} – {session.endTime}
                                            </span>
                                        </div>
                                        <span className={`ClientDetail__session-badge ${getSessionStatusClass(session.status)}`}>
                                            {getSessionStatusLabel(session.status)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
