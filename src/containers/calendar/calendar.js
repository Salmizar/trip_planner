import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./calendar.css";
import * as Utils from '../../utils';
import CalendarDay from '../calendar-day/calendar-day';
import ViewEvent from '../view-event/view-event';
const Calendar = ({ currentDate, user }) => {
  const [calendarData, setCalendarData] = useState(Utils.CalendarUtils.getCalendarData(currentDate,Utils.StaticData.calendarData) );
  const { eventId } = useParams();
  const saveEvent = function(eventData) {
    for (var eKey in Object.keys(Utils.StaticData.calendarData)) {
      if (eventData.eId === Utils.StaticData.calendarData[eKey].eId) {
        Utils.StaticData.calendarData[eKey] = {...eventData};
        setCalendarData(Utils.CalendarUtils.getCalendarData(currentDate,Utils.StaticData.calendarData) );
      }
    }
  }
  useEffect(() => {
    setCalendarData(Utils.CalendarUtils.getCalendarData(currentDate,Utils.StaticData.calendarData) );
  },[currentDate, Utils.StaticData.calendarData]);
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
              isThisToday={day[1].isThisToday}
              isThisMonth={day[1].isThisMonth}
              user={user}
            ></CalendarDay>
          )}
        </div>
      )}
      <ViewEvent eventId={eventId} user={user} saveEvent={saveEvent}></ViewEvent>
    </div>
  )
}

export default Calendar