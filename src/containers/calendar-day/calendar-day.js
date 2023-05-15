import React from 'react'
import "./calendar-day.css";
import CalendarEvent from '../calendar-event/calendar-event';
import CalendarOverflow from '../calendar-overflow/calendar-overflow';
const CalendarDay = ({ day, month, year, isThisToday, isThisMonth, events, availableSlots, user, createEvent}) => {
    const maxSlots = 4;
    return (
        <div className={((isThisMonth) ? "calendar-day-container" : "calendar-day-container-notthismonth")} onClick={() =>  createEvent(year, month, day) }>
            <div className={((isThisToday) ? "calendar-date-of-week-today" : "calendar-date-of-week")}>
                <div>{day}</div>
            </div>
            <div className='calendar-events'>
                {Object.values(events).map((event, index) =>
                { 
                    if (index < availableSlots && (event.eventStartingToday || event.eventStartOfNextWeek)) {
                        return <CalendarEvent key={index} eventIndex={index} user={user} event={event}></CalendarEvent>
                    } else if (index === 4 && Object.keys(event).length > 0) {
                        return <CalendarOverflow key={index} eventIndex={index - (maxSlots - availableSlots)} eventDate={new Date(year, month, day)} user={user} availableSlots={availableSlots} events={events}></CalendarOverflow>
                    }
                }
                )}
            </div>
        </div>
    )
}

export default CalendarDay