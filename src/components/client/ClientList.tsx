import { useNavigate } from 'react-router';
import { clients } from '../data/mockData';
import ClientCard from './ClientCard';
import './ClientCard.css';

export default function ClientList() {
    const navigate = useNavigate();

    return (
        <div className="ClientsList">
            <div className="ClientsList__header">
                <h2 className="ClientsList__title">Klienti</h2>
                <p className="ClientsList__subtitle">Celkem {clients.length} klientů</p>
            </div>

            <div className="ClientsList__scroll">
                <div className="ClientsList__grid">
                    {clients.map((client) => (
                        <ClientCard
                            key={client.id}
                            client={client}
                            onClick={() => navigate(`/clients/${client.id}`)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
