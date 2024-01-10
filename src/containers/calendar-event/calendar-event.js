import { React } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import "./calendar-event.css";

const CalendarEvent = ({ event, eventIndex, eventDate, overflowView }) => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const minEventWidth = 55.7;
    const oneDay = 86400000;
    const cEvent = event.event;
    const driveUpLength = ((overflowView) ? 0 : (new Date(cEvent.startDate).getTime() - new Date(cEvent.driveUpDate).getTime()) / oneDay);
    const driveHomeLength = ((overflowView) ? 0 : (new Date(cEvent.driveHomeDate).getTime() - new Date(cEvent.endDate).getTime()) / oneDay);
    const tripLengthRemaining = (new Date(cEvent.driveHomeDate).getTime() - eventDate.getTime() + oneDay) / oneDay;
    //set start of week on sunday
    const dayOfWeekDay = (eventDate.getDay()===6)?0:eventDate.getDay();
    const eventLength = (dayOfWeekDay + tripLengthRemaining > 7) ? 7 - dayOfWeekDay : event.eventLength;
    const openEvent = (e) => {
        e.stopPropagation();
        navigate("/dashboard/calendar/" + cEvent.eId);
    }
    return (
        <div className={'calendar-event ' + ((eventId === cEvent.eId) ? 'calendar-event-selected' : '')}
            style={{
                backgroundColor: event.color,
                width: ((overflowView) ? '100%' : 'calc(100vw / 7 * ' + eventLength + ')'),
                minWidth: ((overflowView) ? '100%' : (minEventWidth * eventLength) + 'px'),
                top: (eventIndex * 24) + 'px'
            }}
            onClick={ openEvent }
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
                    visibility: ((overflowView || dayOfWeekDay + tripLengthRemaining < 8) ? 'visible' : 'hidden'),
                    width: 'calc(100vw / 7 * ' + driveHomeLength + ')',
                    minWidth:'max('+(minEventWidth * driveHomeLength) + 'px, 10px)',
                }}
            >
            </div>
        </div>
    )
};

export default CalendarEvent