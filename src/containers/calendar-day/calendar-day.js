import React from 'react'
import "./calendar-day.css";
import CalendarEvent from '../calendar-event/calendar-event';
const CalendarDay = ({ day, month, year, isThisToday, isThisMonth, events}) => {
    return (
        <div className={((isThisMonth) ? "calendar-day-container" : "calendar-day-container-notthismonth")}>
            <div className={((isThisToday) ? "calendar-date-of-week-today" : "calendar-date-of-week")}>
                <div>{day}</div>
            </div>
            <div className='calendar-events'>
                {Object.values(events).map((event, index) =>
                { 
                    if (event.eventStartingToday || event.eventStartOfNextWeek)
                        return <CalendarEvent key={JSON.stringify('-' + day + '-' + month + '-' + year + '_' + index)} eventIndex={index} event={event}></CalendarEvent>
                }
                )}
            </div>
        </div>
    )
}

export default CalendarDay