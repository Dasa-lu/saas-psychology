import { useNavigate } from 'react-router';
import { useData } from '../../context/DataContext';
import ClientCard from './ClientCard';
import './ClientCard.css';

export default function ClientList() {
    const navigate = useNavigate();
    const { clients } = useData();

    return (
        <main className="ClientsList">
            <header className="ClientsList__header">
                <h1 className="ClientsList__title">Klienti</h1>
                <p className="ClientsList__subtitle">Celkem {clients.length} klientů</p>
                <button
                    className="ClientsList__add-btn"
                    onClick={() => navigate('/clients/new')}
                >
                    + Přidat klienta
                </button>
            </header>

            <section className="ClientsList__scroll" aria-label="Seznam klientů">
                <div className="ClientsList__grid">
                    {clients.map((client) => (
                        <ClientCard
                            key={client.id}
                            client={client}
                            onClick={() => navigate(`/clients/${client.id}`)}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
