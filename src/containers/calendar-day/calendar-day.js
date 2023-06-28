import "./calendar-day.css";
import CalendarEvent from '../calendar-event/calendar-event';
import CalendarOverflow from '../calendar-overflow/calendar-overflow';
import { React, memo } from "react";
const CalendarDay = ({ day, month, year, isThisToday, isThisMonth, events, availableSlots, user, createEvent }) => {
    const createNewEvent = () => {
        createEvent(year, month, day);
    }
    return (
        <div className={((isThisMonth) ? "calendar-day-container" : "calendar-day-container-notthismonth")} onClick={createNewEvent}>
            <div className={((isThisToday) ? "calendar-date-of-week-today" : "calendar-date-of-week")}>
                <div>{day}</div>
            </div>
            {
                (Object.keys(events).length > 0) ?
                    <div className='calendar-events'>
                        {Object.values(events).map((event, index) => {
                            if ((event.eventStartingToday || event.eventStartOfNextWeek) &&
                                (index < availableSlots || (index === availableSlots && index === Object.keys(events).length - 1))) {
                                return <CalendarEvent
                                    key={event.event.eId}
                                    eventIndex={index}
                                    eventDate={new Date(year, month, day)}
                                    event={event}></CalendarEvent>
                            }
                            return null;
                        }
                        )}
                        <CalendarOverflow
                            eventDate={new Date(year, month, day)}
                            user={user}
                            availableSlots={availableSlots}
                            events={events}>
                        </CalendarOverflow>
                    </div>
                    :
                    null
            }
        </div>
    )
};

export default memo(CalendarDay)