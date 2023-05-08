import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import "./calendar-view-event.css";
import * as Utils from '../../utils';
import { Button } from "../../components/button/button.style";
import { Input } from "../../components/input/input.style";

const CalendarViewEvent = ({ eventId }) => {
  const calendarData = Utils.StaticData.calendarData;
  const location = useLocation();
  const navigate = useNavigate();
  const startDate = new Date();
  const endDate = new Date();
  const driveUpDate = new Date();
  const driveHomeDate = new Date();
  var validEventId = true;
  var editingEvent = false;
  var eventData = {};
  if (eventId != undefined) {
    if (isNaN(eventId)) {
      //invalidEventId
      validEventId = false;
      setTimeout(() => { navigate("/dashboard/calendar") }, 1000);
    } else {
      for (var calEvent in calendarData) {
        if (parseInt(calendarData[calEvent].eId) === parseInt(eventId)) {
          eventData = calendarData[calEvent];
        }
      }
      if (Object.keys(eventData).length === 0) {
        //invalidEventId
        validEventId = false;
        setTimeout(() => { navigate("/dashboard/calendar") }, 1000);
      }
    }
  } else {
    validEventId = false;
  }
  if (validEventId) {
    //console.log(eventData);
    startDate.setTime(eventData.startDate);
    endDate.setTime(eventData.endDate);
    driveUpDate.setTime(eventData.driveUpDate);
    driveHomeDate.setTime(eventData.driveHomeDate);
    editingEvent = (location.pathname.substring(location.pathname.length-6) === '/edit/');
  }
  return (
    <dialog style={{ visibility: (validEventId) ? 'visible' : 'hidden' }} className="calendar-view-event">
      <div>
        <Input
          disabled={!editingEvent}
          className="calendar-view-event-title"
          type="text"
          defaultValue={eventData.name}
          onChange={(e) => console.log('do nothing')}
          placeholder="Event Title"
        />
        <div>
          <Input
            disabled={!editingEvent}
            className="calendar-view-event-date"
            type="text"
            defaultValue={startDate.toDateString()}
            onChange={(e) => console.log('do nothing')}
            placeholder="Event Start Date"
          />
          &nbsp;to&nbsp;
          <Input
            disabled={!editingEvent}
            className="calendar-view-event-date"
            type="text"
            defaultValue={endDate.toDateString()}
            onChange={(e) => console.log('do nothing')}
            placeholder="Event End Date"
          />
        </div>
        <br></br>
        <div>Drive Up:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Input
          disabled={!editingEvent}
          className="calendar-view-event-date"
          type="text"
          defaultValue={driveUpDate.toDateString()}
          onChange={(e) => console.log('do nothing')}
          placeholder="Drive Up Date"
        />
        </div>
        <div>Drive Home: <Input
          disabled={!editingEvent}
          className="calendar-view-event-date"
          type="text"
          defaultValue={driveHomeDate.toDateString()}
          onChange={(e) => console.log('do nothing')}
          placeholder="Drive Home  Date"
        />
        </div>
        <br></br>
        <div className="calendar-view-event-location-container">
        <img  alt='locationIcon' className='calendar-view-event-location-icon' src={'/assets/locationIcon.png'}></img>
        <Input
          disabled={!editingEvent}
          className="calendar-view-event-location"
          type="text"
          defaultValue={eventData.location}
          onChange={(e) => console.log('do nothing')}
          placeholder="Location Information"
        />
        </div>
        <Input
          disabled={!editingEvent}
          className="calendar-view-event-notes"
          type="text"
          defaultValue={eventData.notes}
          onChange={(e) => console.log('do nothing')}
          placeholder="Misc Notes"
        />
        <br></br>
        <Button onClick={(e) => navigate('/dashboard/calendar')}>Close</Button>
      </div>
      <div style={{ display: (!validEventId) ? 'block' : 'none' }}>&nbsp;&nbsp;InValid Event ID, redirecting..</div>
    </dialog>
  )
}

export default CalendarViewEvent