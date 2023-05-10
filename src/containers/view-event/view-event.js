import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./view-event.css";
import * as Utils from '../../utils';
import { Button } from "../../components/button/button.style";
import ViewEventDetails from "../view-event-details/view-event-details";
import ViewEventGuests from "../view-event-guests/view-event-guests";

const ViewEvent = ({ eventId, user }) => {
  const navigate = useNavigate();
  const [detailsActive, setDetailsActive] = useState(true);
  const [updatedMyGuestStatus, setUpdatedMyGuestStatus] = useState(false);
  const [displayEventDialog, setDisplayEventDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState(false);
  const [eventData, setEventData] = useState({});
  const changeMaybe = function (uId, newState) {
    var tempGuestList = eventData.guests;
    tempGuestList[getGuest(uId)].maybe = newState;
    updateEventData('guests', tempGuestList);
    setUpdatedMyGuestStatus(true);
  }
  const removeUser = function (uId) {
    var tempGuestList = eventData.guests;
    tempGuestList.splice(getGuest(uId), 1);
    updateEventData('guests', tempGuestList);
    setUpdatedMyGuestStatus(true);
  }
  const updateEventData = function (obj, data) {
    let tempEventData = {...eventData};
    tempEventData[obj] = data;
    setEventData(tempEventData);
  }
  const getGuest = function (uId) {
    for (var guest in eventData.guests) {
      if (uId === eventData.guests[guest].uId) {
        return guest;
      }
    }
    return undefined;
  }
  useEffect(() => {
    if (eventId != undefined) {
      if (isNaN(eventId)) {
        //invalid EventId
        navigate("/dashboard/calendar");
      } else {
        var calendarData = Utils.StaticData.calendarData;
        var entryFound = false;
        for (var calEvent in calendarData) {
          if (parseInt(calendarData[calEvent].eId) === parseInt(eventId)) {
            setEventData(JSON.parse(JSON.stringify(calendarData[calEvent])));
            entryFound = true;
            setDisplayEventDialog(true);
          }
        }
        if (!entryFound) {
          //invalidEventId
          navigate("/dashboard/calendar");
        }
      }
    } else if (eventId === undefined) {
      setDisplayEventDialog(false);
      setUpdatedMyGuestStatus(false);
    }
  }, [eventId]);
  useEffect(() => {
    if (displayEventDialog) {
      var isEventOwner = false;
      for ( var guest in eventData.guests) {
        if (user && eventData.guests[guest].uId === user.uid && eventData.guests[guest].eventOwner) {
            isEventOwner = true;
            break;
        }
      }
      setEditingEvent(eventData.guestsCanModify || isEventOwner);
    }
  }, [eventData]);
  return (
    <dialog style={{ display: (displayEventDialog) ? 'block' : 'none' }} className="view-event">
      <nav className="view-event-nav">
        <button title="View Trip Details" className={'view-event-nav-tab-details ' + (detailsActive ? 'view-event-nav-tab-active' : '')} onClick={() => setDetailsActive(true)}>Trip Details</button>
        <button title="View Trip Guests" className={'view-event-nav-tab-guests ' + (!detailsActive ? 'view-event-nav-tab-active' : '')} onClick={() => setDetailsActive(false)}>Guests</button>
      </nav>
      <br></br>
      <ViewEventDetails
        detailsActive={detailsActive}
        eventData={eventData}
        editingEvent={editingEvent}
        updateEventData={updateEventData}
      ></ViewEventDetails>
      <ViewEventGuests
        detailsActive={detailsActive}
        eventData={eventData}
        editingEvent={editingEvent}
        user={user}
        changeMaybe={changeMaybe}
        removeUser={removeUser}
        updateEventData={updateEventData}
      ></ViewEventGuests>
      <br></br>
      <Button theme="black" className={"view-event-close-btn " + ((editingEvent || updatedMyGuestStatus) ? '' : 'view-event-close-btn-only')} onClick={(e) => navigate('/dashboard/calendar')}>Close</Button>
      <Button className={"view-event-save-btn " + ((editingEvent || updatedMyGuestStatus) ? 'visible' : 'hidden')} onClick={(e) => navigate('/dashboard/calendar')}>Save</Button>
    </dialog>
  )
}

export default ViewEvent