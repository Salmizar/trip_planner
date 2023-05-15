import React, { useState } from 'react'
import "./calendar-overflow.css";
import CalendarEvent from '../calendar-event/calendar-event';
import { Button } from "../../components/button/button.style";

const CalendarOverflow = ({ eventIndex, events, eventDate, user }) => {
    const [displayOverflowDialog, setDisplayOverflowDialog] = useState(false);
    const viewEvents = (e) => {
        e.stopPropagation();
        setDisplayOverflowDialog(!displayOverflowDialog);
        //document.body.addEventListener('click', closeOverflowDialog);
    }
    const closeOverflowDialog = (e) => {
        setDisplayOverflowDialog(!displayOverflowDialog);
        document.body.removeEventListener('click', closeOverflowDialog);
    }
    const closeOverflowView = (e) => {

    }
    return (
        <div className='calendar-event-overflow' style={{top: (eventIndex * 24) + 'px'}}>
            <div className='calendar-event-overflow-events' onClick={viewEvents}>
                {events && Object.keys(events.overflow).length} more event{((events && Object.keys(events.overflow).length > 1) ? 's' : '')}
            </div>
            <dialog className='calendar-event-overflow-dialog' style={{ display: (displayOverflowDialog) ? 'block' : 'none' }} onClick={(e) => e.stopPropagation()}>
                <div className='calendar-event-overflow-dialog-title'>
                    {eventDate.toLocaleDateString("en-us", { day: 'numeric', month: 'long', weekday: 'short' })}
                </div>
                <div className='calendar-event-overflow-event-list'>
                    {Object.values(events).map((event, index) => {
                        if (event.eventStartingToday || event.eventStartOfNextWeek) {
                            return <CalendarEvent key={index} eventIndex={index - 1} user={user} event={event} overflowView={true}></CalendarEvent>
                        }
                    })}
                    {Object.values(events.overflow).map((event, index) => {
                        return <CalendarEvent key={index} eventIndex={3 + index} user={user} event={event} overflowView={true}></CalendarEvent>
                    }
                    )}
                </div>
                <Button theme="black" className="calendar-event-overflow-close-btn" onClick={closeOverflowDialog}>Close</Button>

            </dialog>
        </div>
    )
}

export default CalendarOverflow