import { React, createElement, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "./calendar.css";
import * as Utils from '../../utils';
import CalendarDay from '../calendar-day/calendar-day';
import ViewEvent from '../view-event/view-event';
const Calendar = ({ currentDate, user }) => {
  const navigate = useNavigate();
  const [calendarData, setCalendarData] = useState(Utils.CalendarUtils.getCalendarData(currentDate, Utils.StaticData.calendarData));
  const [availableSlots, setAvailableSlots] = useState(4);
  const { eventId } = useParams();
  const saveEvent = function (eventData) {
    for (var eKey in Object.keys(Utils.StaticData.calendarData)) {
      if (eventData.eId === Utils.StaticData.calendarData[eKey].eId) {
        Utils.StaticData.calendarData[eKey] = { ...eventData };
        setCalendarData(Utils.CalendarUtils.getCalendarData(currentDate, Utils.StaticData.calendarData));
      }
    }
    navigate("/dashboard/calendar");
  }
  const deleteEvent = function (eventData) {
    if (window.confirm('Are you sure you want to delete this?')) {
      for (var eKey = 0; eKey < Utils.StaticData.calendarData.length; eKey++) {
        if (eventData.eId === Utils.StaticData.calendarData[eKey].eId) {
          Utils.StaticData.calendarData.splice(eKey, 1);
          setCalendarData(Utils.CalendarUtils.getCalendarData(currentDate, Utils.StaticData.calendarData));
        }
      }
      navigate("/dashboard/calendar");
    }
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
    Utils.StaticData.calendarData.push(newEvent);
    setCalendarData(Utils.CalendarUtils.getCalendarData(currentDate, Utils.StaticData.calendarData));
    navigate("/dashboard/calendar/" + newEvent.eId + '/edit');
  }
  const checkAvailableSlots = () => {
    //85 = main div offset+days of week. 22 = date height and event cell height
    let cellHeight = ((window.innerHeight - 85) / Object.entries(calendarData).length) - 22 ;
    let availSlots = Math.floor(cellHeight / 23) - 1;// -1 for overflow spacing
    console.log(availSlots,cellHeight, window.innerHeight, Object.entries(calendarData).length);
    setAvailableSlots(availSlots);
  }
  useEffect(() => {
    window.addEventListener('resize', checkAvailableSlots);
    return _ => {
      window.removeEventListener('resize', checkAvailableSlots);
    }
  }, [calendarData]);

  useEffect(() => {
    setCalendarData(Utils.CalendarUtils.getCalendarData(currentDate, Utils.StaticData.calendarData));
  }, [currentDate, Utils.StaticData.calendarData]);
  return (
    <div className="calendar">
      <div className="calendar-days-of-week-container">
        {Utils.CalendarUtils.daysOfTheWeek.map(item =>
          <div key={item}> {item} </div>
        )}
      </div>
      {Object.entries(calendarData).map((week) =>
        <div key={JSON.stringify(week)} className="calendar-week-container">
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