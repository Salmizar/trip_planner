import React, { createRef, useState, useEffect } from 'react'
import "./calendar-overflow.css";
import CalendarEvent from '../calendar-event/calendar-event';
import { Button } from "../../components/button/button.style";

const CalendarOverflow = ({ events, eventDate, user, availableSlots }) => {
  const [displayOverflowDialog, setDisplayOverflowDialog] = useState(false);
  const overflowDialog = createRef();
  const displayOverflowEvents = Object.keys(events).length - availableSlots >= 2;
  const eventCount = Math.max(Object.keys(events).length - availableSlots, 1);
  const toggleOverflowDialog = (e) => {
    e.stopPropagation();
    setDisplayOverflowDialog(!displayOverflowDialog);
  }
  const stopPropagation = (e) => {
    e.stopPropagation();
  }
  useEffect(() => {
    const checkOverflowDialog = (e) => {
      let overflowPadding = 20;
      let overflowRect = overflowDialog.current.getBoundingClientRect();
      let newLeftPos = (overflowDialog.current.parentElement.getBoundingClientRect().left + overflowRect.width + (overflowPadding * 2) - 125);
      let windowWidth = window.innerWidth;
      if (windowWidth < newLeftPos) {
        if (windowWidth < (overflowPadding + overflowRect.width + overflowPadding)) {
          overflowDialog.current.style.left = (overflowPadding - overflowDialog.current.parentElement.getBoundingClientRect().left) + 'px';
        } else {
          overflowDialog.current.style.left = (windowWidth - newLeftPos - 125 + overflowPadding) + 'px';
        }
      } else {
        overflowDialog.current.style.left = 'calc((100vw / 7 / 2) - 125px)';
      }
      let newTopPos = (overflowDialog.current.parentElement.getBoundingClientRect().top + overflowRect.height + (overflowPadding * 2));
      let windowHeight = window.innerHeight;
      if (windowHeight < newTopPos) {
        if (windowHeight < (overflowPadding + overflowRect.height + overflowPadding)) {
          overflowDialog.current.style.top = (overflowPadding - overflowDialog.current.parentElement.getBoundingClientRect().top) + 'px';
        } else {
          overflowDialog.current.style.top = (windowHeight - newTopPos + overflowPadding) + 'px';
        }
      } else {
        overflowDialog.current.style.top = '-100px';
      }
    }
    if (displayOverflowDialog) {
      checkOverflowDialog();
      window.addEventListener('resize', checkOverflowDialog);
    } else {
      window.removeEventListener('resize', checkOverflowDialog);
    }
    return _ => {
      window.removeEventListener('resize', checkOverflowDialog);
    }
  }, [displayOverflowDialog, overflowDialog]);
  return (
    <div className='calendar-event-overflow' style={{ top: (availableSlots * 24) + 'px', visibility: (displayOverflowEvents) ? 'visible' : 'hidden' }}>
      <div className='calendar-event-overflow-events' onClick={toggleOverflowDialog}>
        {eventCount} more
      </div>
      <dialog ref={overflowDialog} className='calendar-event-overflow-dialog' style={{ display: (displayOverflowDialog) ? 'block' : 'none' }} onClick={ stopPropagation }>
        <div className='calendar-event-overflow-dialog-title'>
          {eventDate.toLocaleDateString("en-us", { day: 'numeric', month: 'long', weekday: 'short' })}
        </div>
        <div className='calendar-event-overflow-event-list'>
          {Object.values(events).map((event, index) => {
            return <CalendarEvent key={event.event.eId} eventIndex={index} user={user} eventDate={eventDate} event={event} overflowView={true}></CalendarEvent>
          })}
        </div>
        <Button theme="black" className="calendar-event-overflow-close-btn" onClick={toggleOverflowDialog}>Close</Button>

      </dialog>
    </div>
  )
}

export default CalendarOverflow