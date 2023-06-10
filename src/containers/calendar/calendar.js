import { React, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "./calendar.css";
import * as Utils from '../../utils';
import CalendarDay from '../calendar-day/calendar-day';
import ViewEvent from '../view-event/view-event';
const Calendar = ({ currentDate, user }) => {
  const navigate = useNavigate();
  const [calendarData, setCalendarData] = useState({});
  const [availableSlots, setAvailableSlots] = useState(1);
  const [minCellHeight, setMinCellHeight] = useState(100);
  const { eventId } = useParams();
  const saveEvent = function (eventData) {
    if (Utils.StaticData.calData.calendarData[eventData.eId]) {
      Utils.StaticData.calData.calendarData[eventData.eId] = { ...eventData };
      setCalendarData(Utils.CalendarUtils.getCalendarData(currentDate, Utils.StaticData.calData.calendarData));
    }
    navigate("/dashboard/calendar");
  }
  const deleteEvent = function (eventData) {
    if (Utils.StaticData.calData.calendarData[eventData.eId]) {
      delete Utils.StaticData.calData.calendarData[eventData.eId];
      setCalendarData(Utils.CalendarUtils.getCalendarData(currentDate, Utils.StaticData.calData.calendarData));
    }
    navigate("/dashboard/calendar");
  }
  const createEvent = function (year, month, day) {
    var newEventDate = new Date(year, month, day);
    var newEvent = { ...Utils.CalendarUtils.newEventObject(newEventDate) };
    newEvent.guests = [
      {
        uId: user.uid,
        name: user.displayName,
        eventOwner: true
      }
    ]
    Utils.StaticData.calData.calendarData[newEvent.eId] = newEvent;
    Utils.StaticData.calData.calendarData = Object.fromEntries(
      Object.entries(Utils.StaticData.calData.calendarData).sort(([, a], [, b]) => a.driveUpDate - b.driveUpDate || b.driveHomeDate - a.driveHomeDate)
    )
    setCalendarData(Utils.CalendarUtils.getCalendarData(currentDate, Utils.StaticData.calData.calendarData));
    navigate("/dashboard/calendar/" + newEvent.eId);
  }
  useEffect(() => {
    const checkAvailableSlots = () => {
      //85 = main div offset+days of week. 22 = date height. 25 = cell height
      let cellHeight = ((window.innerHeight - 85) / Object.entries(calendarData).length) - 22;
      let minHeight = (415 / ((calendarData.length)?Object.entries(calendarData).length:5));
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
    console.log('setCalendarData');
    setCalendarData(Utils.CalendarUtils.getCalendarData(currentDate, Utils.StaticData.calData.calendarData));
  }, [currentDate, Utils.StaticData.calData.calendarData]);
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
      <ViewEvent eventId={eventId} user={user} saveEvent={saveEvent} deleteEvent={deleteEvent}></ViewEvent>
    </div>
  )
}

export default Calendar