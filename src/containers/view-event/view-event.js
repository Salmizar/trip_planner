import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./view-event.css";
import { Button } from "../../components/button/button.style";
import ViewEventDetails from "../view-event-details/view-event-details";
import ViewEventGuests from "../view-event-guests/view-event-guests";

const ViewEvent = ({ calendarEvents, calendarEventsLoaded, eventId, user, saveEvent, deleteEvent }) => {
  const navigate = useNavigate();
  const [detailsTabActive, setdetailsTabActive] = useState(true);
  const [userChangedEvent, setUserChangedEvent] = useState(false);
  const [displayEventDialog, setDisplayEventDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [eventData, setEventData] = useState({});
  const changeMaybe = function (uId, newState) {
    var tempGuestList = eventData.guests;
    tempGuestList[getGuest(uId)].maybe = newState;
    updateEventData('guests', tempGuestList);
  }
  const addRemoveUser = function (addUser, uId, name) {
    var tempGuestList = eventData.guests;
    if (addUser) {
      if (tempGuestList.find((guest) => guest.uId === uId) === undefined) {
        tempGuestList[Object.keys(tempGuestList).length] = { uId: uId, name: name };
      }
    } else {
      tempGuestList.splice(getGuest(uId), 1);
    }
    updateEventData('guests', tempGuestList);
  }
  const updateEventData = function (obj, data) {
    let tempEventData = { ...eventData };
    tempEventData[obj] = data;
    setUserChangedEvent(true);
    setEventData(tempEventData);
  }
  const getGuest = (uId) => {
    return eventData.guests.findIndex(guest => guest.uId === uId);
  }
  const saveChanges = () => {
    if (eventData.name.length === 0) {
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
      saveEvent(eventData);
    }
  }
  const deleteTheEvent = () => {
    if (eventData.newEvent || window.confirm('Are you sure you want to delete this?')) {
      deleteEvent(eventData);
    }
  }
  const closeViewEvent = () => {
    navigate('/dashboard/calendar');
  }
  useEffect(() => {
    if (calendarEventsLoaded) {
      if (eventId !== undefined) {
        if (calendarEvents[eventId]) {
          setEventData(JSON.parse(JSON.stringify(calendarEvents[eventId])));
          setDisplayEventDialog(true);
          setUserChangedEvent(calendarEvents[eventId].newEvent);
        } else {
          //no Event found, invalid EventId
          navigate("/dashboard/calendar");
        }
      } else if (eventId === undefined) {
        setDisplayEventDialog(false);
        setUserChangedEvent(false);
      }
    }
  }, [eventId, calendarEvents, calendarEventsLoaded, navigate, displayEventDialog]);
  useEffect(() => {
    if (displayEventDialog) {
      var isEventOwner = false;
      var isEventMember = false;
      let guestIndex = eventData.guests.findIndex(guest => user && guest.uId === user.uid);
      if (guestIndex >= 0) {
        isEventOwner = eventData.guests[guestIndex].eventOwner;
        isEventMember = true;
      }
      setIsMember(isEventMember);
      setEditingEvent(eventData.guestsCanModify || isEventOwner);
    }
  }, [eventData, user, displayEventDialog]);
  return (
    <div className='view-event-bg' style={{ display: (displayEventDialog) ? 'block' : 'none' }}>
      <dialog className="view-event">
        <nav className="view-event-nav">
          <button title="View Trip Details" className={'view-event-nav-tab-details ' + (detailsTabActive ? 'view-event-nav-tab-active' : '')} onClick={() => setdetailsTabActive(true)}>Trip Details</button>
          <button title="View Trip Guests" className={'view-event-nav-tab-guests ' + (!detailsTabActive ? 'view-event-nav-tab-active' : '')} onClick={() => setdetailsTabActive(false)}>Guests</button>
        </nav>
        <ViewEventDetails
          detailsTabActive={detailsTabActive}
          eventData={eventData}
          editingEvent={editingEvent}
          updateEventData={updateEventData}
        ></ViewEventDetails>
        <ViewEventGuests
          detailsTabActive={detailsTabActive}
          eventData={eventData}
          editingEvent={editingEvent}
          user={user}
          isMember={isMember}
          changeMaybe={changeMaybe}
          addRemoveUser={addRemoveUser}
          updateEventData={updateEventData}
        ></ViewEventGuests>
        <div className='view-event-btn-container'>
          <Button theme="black" className={"view-event-close-btn " + ((eventData.newEvent) ? 'hidden' : 'visible')} onClick={closeViewEvent}>Close</Button>
          <Button className={"view-event-delete-btn " + ((editingEvent) ? 'visible' : 'hidden')} onClick={deleteTheEvent}>Delete</Button>
          <Button className={"view-event-save-btn " + ((userChangedEvent) ? 'visible' : 'hidden')} onClick={saveChanges}>Save</Button>
        </div>
      </dialog>
    </div>
  )
}

export default ViewEvent