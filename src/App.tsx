
import './App.css'
import SideBar from "./components/sideBar/SideBar.tsx";
import {Route, Routes} from "react-router-dom";
import ClientList from "./components/client/ClientList.tsx";
import ClientDetail from "./components/client/ClientDetail.tsx";
import TaskDatabase from "./components/taskDatabase/TaskDatabase.tsx";
import {WeekCalendar} from "./components/MainPage/WeekCalendar.tsx";

function App() {

  return (
    <>
        <div className="appLayout">
            <SideBar />

            <div className="appContent">
                <Routes>
                    <Route path="/" element={<WeekCalendar />} />
                    <Route path="/clients" element={<ClientList />} />
                    <Route path="/clients/:id" element={<ClientDetail />} />
                    <Route path="/tasksDatabase" element={<TaskDatabase />} />
                </Routes>
            </div>
        </div>
    </>
  )
}

export default App
