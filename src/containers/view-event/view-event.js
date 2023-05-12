import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./view-event.css";
import * as Utils from '../../utils';
import { Button } from "../../components/button/button.style";
import ViewEventDetails from "../view-event-details/view-event-details";
import ViewEventGuests from "../view-event-guests/view-event-guests";

const ViewEvent = ({ eventId, user, SaveEvent, DeleteEvent }) => {
  const navigate = useNavigate();
  const [detailsActive, setDetailsActive] = useState(true);
  const [userChangedEvent, setUserChangedEvent] = useState(false);
  const [displayEventDialog, setDisplayEventDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [eventData, setEventData] = useState({});
  const ChangeMaybe = function (uId, newState) {
    var tempGuestList = eventData.guests;
    tempGuestList[GetGuest(uId)].maybe = newState;
    UpdateEventData('guests', tempGuestList);
  }
  const AddRemoveUser = function (addUser, uId, name) {
    var tempGuestList = eventData.guests;
    if (addUser) {
      tempGuestList[Object.keys(tempGuestList).length] = { uId: uId, name: name };
    } else {
      tempGuestList.splice(GetGuest(uId), 1);
    }
    UpdateEventData('guests', tempGuestList);
  }
  const UpdateEventData = function (obj, data) {
    let tempEventData = { ...eventData };
    tempEventData[obj] = data;
    setUserChangedEvent(true);
    setEventData(tempEventData);
  }
  const GetGuest = (uId) => {
    for (var guest in eventData.guests) {
      if (uId === eventData.guests[guest].uId) {
        return guest;
      }
    }
    return undefined;
  }
  const SaveChanges = () => {
    if (eventData.name.length===0) {
      alert('The Event Title is missing');
    } else if (eventData.startDate > eventData.endDate) {
      alert('Trip start date is before end Date');
    } else if (eventData.startDate < eventData.driveUpDate) {
      alert('Trip start date is before you drive up');
    } else if (eventData.startDate > eventData.driveHomeDate) {
      alert('Trip start date is after you drive home');
    } else if (eventData.endDate > eventData.driveHomeDate) {
      alert('Trip end date is after you drive home');
    } else if (eventData.endDate < eventData.driveUpDate) {
      alert('Trip end date is before you drive up');
    } else {
      delete eventData.newEvent;
      SaveEvent(eventData);
    }
  }
  const DeleteTheEvent = () => {
    DeleteEvent(eventData);
  }
  const CloseViewEvent = () => {
    navigate('/dashboard/calendar');
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
            setUserChangedEvent(calendarData[calEvent].newEvent);
          }
        }
        if (!entryFound) {
          //invalidEventId
          navigate("/dashboard/calendar");
        }
      }
    } else if (eventId === undefined) {
      setDisplayEventDialog(false);
      setUserChangedEvent(false);
    }
  }, [eventId]);
  useEffect(() => {
    if (displayEventDialog) {
      var isEventOwner = false;
      var isEventMember = false;
      for (var guest in eventData.guests) {
        if (user && eventData.guests[guest].uId === user.uid) {
          isEventOwner = eventData.guests[guest].eventOwner;
          isEventMember = true;
          break;
        }
      }
      setIsMember(isEventMember);
      setEditingEvent(eventData.guestsCanModify || isEventOwner);
    }
  }, [eventData, user]);
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
        UpdateEventData={UpdateEventData}
      ></ViewEventDetails>
      <ViewEventGuests
        detailsActive={detailsActive}
        eventData={eventData}
        editingEvent={editingEvent}
        user={user}
        isMember={isMember}
        ChangeMaybe={ChangeMaybe}
        AddRemoveUser={AddRemoveUser}
        UpdateEventData={UpdateEventData}
      ></ViewEventGuests>
      <br></br>
      <div className='view-event-btn-container'>
        <Button theme="black" className={"view-event-close-btn " + ((eventData.newEvent) ? 'hidden' : 'visible')} onClick={CloseViewEvent}>Close</Button>
        <Button className={"view-event-delete-btn " + ((editingEvent) ? 'visible' : 'hidden')} onClick={DeleteTheEvent}>Delete</Button>
        <Button className={"view-event-save-btn " + ((userChangedEvent) ? 'visible' : 'hidden')} onClick={SaveChanges}>Save</Button>
      </div>
    </dialog>
  )
}

export default ViewEvent