import React from 'react'
import "./calendar-event.css";

const CalendarEvent = ({ event, eventIndex }) => {
    var cEvent = event;
    var driveUpLength = (cEvent.event.startDate - cEvent.event.driveUpDate) / 86400000;
    var driveHomeLength = (cEvent.event.driveHomeDate - cEvent.event.endDate) / 86400000;
    if (driveUpLength > 0) {
        var dUp = new Date(cEvent.event.driveUpDate);
        var dHome = new Date(cEvent.event.driveHomeDate);
        var sDate = new Date(cEvent.event.startDate);
        var eDate = new Date(cEvent.event.endDate);
        console.log(cEvent,dUp.toDateString(), dHome.toDateString(),sDate.toDateString(),eDate.toDateString());
    }
    return (
        <div className='calendar-event'
            style={{ backgroundColor: event.color, width: 'calc(100vw / 7 * ' + event.eventLength + ')', top: (eventIndex * 24) + 'px' }}
        >
            <div className="calendar-event-driveUp" style={{visibility: ((cEvent.eventStartingToday)?'visible':'hidden'), width: 'calc(100vw / 7 * ' + driveUpLength + ')' }}></div>
            <div className="calendar-event-title">&nbsp;&nbsp;{event.name}</div>
            <div className="calendar-event-driveHome" style={{width: 'calc(100vw / 7 * ' + driveHomeLength + ')'}}></div>
        </div>
    )
}

export default CalendarEvent