import { React, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getDatabase, ref, onValue, child, push, update, set, remove } from "firebase/database";
import "./calendar.css";
import * as Utils from '../../utils';
import CalendarDay from '../calendar-day/calendar-day';
import ViewEvent from '../view-event/view-event';
const Calendar = ({ currentDate, user }) => {
  const navigate = useNavigate();
  const [calendarEvents, setCalendarEvents] = useState({});
  const [calendarEventsLoaded, setCalendarEventsLoaded] = useState(false);
  const [calendarData, setCalendarData] = useState({});
  const [availableSlots, setAvailableSlots] = useState(1);
  const [minCellHeight, setMinCellHeight] = useState(100);
  const { eventId } = useParams();
  const saveEvent = function (eventData) {
    if (calendarEvents[eventData.eId]) {
      let calEvents = {...calendarEvents};
      if (eventData.eId === "NewEvent") {
        delete calEvents[eventData.eId];
        setCalendarEvents(calEvents);
        delete eventData.eId;
        const newPostKey = push(child(ref(getDatabase()), "calendarData")).key;
        const updateData = {};
        updateData['/calendarData/' + newPostKey] = eventData;
        update(ref(getDatabase()), updateData);
      } else {        
        let eventId = eventData.eId;
        delete eventData.eId;
        set(ref(getDatabase(), '/calendarData/' + eventId), eventData);
      }
    }
    navigate("/dashboard/calendar");
  }
  const deleteEvent = function (eventData) {
    if (calendarEvents[eventData.eId]) {
      let calEvents = {...calendarEvents};
      if (eventData.eId === "NewEvent") {
        delete calEvents[eventData.eId];
        setCalendarData(Utils.CalendarUtils.formatCalendarData(currentDate, calEvents));
      } else {
        remove(ref(getDatabase(), '/calendarData/' + eventId));
      }
    }
    navigate("/dashboard/calendar");
  }
  const createEvent = function (year, month, day) {
    var newEventDate = new Date(year, month, day);
    var newEvent = Utils.CalendarUtils.newEventObject(newEventDate);
    let newEventId = newEvent.eId;
    delete newEvent.eId;
    newEvent.guests = [
      {
        uId: user.uid,
        name: user.displayName,
        eventOwner: true
      }
    ]
    let calEvents = {...calendarEvents};
    calEvents[newEventId] = newEvent;
    
    let sortedCalendarEvents = Object.fromEntries( Object.entries(calEvents).sort(([, a], [, b]) => a.driveUpDate - b.driveUpDate || b.driveHomeDate - a.driveHomeDate) );
    setCalendarEvents(sortedCalendarEvents);
    setCalendarEventsLoaded(false);
    navigate("/dashboard/calendar/" + newEventId);
  }
  useEffect(() => {
    const checkAvailableSlots = () => {
      //85 = main div offset+days of week. 22 = date height. 25 = cell height
      let cellHeight = ((window.innerHeight - 85) / Object.entries(calendarData).length) - 22;
      let minHeight = (415 / ((calendarData.length) ? Object.entries(calendarData).length : 5));
      setMinCellHeight(minHeight);
      let availSlots = Math.floor(Math.max(minHeight - 24, cellHeight) / 25) - 1;// -1 for overflow spacing
      setAvailableSlots(Math.min(availSlots, Utils.CalendarUtils.maxSlots));
    }
    checkAvailableSlots();
    window.addEventListener('resize', checkAvailableSlots);
    window.addEventListener('orientationchange', checkAvailableSlots);
    return _ => {
      window.removeEventListener('resize', checkAvailableSlots);
      window.removeEventListener('orientationchange', checkAvailableSlots);
    }
  }, [calendarData]);
  useEffect(() => {
    setCalendarEventsLoaded(true);
    setCalendarData(Utils.CalendarUtils.formatCalendarData(currentDate, calendarEvents));
  }, [currentDate, calendarEvents]);
  useEffect(() => {
    setCalendarEventsLoaded(false);
    const dbRef = ref(getDatabase(), "calendarData");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const calEvents = {};
      for (var key in data) {
        if (!calEvents[key]) {
          calEvents[key] = data[key];
        }
      }
      let sortedCalendarEvents = Object.fromEntries( Object.entries(calEvents).sort(([, a], [, b]) => a.driveUpDate - b.driveUpDate || b.driveHomeDate - a.driveHomeDate) );
      setCalendarEvents(sortedCalendarEvents);
    });
  }, [currentDate]);
  return (
    <div className="calendar">
      <div className="calendar-days-of-week-container">
        {Utils.CalendarUtils.daysOfTheWeek.map(item =>
          <div key={item}> {item} </div>
        )}
      </div>
      {Object.entries(calendarData).map((week) =>
        <div key={JSON.stringify(week)} className="calendar-week-container" style={{ minHeight: minCellHeight }}>
          {Object.entries(Object.values(week)[1]).map((day) =>
            <CalendarDay
              key={JSON.stringify(day[1])}
              day={day[1].dayOfMonth}
              month={day[1].month}
              year={day[1].year}
              events={day[1].dayEvents}
              availableSlots={availableSlots}
              isThisToday={day[1].isThisToday}
              isThisMonth={day[1].isThisMonth}
              user={user}
              createEvent={createEvent}
            ></CalendarDay>
          )}
        </div>
      )}
      <ViewEvent calendarEvents={calendarEvents} calendarEventsLoaded={calendarEventsLoaded} eventId={eventId} user={user} saveEvent={saveEvent} deleteEvent={deleteEvent}></ViewEvent>
    </div>
  )
}

export default Calendar