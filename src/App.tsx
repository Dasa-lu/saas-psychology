
import './App.css'
import SideBar from "./components/sideBar/SideBar.tsx";
import { Route, Routes } from "react-router-dom";
import ClientList from "./components/client/ClientList.tsx";
import ClientDetail from "./components/client/ClientDetail.tsx";
import TaskDatabase from "./components/taskDatabase/TaskDatabase.tsx";
import { WeekCalendar } from "./components/MainPage/WeekCalendar.tsx";
import NewClientForm from "./components/client/NewClientForm.tsx";
import { DataProvider } from "./context/DataContext.tsx";
import { OfflineIndicator } from "./components/OfflineIndicator.tsx";
import { RelaxationPlayer } from "./components/RelaxationPlayer.tsx";

function App() {
  return (
    <>
      <OfflineIndicator />
      <div className="appLayout">
        <DataProvider>
          <SideBar />
          <div className="appContent">
            <Routes>
              <Route path="/" element={<WeekCalendar />} />
              <Route path="/clients" element={<ClientList />} />
              <Route path="/clients/new" element={<NewClientForm />} />
              <Route path="/clients/:id" element={<ClientDetail />} />
              <Route path="/tasksDatabase" element={<TaskDatabase />} />
            </Routes>
          </div>
        </DataProvider>
        <RelaxationPlayer />
      </div>
    </>
  )
}

export default App
