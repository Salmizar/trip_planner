import React from 'react'
import "./calendar-day.css";
import * as Utils from '../../utils';
import CalendarEvent from '../calendar-event/calendar-event';
import CalendarOverflow from '../calendar-overflow/calendar-overflow';
const CalendarDay = ({ day, month, year, isThisToday, isThisMonth, events, availableSlots, user, createEvent }) => {
    return (
        <div className={((isThisMonth) ? "calendar-day-container" : "calendar-day-container-notthismonth")} onClick={() => createEvent(year, month, day)}>
            <div className={((isThisToday) ? "calendar-date-of-week-today" : "calendar-date-of-week")}>
                <div>{day}</div>
            </div>
            <div className='calendar-events'>
                {Object.values(events).map((event, index) => {
                    if (index < availableSlots || (index === availableSlots && index === Object.keys(events).length - 1)) {
                        if (event.eventStartingToday || event.eventStartOfNextWeek) {
                            return <CalendarEvent
                                key={index}
                                eventIndex={index}
                                eventDate={new Date(year, month, day)}
                                event={event}></CalendarEvent>
                        }
                    }
                }
                )}
                <CalendarOverflow
                    eventDate={new Date(year, month, day)}
                    user={user}
                    availableSlots={availableSlots}
                    events={events}>
                </CalendarOverflow>
            </div>
        </div>
    )
}

export default CalendarDay