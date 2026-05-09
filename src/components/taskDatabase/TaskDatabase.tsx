import { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle, ExternalLink } from 'lucide-react';
import { homeworks, categoryColors } from '../data/homeworkData';
import { resourceLinks, linkTypeStyles } from '../data/linksData';
import { clients } from '../data/mockData';
import { getInitials, getColorClasses } from '../utils/helpers';
import './TaskDatabase.css';

type Tab = 'homeworks' | 'links';

export default function TaskDatabase() {
    const [activeTab, setActiveTab] = useState<Tab>('homeworks');
    const [openPickerId, setOpenPickerId] = useState<string | null>(null);
    const [sent, setSent] = useState<Record<string, string>>({}); // homeworkId -> clientName
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpenPickerId(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function handleSend(homeworkId: string, clientName: string) {
        setSent(prev => ({ ...prev, [homeworkId]: clientName }));
        setOpenPickerId(null);
        setTimeout(() => {
            setSent(prev => {
                const next = { ...prev };
                delete next[homeworkId];
                return next;
            });
        }, 3000);
    }

    return (
        <main className="TaskDatabase">
            <header className="TaskDatabase__header">
                <h1 className="TaskDatabase__title">Databáze úkolů</h1>
                <div className="TaskDatabase__tabs">
                    <button
                        className={`TaskDatabase__tab ${activeTab === 'homeworks' ? 'TaskDatabase__tab--active' : ''}`}
                        onClick={() => setActiveTab('homeworks')}
                    >
                        Domácí úkoly
                        <span className="TaskDatabase__tab-count">{homeworks.length}</span>
                    </button>
                    <button
                        className={`TaskDatabase__tab ${activeTab === 'links' ? 'TaskDatabase__tab--active' : ''}`}
                        onClick={() => setActiveTab('links')}
                    >
                        Zdroje a odkazy
                        <span className="TaskDatabase__tab-count">{resourceLinks.length}</span>
                    </button>
                </div>
            </header>

            <section className="TaskDatabase__scroll" aria-label="Obsah databáze">
                {activeTab === 'homeworks' && (
                    <div className="TaskDatabase__list">
                        {homeworks.map(hw => {
                            const catStyle = categoryColors[hw.category];
                            const sentTo = sent[hw.id];
                            const isOpen = openPickerId === hw.id;

                            return (
                                <div key={hw.id} className="TaskDatabase__row">
                                    <div className="TaskDatabase__row-main">
                                        <div className="TaskDatabase__text">
                                            <span
                                                className="TaskDatabase__category-badge"
                                                style={{ background: catStyle.bg, color: catStyle.text, borderColor: catStyle.border }}
                                            >
                                                {hw.category}
                                            </span>
                                            <p className="TaskDatabase__hw-title">{hw.title}</p>
                                            <p className="TaskDatabase__hw-desc">{hw.description}</p>
                                        </div>

                                        <div className="TaskDatabase__action" ref={isOpen ? dropdownRef : null}>
                                            {sentTo ? (
                                                <div className="TaskDatabase__sent">
                                                    <CheckCircle className="TaskDatabase__sent-icon" />
                                                    <span>Odesláno: {sentTo}</span>
                                                </div>
                                            ) : (
                                                <button
                                                    className="TaskDatabase__send-btn"
                                                    onClick={() => setOpenPickerId(isOpen ? null : hw.id)}
                                                >
                                                    <Send className="TaskDatabase__send-icon" />
                                                    Odeslat klientovi
                                                </button>
                                            )}

                                            {isOpen && (
                                                <div className="TaskDatabase__dropdown">
                                                    {clients.map(client => {
                                                        const colors = getColorClasses(client.color);
                                                        return (
                                                            <button
                                                                key={client.id}
                                                                className="TaskDatabase__dropdown-item"
                                                                onClick={() => handleSend(hw.id, client.name)}
                                                            >
                                                                <div className={`TaskDatabase__dropdown-avatar ${colors.bg}`}>
                                                                    {getInitials(client.name)}
                                                                </div>
                                                                {client.name}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {activeTab === 'links' && (
                    <div className="TaskDatabase__list">
                        {resourceLinks.map(link => {
                            const typeStyle = linkTypeStyles[link.type];
                            const sentTo = sent[link.id];
                            const isOpen = openPickerId === link.id;

                            return (
                                <div key={link.id} className="TaskDatabase__row">
                                    <div className="TaskDatabase__row-main">
                                        <div className="TaskDatabase__text">
                                            <span
                                                className="TaskDatabase__category-badge"
                                                style={{ background: typeStyle.bg, color: typeStyle.text, borderColor: typeStyle.border }}
                                            >
                                                {link.type}
                                            </span>
                                            <p className="TaskDatabase__hw-title">
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="TaskDatabase__link-title"
                                                >
                                                    {link.title}
                                                    <ExternalLink className="TaskDatabase__link-icon" />
                                                </a>
                                            </p>
                                            <p className="TaskDatabase__hw-desc">{link.description}</p>
                                            <p className="TaskDatabase__link-source">{link.source}</p>
                                        </div>

                                        <div className="TaskDatabase__action" ref={isOpen ? dropdownRef : null}>
                                            {sentTo ? (
                                                <div className="TaskDatabase__sent">
                                                    <CheckCircle className="TaskDatabase__sent-icon" />
                                                    <span>Odesláno: {sentTo}</span>
                                                </div>
                                            ) : (
                                                <button
                                                    className="TaskDatabase__send-btn"
                                                    onClick={() => setOpenPickerId(isOpen ? null : link.id)}
                                                >
                                                    <Send className="TaskDatabase__send-icon" />
                                                    Odeslat klientovi
                                                </button>
                                            )}

                                            {isOpen && (
                                                <div className="TaskDatabase__dropdown">
                                                    {clients.map(client => {
                                                        const colors = getColorClasses(client.color);
                                                        return (
                                                            <button
                                                                key={client.id}
                                                                className="TaskDatabase__dropdown-item"
                                                                onClick={() => handleSend(link.id, client.name)}
                                                            >
                                                                <div className={`TaskDatabase__dropdown-avatar ${colors.bg}`}>
                                                                    {getInitials(client.name)}
                                                                </div>
                                                                {client.name}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}
