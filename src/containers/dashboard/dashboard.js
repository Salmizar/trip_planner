import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../data/login-firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import "./dashboard.css";
import Calendar from "../calendar/calendar";
import Weather from "../weather/weather";
const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState({name:"",color:""});
  let tDate = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(tDate.getFullYear(), tDate.getMonth(), 1));
  const navigate = useNavigate();
  const location = useLocation();
  const fetchUserName = React.useCallback(async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setUserProfile(data);
    } catch (err) {
      console.error(err);
    }
  }, [user]);
  const changeTheMonth = (e) => {
    let incriment = e.currentTarget.getAttribute("data-incriment");
    navigate("/dashboard/calendar");
    if (incriment == null) {
      let tDate = new Date();
      setCurrentDate(new Date(tDate.getFullYear(), tDate.getMonth(), 1));
      return;
    }
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + parseInt(incriment))));
  }
  const showUserMenu = (event) => {
    let menu = document.getElementsByClassName("dashboard-nav-user-menu")[0];
    menu.classList.add("dashboard-nav-user-menu-visible");
    event.stopPropagation();
    document.body.addEventListener("click", hideUserMenu);
  }
  const hideUserMenu = () => {
    let menu = document.getElementsByClassName("dashboard-nav-user-menu")[0];
    menu.classList.remove("dashboard-nav-user-menu-visible");
    document.body.removeEventListener("click", hideUserMenu);
  }
  const navigateToCalendar = () => { navigate("/dashboard/calendar"); }
  const navigateToWeather = () => { navigate("/dashboard/weather"); }
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading, navigate, fetchUserName]);
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button title="View the Calendar" className={"dashboard-nav-tab-calendar " + (location.pathname.includes("/dashboard/calendar") ? "dashboard-nav-tab-active" : "")} onClick={ navigateToCalendar }>
          Calendar
        </button>
        <button title="View Weather" className={"dashboard-nav-tab-weather " + (location.pathname.includes("/dashboard/weather") ? "dashboard-nav-tab-active" : "")} onClick={ navigateToWeather}>
          Weather
        </button>
        <div className={(location.pathname.includes("/dashboard/calendar") ? " dashboard-nav-calendar-navigation" : "dashboard-nav-calendar-navigation-hidden")}>
          <button title="Go to today" className="dashboard-nav-calendar-navigation-today" onClick={ changeTheMonth }>
            Today
          </button>
          <button title="Previous Month" className="dashboard-nav-calendar-navigation-previous" data-incriment="-1" onClick={ changeTheMonth }>
            <img alt="Previous Month" src="/assets/arrowIcon.png"></img>
          </button>
          <button title="Next month" className="dashboard-nav-calendar-navigation-next" data-incriment="1" onClick={changeTheMonth }>
            <img alt="Next Month" src="/assets/arrowIcon.png"></img>
          </button>
          <div className="dashboard-nav-calendar-display-date">{currentDate.toLocaleDateString("en-us", { month: "long", year: "numeric" })}</div>
        </div>
        <button className="dashboard-nav-user" style={{backgroundColor: userProfile.color }} onClick={showUserMenu}>{userProfile.name.substring(0, 1)}</button>
        <ul className="dashboard-nav-user-menu">
          <li onClick={logout}>Logout</li>
        </ul>
      </nav>
      <Routes>
        <Route path="calendar/" element={<Calendar currentDate={currentDate} user={user} />} />
        <Route path="calendar/:eventId" element={<Calendar currentDate={currentDate} user={user} />} />
        <Route path="weather/*" element={<Weather />} />
      </Routes>
    </div>
  );
}
export default Dashboard;