import React, { useState } from 'react'
import "./calendar-overflow.css";
import * as Utils from '../../utils';
import CalendarEvent from '../calendar-event/calendar-event';
import { Button } from "../../components/button/button.style";

const CalendarOverflow = ({ eventIndex, events, eventDate, user, availableSlots }) => {
    const [displayOverflowDialog, setDisplayOverflowDialog] = useState(false);
    const viewEvents = (e) => {
        e.stopPropagation();
        setDisplayOverflowDialog(!displayOverflowDialog);
    }
    const closeOverflowDialog = (e) => {
        setDisplayOverflowDialog(!displayOverflowDialog);
        document.body.removeEventListener('click', closeOverflowDialog);
    }
    return (
        <div className='calendar-event-overflow' style={{top: (eventIndex * 24) + 'px'}}>
            <div className='calendar-event-overflow-events' onClick={viewEvents}>
            {Object.keys(events).length-availableSlots} more event{(((Object.keys(events).length-availableSlots) > 1) ? 's' : '')}
            </div>
            <dialog className='calendar-event-overflow-dialog' style={{ display: (displayOverflowDialog) ? 'block' : 'none' }} onClick={(e) => e.stopPropagation()}>
                <div className='calendar-event-overflow-dialog-title'>
                    {eventDate.toLocaleDateString("en-us", { day: 'numeric', month: 'long', weekday: 'short' })}
                </div>
                <div className='calendar-event-overflow-event-list'>
                    {Object.values(events).map((event, index) => {
                            return <CalendarEvent key={index} eventIndex={index} user={user} event={event} overflowView={true}></CalendarEvent>
                    })}
                </div>
                <Button theme="black" className="calendar-event-overflow-close-btn" onClick={closeOverflowDialog}>Close</Button>

            </dialog>
        </div>
    )
}

export default CalendarOverflow