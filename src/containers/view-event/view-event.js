import { React, useState }  from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import "./view-event.css";
import * as Utils from '../../utils';
import { Button } from "../../components/button/button.style";
import ViewEventDetails from "../view-event-details/view-event-details";
import ViewEventGuests from "../view-event-guests/view-event-guests";

const ViewEvent = ({ eventId, user}) => {
  const calendarData = Utils.StaticData.calendarData;
  const location = useLocation();
  const navigate = useNavigate();
  const [detailsActive, setDetailsActive] = useState(true);
  var validEventId = true;
  var editingEvent = false;
  var eventData = {};
  if (eventId != undefined) {
    if (isNaN(eventId)) {
      validEventId = false;
      setTimeout(() => { navigate("/dashboard/calendar") }, 1000);
    } else {
      for (var calEvent in calendarData) {
        if (parseInt(calendarData[calEvent].eId) === parseInt(eventId)) {
          eventData = JSON.parse(JSON.stringify(calendarData[calEvent]));
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
    editingEvent = (eventData.guestsCanModify || location.pathname.substring(location.pathname.length - 5) === '/edit');
  }
  return (
    <dialog style={{ visibility: (validEventId) ? 'visible' : 'hidden' }} className="view-event">
      <nav className="view-event-nav">
        <button title="View Trip Details" className={'view-event-nav-tab-details ' + (detailsActive ? 'view-event-nav-tab-active' : '')} onClick={() => setDetailsActive(true) }>Trip Details</button>
        <button title="View Trip Guests" className={'view-event-nav-tab-guests ' + (!detailsActive ? 'view-event-nav-tab-active' : '')} onClick={() => setDetailsActive(false) }>Guests</button>
      </nav>
      <br></br>
      <ViewEventDetails detailsActive={detailsActive} eventData={eventData} editingEvent={editingEvent}></ViewEventDetails>
      <ViewEventGuests detailsActive={detailsActive} eventData={eventData} editingEvent={editingEvent} user={user}></ViewEventGuests>
      <br></br>
      <Button theme="black" className={"view-event-close-btn "+((editingEvent)?'':'view-event-close-btn-only')} onClick={(e) => navigate('/dashboard/calendar')}>Close</Button>
      <Button className={"view-event-save-btn "+((editingEvent)?'visible':'hidden')} onClick={(e) => navigate('/dashboard/calendar')}>Save</Button>
      <div style={{ display: (!validEventId) ? 'block' : 'none' }}>&nbsp;&nbsp;InValid Event ID, closing..</div>
    </dialog>
  )
}

export default ViewEvent