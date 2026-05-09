import { FaRegCalendar } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { GoDatabase } from "react-icons/go";

export const NavItems: {
    id: number;
    icon: React.JSX.Element;
    title: string;
    path: string;
    end: boolean;
}[] = [
    { id: 1, icon: <FaRegCalendar  className="Icons"/>, title: "Kalendař", path: "/", end: true},
    { id: 2, icon: <LuUsers className="Icons" />, title: "Klienti", path: "/clients", end: true},
    { id: 3, icon: <GoDatabase className="Icons"/>, title: "Databaze úkolu", path: "/tasksDatabase", end: true},
];