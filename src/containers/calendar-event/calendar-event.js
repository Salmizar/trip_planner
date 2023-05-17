import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import "./calendar-event.css";

const CalendarEvent = ({ event, eventIndex, eventDate, overflowView }) => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const minEventWidth = 55.7;
    const oneDay = 86400000;
    const cEvent = event.event;
    const driveUpLength = ((overflowView) ? 0 : (cEvent.startDate - cEvent.driveUpDate) / oneDay);
    const driveHomeLength = ((overflowView) ? 0 : (cEvent.driveHomeDate - cEvent.endDate) / oneDay);
    const tripLengthRemaining = (cEvent.driveHomeDate - eventDate.getTime() + oneDay) / oneDay;
    const dayOfWeek = new Date(cEvent.driveUpDate);
    const eventLength = (dayOfWeek.getDay() + tripLengthRemaining > 7) ? 7 - dayOfWeek.getDay() : event.eventLength;
    const OpenEvent = (e) => {
        e.stopPropagation();
        navigate("/dashboard/calendar/" + cEvent.eId);
    }
    return (
        <div className={'calendar-event ' + ((!isNaN(eventId) && parseInt(eventId) === parseInt(cEvent.eId)) ? 'calendar-event-selected' : '')}
            style={{
                backgroundColor: event.color,
                width: ((overflowView) ? '100%' : 'calc(100vw / 7 * ' + eventLength + ')'),
                minWidth: (minEventWidth * eventLength) + 'px',
                top: (eventIndex * 24) + 'px'
            }}
            onClick={(e) => OpenEvent(e)}
        >
            <div
                className="calendar-event-driveUp"
                style={{
                    visibility: ((overflowView || event.eventStartingToday) ? 'visible' : 'hidden'),
                    width: 'calc(100vw / 7 * ' + driveUpLength + ')',
                    minWidth:'max('+(minEventWidth * driveUpLength) + 'px, 10px)',
                }}
            >
            </div>
            <div className="calendar-event-title">{event.name}</div>
            <div
                className="calendar-event-driveHome"
                style={{
                    visibility: ((overflowView || dayOfWeek.getDay() + tripLengthRemaining < 8) ? 'visible' : 'hidden'),
                    width: 'calc(100vw / 7 * ' + driveHomeLength + ')',
                    minWidth:'max('+(minEventWidth * driveHomeLength) + 'px, 10px)',
                }}
            >
            </div>
        </div>
    )
}

export default CalendarEvent