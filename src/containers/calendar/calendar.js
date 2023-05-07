import React from 'react'
import "./calendar.css";
import * as Utils from '../../utils';
import CalendarDay from '../calendar-day/calendar-day';
const Calendar = ({ currentDate }) => {
  var calendarData = Utils.CalendarUtils.getCalendarData(currentDate,Utils.StaticData.calendarData);
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
    </div>
  )
}

export default Calendar