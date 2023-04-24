import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import "./dashboard.css";
import Calendar from '../calendar/calendar';
import Weather from '../weather/weather';
const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  let tDate = new Date();
  const [currentDate, setDisplayDate] = useState(new Date(tDate.getFullYear(),tDate.getMonth(),1));
  const navigate = useNavigate();
  const location = useLocation();
  const fetchUserName =  React.useCallback(async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
  },[user]); 
  const changeTheMonth = (incriment) => {
    if (incriment!=null) {
      setDisplayDate(new Date(currentDate.setMonth(currentDate.getMonth()+incriment)));
    } else {
      let tDate = new Date();
      setDisplayDate(new Date(tDate.getFullYear(),tDate.getMonth(),1));
    }
  }
  const showUserMenu = (event) => {
    var menu = document.getElementsByClassName("dashboard-nav-user-menu")[0];
    menu.classList.add('dashboard-nav-user-menu-visible');
    event.stopPropagation();
    document.body.addEventListener('click', hideUserMenu);
  }
  const hideUserMenu = () => {
    var menu = document.getElementsByClassName("dashboard-nav-user-menu")[0];
    menu.classList.remove('dashboard-nav-user-menu-visible');
    document.body.removeEventListener('click', hideUserMenu);
  }
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading, navigate, fetchUserName]);
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button title="View the Calendar" className={"dashboard-nav-tab dashboard-nav-tab-calendar " +  (location.pathname.substring(0,19) === '/dashboard/calendar' ? 'dashboard-nav-tab-active' : '')} onClick={() => navigate("/dashboard/calendar")}>Calendar</button>
        <button title="View Weather" className={"dashboard-nav-tab dashboard-nav-tab-weather " +  (location.pathname.substring(0,18) === '/dashboard/weather' ? 'dashboard-nav-tab-active' : '')} onClick={() => navigate("/dashboard/weather")}>Weather</button>
        <div className="dashboard-nav-calendar-navigation">
          <button title="Go to today" className="dashboard-nav-calendar-navigation-today" onClick={() => changeTheMonth()}>Today</button>
          <button title="Previous month" className="dashboard-nav-calendar-navigation-previous" onClick={() => changeTheMonth(-1)}>×</button>
          <button title="Next month"  className="dashboard-nav-calendar-navigation-next" onClick={() => changeTheMonth(1)}>Ø</button>
          <div className="dashboard-nav-calendar-display-date">{currentDate.toLocaleDateString("en-us",{month:'long', year:'numeric'})}</div>
        </div>
        <button className="dashboard-nav-user" onClick={showUserMenu}>{name.substring(0,1)}</button>
          <ul className="dashboard-nav-user-menu">
            <li onClick={() => alert('TODO: Complete Settings Dialog')}>Settings</li>
            <li onClick={logout}>Logout</li>
          </ul>
      </nav>
      <Routes>
          <Route  path="calendar/*" element={<Calendar currentDate={currentDate} />} />
          <Route path="weather" element={<Weather />} />
      </Routes>
    </div>
  );
}
export default Dashboard;