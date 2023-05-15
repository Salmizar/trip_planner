import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import "./calendar-event.css";

const CalendarEvent = ({ event, eventIndex, user, overflowView}) => {
    const navigate = useNavigate();
    let { eventId } = useParams();
    var cEvent = event.event;
    var driveUpLength = ((overflowView)? 0 : (cEvent.startDate - cEvent.driveUpDate) / 86400000);
    var driveHomeLength = ((overflowView)? 0: (cEvent.driveHomeDate - cEvent.endDate) / 86400000);
    const OpenEvent = (e) => {
        e.stopPropagation();
        navigate("/dashboard/calendar/" + cEvent.eId);
    }
    return (
        <div className={'calendar-event ' + ((!isNaN(eventId) && parseInt(eventId) === parseInt(cEvent.eId)) ? 'calendar-event-selected' : '')}
            style={{
                backgroundColor: event.color,
                width: ((overflowView)?'100%' : 'calc(100vw / 7 * ' + event.eventLength + ')'),
                top: (eventIndex * 24) + 'px'
            }}
            onClick={(e) => OpenEvent(e)}
        >
            <div className="calendar-event-driveUp" style={{ visibility: ((overflowView || event.eventStartingToday) ? 'visible' : 'hidden'), width: 'calc(100vw / 7 * ' + driveUpLength + ')' }}></div>
            <div className="calendar-event-title">{event.name}</div>
            <div className="calendar-event-driveHome" style={{ width: 'calc(100vw / 7 * ' + driveHomeLength + ')' }}></div>
        </div>
    )
}

export default CalendarEvent