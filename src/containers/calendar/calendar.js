import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import "./calendar.css";
import * as Utils from '../../utils';
import CalendarDay from '../calendar-day/calendar-day';
import CalendarViewEvent from '../calendar-view-event/calendar-view-event';
const Calendar = ({ currentDate }) => {
  var calendarData = Utils.CalendarUtils.getCalendarData(currentDate,Utils.StaticData.calendarData);
  let { eventId } = useParams();
  const navigate = useNavigate();
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
            ></CalendarDay>
          )}
        </div>
      )}
      <CalendarViewEvent eventId={eventId}></CalendarViewEvent>
    </div>
  )
}

export default Calendar