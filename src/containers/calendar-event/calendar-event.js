import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import "./calendar-event.css";

const CalendarEvent = ({ event, eventIndex, user}) => {
    const navigate = useNavigate();
    let { eventId } = useParams();
    var cEvent = event;
    var driveUpLength = (cEvent.event.startDate - cEvent.event.driveUpDate) / 86400000;
    var driveHomeLength = (cEvent.event.driveHomeDate - cEvent.event.endDate) / 86400000;
    const canEditEvent = function() {
        if (cEvent.event.guestsCanModify) {
            navigate("/dashboard/calendar/" + cEvent.event.eId+'/edit');
        } else {
            for ( var guest in cEvent.event.guests) {
                if (guest.uId === user.uid && guest.eventOwner) {
                    navigate("/dashboard/calendar/" + cEvent.event.eId+'/edit');
                }
            }
        }
        return false;
    }
    return (
        <div className={'calendar-event ' + ((!isNaN(eventId) && parseInt(eventId) === parseInt(cEvent.event.eId)) ? 'calendar-event-selected' : '')}
            style={{ backgroundColor: event.color, width: 'calc(100vw / 7 * ' + event.eventLength + ')', top: (eventIndex * 24) + 'px' }}
            onClick={() => navigate("/dashboard/calendar/" + cEvent.event.eId)}
            onDoubleClick={() => canEditEvent()}
        >
            <div className="calendar-event-driveUp" style={{ visibility: ((cEvent.eventStartingToday) ? 'visible' : 'hidden'), width: 'calc(100vw / 7 * ' + driveUpLength + ')' }}></div>
            <div className="calendar-event-title">{event.name}</div>
            <div className="calendar-event-driveHome" style={{ width: 'calc(100vw / 7 * ' + driveHomeLength + ')' }}></div>
        </div>
    )
}

export default CalendarEvent