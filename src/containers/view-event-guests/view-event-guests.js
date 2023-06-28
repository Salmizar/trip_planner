import React, { createRef, useEffect, useState } from 'react'
import { Input } from "../../components/input/input.style";
import "./view-event-guests.css"
import CheckBox from '../../components/checkbox/checkbox';
import * as Utils from '../../utils';
import { Button } from "../../components/button/button.style";
import { db } from "../../data/login-firebase"
import { collection, getDocs } from "firebase/firestore";
const ViewEventGuests = ({ eventData, editingEvent, detailsTabActive, user, isMember, changeMaybe, addRemoveUser, updateEventData }) => {
  const [usersList, setUsersList] = useState([]);
  const searchUserField = createRef();
  const [guestListSearchResults, setGuestListSearchResults] = useState([]);
  const calColors = Utils.CalendarUtils.calendarColors;
  const calColorKeys = Object.keys(calColors);
  const getUserList = async () => {
    let usersList = [];
    let users = await getDocs(collection(db, "users"));
    users.forEach((doc) => {
      usersList.push(doc.data());
    });
    setUsersList(usersList);
  }
  useEffect(() => {
    getUserList();
  }, []);
  const searchUsers = (e) => {
    let searchValue = e.target.value.toLowerCase();
    let obj = [];
    if (searchValue !== '') {
      obj = usersList.filter(u => u.email.toLowerCase().indexOf(searchValue) > -1 || u.name.toLowerCase().indexOf(searchValue) > -1);
    }
    setGuestListSearchResults(obj);
  }
  const AddGuest = (e) => {
    addRemoveUser(true, e.currentTarget.getAttribute("data-uid"), e.currentTarget.getAttribute("data-name"));
    searchUserField.current.value = '';
    searchUserField.current.focus();
    setGuestListSearchResults([]);
  }
  const AddUser = (e) => {
    addRemoveUser(true, user.uid, user.displayName);
  }
  const RemoveUser = (e) => {
    addRemoveUser(false, e.currentTarget.getAttribute("data-uid"));
  }
  const UpdateMaybe = (e) => {
    changeMaybe(e.currentTarget.getAttribute("data-set1"), e.target.checked);
  }
  return (
    <div className={'view-event-guests ' + ((!detailsTabActive) ? 'block' : 'hidden')}>
      <Input
        disabled={!editingEvent && !eventData.canInvite}
        ref={searchUserField}
        className={"view-event-add-guest" + ((isMember || !eventData.canInvite) ? ' view-event-add-guest-full' : '')}
        type="text"
        onChange={searchUsers}
        placeholder="Add a Guest"
      />
      <Button
        className={"view-event-add-myself-btn" + ((isMember || !eventData.canInvite) ? ' hidden' : '')}
        onClick={ AddUser }>Add Myself</Button>
      <div className={'view_event-add-guest-results ' + ((guestListSearchResults.length > 0) ? 'visible' : 'invisible')}>
        {(guestListSearchResults).map(searchResult =>
          <div key={searchResult.uid} data-uid={searchResult.uid} data-name={searchResult.name} className='view_event-add-guest-result' onClick={ AddGuest }>
            <div className="view-event-guest-icon" style={{ backgroundColor: searchResult.color }}>
              {searchResult.name.substring(0, 1)}
            </div>&nbsp;&nbsp;
            {searchResult.name}&nbsp;&nbsp;
            <b>{(eventData.guests.find((guest) => guest.uId === searchResult.uid) !== undefined) ? '- Already a Guest' : ''}</b>
          </div>
        )}
      </div>
      <br></br><br></br>
      <span>Guest</span>
      <span className={"float-right pr-10"}>Maybe</span>
      <div className='view-event-guest-list'>
        {eventData && eventData.guests && user &&
          (eventData.guests).map(guest =>
            <div className='view-event-guest' key={guest.uId}>
              <div className='view-event-guest-name'>
                <div className="view-event-guest-icon" style={{ backgroundColor: calColors[calColorKeys[calColorKeys.length * Math.random() << 0]] }}>
                  {guest.name.substring(0, 1)}
                </div>
                &nbsp;&nbsp;{guest.name}
              </div>
              <img
                alt='removeUser'
                title='Remove Guest'
                className={'view-event-guest-remove ' + ((user && (user.uid === guest.uId || editingEvent) && !guest.eventOwner) ? 'block cursor-pointer' : 'invisible')}
                src={'/assets/removeIcon.png'}
                data-uid={guest.uId}
                onClick={ RemoveUser }></img>
              <CheckBox
                disabled={!editingEvent && user.uid !== guest.uId}
                className={"view-event-guest-maybe " + ((guest.eventOwner) ? 'hidden' : 'block')}
                type="checkbox"
                checked={guest.maybe}
                dataset1={guest.uId} 
                onChange={ UpdateMaybe }
                title="Maybe coming"
              ></CheckBox>
              <div className={'view-event-guest-owner ' + ((guest.eventOwner) ? 'visible' : 'invisible')}>(Event Owner)</div>
            </div>
          )
        }
      </div>
      <br></br>
      <span>Marching Orders</span>
      <br></br>
      <br></br>
      <CheckBox
        disabled={!editingEvent}
        type="checkbox"
        checked={eventData.canInvite}
        onChange={(e) => updateEventData('canInvite', e.target.checked)}
        title="Invite other guests"
        label="Guests can invite others"
      ></CheckBox>
      <CheckBox
        disabled={!editingEvent}
        type="checkbox"
        checked={eventData.guestsCanModify}
        onChange={(e) => updateEventData('guestsCanModify', e.target.checked)}
        title="Can guests modify this trips details"
        label="Guests can modify trip details"
      ></CheckBox>
    </div>
  )
}

export default ViewEventGuests