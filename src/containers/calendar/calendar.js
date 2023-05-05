import React from 'react'
import "./calendar.css";
import * as Utils from '../../utils';
import CalendarDay from '../calendar-day/calendar-day';
const Calendar = ({ currentDate }) => {
  const datesOfTheWeek = Utils.CalendarUtils.datesOfTheWeek(currentDate);
  const tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - currentDate.getDay());
  var calendarData = Utils.StaticData.calendarData;
  for (var key in calendarData) {

    let event = calendarData[key];
    let driveUp = new Date(event.driveUpDate);
    let driveHome = new Date(event.driveHomeDate);
    let eventLength = 1 + ((driveHome.getTime() - driveUp.getTime()) / 86400000);
    let eventWeek = Utils.CalendarUtils.getDateWeek(driveUp);
    if (datesOfTheWeek[eventWeek]) {
      let calendarDayEvents = datesOfTheWeek[eventWeek][driveUp.getTime()].dayEvents;
      for (var eventIndex = 1; eventIndex <= 4; eventIndex++) {
        if (Object.keys(calendarDayEvents['e' + eventIndex]).length === 0) {
          //Found an open slot
          var eventSlotOffset = 0;
          for (var eventLengthIndex = 0; eventLengthIndex < eventLength; eventLengthIndex++) {
            let dUp = new Date(event.driveUpDate);
            dUp.setDate(dUp.getDate() + eventLengthIndex);
            let eWeek = Utils.CalendarUtils.getDateWeek(dUp);
            if (dUp.getDay() === 0 && eventIndex > 1) {
              //new Week, see if we can move the event to lower slots
              for (var eventOffsetIndex = 1; eventOffsetIndex <= 4; eventOffsetIndex++) {
                if (datesOfTheWeek[eWeek] && Object.keys(datesOfTheWeek[eWeek][dUp.getTime()].dayEvents['e' + (eventOffsetIndex)]).length === 0) {
                  eventSlotOffset = eventIndex - eventOffsetIndex;
                  break;
                }
              }
            }
            if (datesOfTheWeek[eWeek]) {
              datesOfTheWeek[eWeek][dUp.getTime()].dayEvents['e' + (eventIndex - eventSlotOffset)] = {
                name: event.name,
                event: event,
                eventLength: eventLength - eventLengthIndex,
                eventStartingToday: (eventLengthIndex === 0 || dUp.getDay() === 0),
                color: event.color
              }
            }
          }
          break;
        } else if (eventIndex === 4) {
          calendarDayEvents['overflow']['e' + Object.keys(calendarDayEvents['overflow']).length] = {
            name: event.name,
            event: event,
            eventLength: eventLength,
            eventStartingToday: (eventLengthIndex === 0 || driveUp.getDay() === 0),
            color: event.color

          }
        }
      }
    }
  }
  return (
    <div className="calendar">
      <div className="calendar-days-of-week-container">
        {Utils.CalendarUtils.daysOfTheWeek.map(item =>
          <div key={item}> {item} </div>
        )}
      </div>
      {Object.entries(datesOfTheWeek).map((week) =>
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