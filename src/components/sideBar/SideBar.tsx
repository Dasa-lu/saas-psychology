import './SideBar.css';
import logo from "/logo.png"
import { NavItems } from "./pages.tsx";
import { NavLink } from "react-router-dom";

export default function SideBar() {
    return (
        <nav className="SideBar" aria-label="Hlavní navigace">
            <div className="SideBarBackground">
                <img className="SideBarImg" src={logo} alt="PsychApp logo" />

                <ul className="SideBarNavElements">
                    {NavItems.map((item) => (
                        <li key={item.id}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => isActive ? "active" : ""}
                            >
                                {item.icon}
                                {item.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
