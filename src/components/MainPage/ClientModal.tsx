import './ClientModal.css'
import {IoClose} from "react-icons/io5";
import type {ReactNode} from "react";
import {Button} from "./helpers/Button.tsx";
import type {Client, Session} from "../data/mockData";
import {LuClipboardList, LuClock3, LuFileText} from "react-icons/lu";


type ClientModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onNavigateToClient: () => void;
    session?: Session | null;
    client: Client | null;
};

export default function ClientModal({isOpen, onClose, onNavigateToClient, session, client}: ClientModalProps) {
    if (!isOpen || !session || !client) return null;
    return (
        <div className="client-modal-overlay" onClick={onClose}>
            <div
                className="client-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="client-modal__close"
                    onClick={onClose}
                    aria-label="Zavřít"
                >
                    <IoClose />
                </button>

                <div className="client-modal__header">
                    <div className="client-modal__header-info">
                        <p className="client-modal__label">Detail klienta</p>
                        <h2 className="client-modal__title">{client.name}</h2>
                    </div>

                    <div className="client-modal__time-pill">
                        <LuClock3 />
                        <span>
                            {session.startTime} - {session.endTime}
                        </span>
                    </div>
                </div>

                <div className="client-modal__content">
                    <section className="client-modal__card">
                        <div className="client-modal__card-header">
                            <span className="client-modal__icon">
                                <LuClipboardList />
                            </span>
                            <h3 className="client-modal__card-title">
                                Hlavní téma / Zakázka
                            </h3>
                        </div>
                        <p className="client-modal__card-text">
                            {client.mainTopic}
                        </p>
                    </section>

                    <section className="client-modal__card">
                        <div className="client-modal__card-header">
                            <span className="client-modal__icon">
                                <LuFileText />
                            </span>
                            <h3 className="client-modal__card-title">
                                Aktuální domácí úkol
                            </h3>
                        </div>
                        <p className="client-modal__card-text">
                            {client.currentHomework}
                        </p>
                    </section>
                </div>

                <div className="client-modal__footer">
                    <Button onClick={onNavigateToClient}>
                        Přejít na stránku klienta
                    </Button>
                </div>
            </div>
        </div>
    );
}

ClientModal.Header = function ModalHeader({children}: {children: ReactNode}) {
    return (
        <div className="ModalHeaderClientName"> {children}</div>
    )
}

ClientModal.From = function ModalTimeFrom({children}: {children: ReactNode}) {
    return (
        <div className="ModalFromTimeInfoClientName"> {children}</div>
    )
}

ClientModal.Body = function ModalBody({children}: {children: ReactNode}) {
    return (
        <div className="ModalBodyClientName"> {children}</div>
    )
}

ClientModal.Homework = function ModalHomework({children}: {children: ReactNode}) {
    return (
        <div className="ModalBodyClientName"> {children}</div>
    )
}

