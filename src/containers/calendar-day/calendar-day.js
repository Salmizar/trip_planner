import React from 'react'
import "./calendar-day.css";
const CalendarDay = ({ day, month, year, isThisToday, isThisMonth, events}) => {
    return (
        <div className={((isThisMonth) ? "calendar-day-container" : "calendar-day-container-notthismonth")}>
            <div className={((isThisToday) ? "calendar-date-of-week-today" : "calendar-date-of-week")}>
                <div>{day}</div>
            </div>
            <div className='calendar-events'>
                {Object.values(events).map((event, index) =>
                    <div
                        className='calendar-event'
                        style={{
                            visibility: (event.eventStartingToday) ? 'visible' : 'hidden',
                            backgroundColor: event.color, width: 'calc(100vw / 7 * ' + event.eventLength + ')',
                            top: (index * 24) + 'px'
                        }}
                        key={JSON.stringify('-'+day+'-'+month+'-'+year+'_'+index)}
                    >
                        {event.name + '-' + index}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CalendarDay