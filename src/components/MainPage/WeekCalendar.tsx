import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    format,
    addDays,
    startOfWeek,
    isSameDay,
    addWeeks,
    subWeeks,
    parseISO,
    isValid,
} from "date-fns";
import { cs } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./helpers/Button";
import type { Session } from "../data/mockData";
import { useData } from "../../context/DataContext";
import { getColorClasses } from "../utils/helpers";
import "./WeekCalendar.css";
import ClientModal from "./ClientModal.tsx";

interface WeekCalendarProps {
    onSelectDate?: (date: Date) => void;
}

function getDateFromUrl(): Date {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('week');
    if (raw) {
        const parsed = parseISO(raw);
        if (isValid(parsed)) return parsed;
    }
    return new Date();
}

function pushWeekToHistory(date: Date) {
    const monday = startOfWeek(date, { weekStartsOn: 1 });
    const iso = format(monday, 'yyyy-MM-dd');
    const url = `${window.location.pathname}?week=${iso}`;
    window.history.pushState({ week: iso }, '', url);
}

export function WeekCalendar({ onSelectDate }: WeekCalendarProps) {
    const navigate = useNavigate();
    const { sessions: sessionList, clients: contextClients, updateSession } = useData();
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [currentDate, setCurrentDate] = useState<Date>(getDateFromUrl);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOverCell, setDragOverCell] = useState<string | null>(null);

    const today = new Date();

    useEffect(() => {
        const handlePopState = (e: PopStateEvent) => {
            if (e.state && typeof e.state.week === 'string') {
                const parsed = parseISO(e.state.week);
                if (isValid(parsed)) setCurrentDate(parsed);
            } else {
                setCurrentDate(getDateFromUrl());
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleDayClick = (day: Date) => {
        setCurrentDate(day);
        onSelectDate?.(day);
    };

    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    const timeSlots = Array.from({ length: 11 }, (_, i) => {
        const hour = i + 8;
        return `${hour.toString().padStart(2, "0")}:00`;
    });

    const goToPreviousWeek = () => {
        const prev = subWeeks(currentDate, 1);
        setCurrentDate(prev);
        pushWeekToHistory(prev);
    };
    const goToNextWeek = () => {
        const next = addWeeks(currentDate, 1);
        setCurrentDate(next);
        pushWeekToHistory(next);
    };

    const getSessionsForDay = (day: Date): Session[] =>
        sessionList.filter(s =>
            s.date.getFullYear() === day.getFullYear() &&
            s.date.getMonth() === day.getMonth() &&
            s.date.getDate() === day.getDate()
        );

    const handleSessionClick = (session: Session) => {
        if (draggingId) return;
        setSelectedSession(session);
    };

    const handleCloseModal = () => setSelectedSession(null);

    // --- Drag & Drop ---

    const handleDragStart = (e: React.DragEvent, session: Session) => {
        e.dataTransfer.setData("sessionId", session.id);
        e.dataTransfer.effectAllowed = "move";
        setDraggingId(session.id);
    };

    const handleDragEnd = () => {
        setDraggingId(null);
        setDragOverCell(null);
    };

    const handleDragOver = (e: React.DragEvent, day: Date, time: string) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setDragOverCell(`${day.toISOString()}-${time}`);
    };

    const handleDragLeave = () => {
        setDragOverCell(null);
    };

    const handleDrop = (e: React.DragEvent, day: Date, time: string) => {
        e.preventDefault();
        const sessionId = e.dataTransfer.getData("sessionId");
        const session = sessionList.find(s => s.id === sessionId);
        if (!session) return;

        // Preserve duration
        const [sh, sm] = session.startTime.split(":").map(Number);
        const [eh, em] = session.endTime.split(":").map(Number);
        const durationMinutes = (eh * 60 + em) - (sh * 60 + sm);

        const [newHour] = time.split(":").map(Number);
        const newStartTotal = newHour * 60;
        const newEndTotal = newStartTotal + durationMinutes;

        const newStartTime = `${String(Math.floor(newStartTotal / 60)).padStart(2, "0")}:${String(newStartTotal % 60).padStart(2, "0")}`;
        const newEndTime = `${String(Math.floor(newEndTotal / 60)).padStart(2, "0")}:${String(newEndTotal % 60).padStart(2, "0")}`;

        const newDate = new Date(day);

        const updated = { ...session, date: newDate, startTime: newStartTime, endTime: newEndTime };
        updateSession(updated);

        // Update selectedSession if it's the one being moved
        setSelectedSession((prev: Session | null) => prev?.id === sessionId ? updated : prev);

        setDraggingId(null);
        setDragOverCell(null);
    };

    // --- Grid layout ---

    const START_HOUR = 8;
    const END_HOUR = 19;
    const TOTAL_MINUTES = (END_HOUR - START_HOUR) * 60;
    const gridBodyRef = useRef<HTMLDivElement | null>(null);
    const [gridHeight, setGridHeight] = useState(0);

    useEffect(() => {
        const element = gridBodyRef.current;
        if (!element) return;
        const updateHeight = () => setGridHeight(element.getBoundingClientRect().height);
        updateHeight();
        const observer = new ResizeObserver(updateHeight);
        observer.observe(element);
        window.addEventListener("resize", updateHeight);
        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateHeight);
        };
    }, [weekDays.length, timeSlots.length]);

    const getSessionStyle = (session: Session) => {
        const [startHour, startMinute] = session.startTime.split(":").map(Number);
        const [endHour, endMinute] = session.endTime.split(":").map(Number);
        const startMinutes = (startHour - START_HOUR) * 60 + startMinute;
        const endMinutes = (endHour - START_HOUR) * 60 + endMinute;
        const safeGridHeight = gridHeight || 1;
        return {
            top: `${(startMinutes / TOTAL_MINUTES) * safeGridHeight}px`,
            height: `${((endMinutes - startMinutes) / TOTAL_MINUTES) * safeGridHeight}px`,
            minHeight: "56px",
        };
    };

    const selectedClient = selectedSession
        ? contextClients.find(c => c.id === selectedSession.clientId) ?? null
        : null;

    const weekEnd = addDays(weekStart, 6);

    return (
        <div className="week-calendar">
            <div className="week-calendar__header">
                <div className="week-calendar__header-left">
                    <div className="week-calendar__nav">
                        <Button variant="outline" size="icon" onClick={goToPreviousWeek} className="week-calendar__nav-button">
                            <ChevronLeft className="week-calendar__nav-icon" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={goToNextWeek} className="week-calendar__nav-button">
                            <ChevronRight className="week-calendar__nav-icon" />
                        </Button>
                    </div>
                    <h2 className="week-calendar__title">
                        {format(weekStart, "d. MMMM", { locale: cs })} –{" "}
                        {format(weekEnd, "d. MMMM yyyy", { locale: cs })}
                    </h2>
                </div>
            </div>

            <div className="week-calendar__body">
                <div className="week-calendar__inner">
                    <div className="week-calendar__day-header-row">
                        <div className="week-calendar__time-spacer" />
                        {weekDays.map((day) => {
                            const isToday = isSameDay(day, today);
                            return (
                                <div
                                    key={day.toISOString()}
                                    className={`week-calendar__day-header ${isToday ? "week-calendar__day-header--today" : ""}`}
                                >
                                    <div className={`week-calendar__day-name ${isToday ? "week-calendar__day-name--today" : ""}`}>
                                        {format(day, "EEE", { locale: cs })}
                                    </div>
                                    <div className={`week-calendar__day-number ${isToday ? "week-calendar__day-number--today" : ""}`}>
                                        {format(day, "d")}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="week-calendar__grid" ref={gridBodyRef}>
                        {timeSlots.map((time) => (
                            <div key={time} className="week-calendar__grid-row">
                                <div className="week-calendar__time-label">{time}</div>
                                {weekDays.map((day) => {
                                    const isToday = isSameDay(day, today);
                                    const cellKey = `${day.toISOString()}-${time}`;
                                    const isDragOver = dragOverCell === cellKey;
                                    return (
                                        <div
                                            key={cellKey}
                                            onClick={() => handleDayClick(day)}
                                            onDragOver={(e) => handleDragOver(e, day, time)}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, day, time)}
                                            className={[
                                                "week-calendar__grid-cell",
                                                isToday ? "week-calendar__grid-cell--today" : "",
                                                isDragOver ? "week-calendar__grid-cell--drag-over" : "",
                                            ].join(" ")}
                                        />
                                    );
                                })}
                            </div>
                        ))}

                        <div className="week-calendar__sessions-layer">
                            <div className="week-calendar__sessions-grid">
                                <div />
                                {weekDays.map((day) => {
                                    const daySessions = getSessionsForDay(day);
                                    return (
                                        <div key={day.toISOString()} className="week-calendar__sessions-column">
                                            {daySessions.map((session) => {
                                                const client = contextClients.find(c => c.id === session.clientId);
                                                if (!client) return null;
                                                const style = getSessionStyle(session);
                                                const colors = getColorClasses(client.color);
                                                const isDragging = draggingId === session.id;
                                                return (
                                                    <div
                                                        key={session.id}
                                                        className={[
                                                            "week-calendar__session-card",
                                                            colors.border,
                                                            isDragging ? "week-calendar__session-card--dragging" : "",
                                                        ].join(" ")}
                                                        style={style}
                                                        draggable
                                                        onDragStart={(e) => handleDragStart(e, session)}
                                                        onDragEnd={handleDragEnd}
                                                        onClick={() => handleSessionClick(session)}
                                                    >
                                                        <div className="week-calendar__session-name">{client.name}</div>
                                                        <div className="week-calendar__session-time">
                                                            {session.startTime} - {session.endTime}
                                                        </div>
                                                        <div className="week-calendar__session-topic">{client.mainTopic}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ClientModal
                isOpen={!!selectedSession}
                onClose={handleCloseModal}
                onNavigateToClient={() => {
                    if (selectedClient) {
                        handleCloseModal();
                        navigate(`/clients/${selectedClient.id}`);
                    }
                }}
                session={selectedSession}
                client={selectedClient}
            />
        </div>
    );
}
