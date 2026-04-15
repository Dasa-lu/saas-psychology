import { ClipboardList, Mail, Phone, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import type { Client } from '../data/mockData';
import { getInitials, getColorClasses, getStatusBadgeClasses, getStatusLabel } from '../utils/helpers';
import './ClientCard.css';

type ClientCardProps = {
    client: Client;
    onClick?: () => void;
};

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

export default function ClientCard({ client, onClick }: ClientCardProps) {
    const colors = getColorClasses(client.color);

    return (
        <div className="ClientCard" onClick={onClick}>
            <div className="ClientCard__header">
                <div className="ClientCard__avatar-row">
                    <div className={`ClientCard__avatar ${colors.bg}`}>
                        <span>{getInitials(client.name)}</span>
                    </div>
                    <div>
                        <p className="ClientCard__name">{client.name}</p>
                        <p className="ClientCard__since">
                            Klient od {format(client.startDate, 'd. MMM yyyy', { locale: cs })}
                        </p>
                    </div>
                </div>
                <div className="ClientCard__actions">
                    <span className={`ClientCard__badge ${getStatusBadgeClasses(client.status)}`}>
                        {getStatusLabel(client.status)}
                    </span>
                    <ChevronRight className="ClientCard__chevron" />
                </div>
            </div>

            <div className="ClientCard__content">
                <div className={`ClientCard__topic-box ${colors.light} ${colors.border}`}>
                    <ClipboardList className={`ClientCard__topic-icon ${colors.text}`} />
                    <div>
                        <p className="ClientCard__topic-label">Hlavní téma:</p>
                        <p className="ClientCard__topic-text">{client.mainTopic}</p>
                    </div>
                </div>

                {client.contactInfo && (
                    <div className="ClientCard__contact">
                        {client.contactInfo.email && (
                            <div className="ClientCard__contact-row">
                                <Mail className="ClientCard__contact-icon" />
                                <span>{client.contactInfo.email}</span>
                            </div>
                        )}
                        {client.contactInfo.phone && (
                            <div className="ClientCard__contact-row">
                                <Phone className="ClientCard__contact-icon" />
                                <span>{client.contactInfo.phone}</span>
                            </div>
                        )}
                    </div>
                )}

                <div className="ClientCard__checkin">
                    <p className="ClientCard__checkin-label">Poslední check-in:</p>
                    <div className="ClientCard__checkin-grid">
                        <div className="ClientCard__stat-box ClientCard__stat-box--mood">
                            <div className="ClientCard__stat-row">
                                <span className="ClientCard__stat-name">Nálada</span>
                                <div className="ClientCard__stat-dot" style={{ background: getMoodColor(client.lastCheckIn.mood) }} />
                            </div>
                            <div className="ClientCard__stat-value">{client.lastCheckIn.mood}/10</div>
                        </div>
                        <div className="ClientCard__stat-box ClientCard__stat-box--anxiety">
                            <div className="ClientCard__stat-row">
                                <span className="ClientCard__stat-name">Úzkost</span>
                                <div className="ClientCard__stat-dot" style={{ background: getAnxietyColor(client.lastCheckIn.anxiety) }} />
                            </div>
                            <div className="ClientCard__stat-value">{client.lastCheckIn.anxiety}/10</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
