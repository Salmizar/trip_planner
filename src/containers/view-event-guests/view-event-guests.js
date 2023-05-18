import React, { createRef, useState } from 'react'
import { Input } from "../../components/input/input.style";
import "./view-event-guests.css"
import CheckBox from '../../components/checkbox/checkbox';
import * as Utils from '../../utils';
import { Button } from "../../components/button/button.style";
const ViewEventGuests = ({ eventData, editingEvent, detailsActive, user, isMember, changeMaybe, addRemoveUser, updateEventData }) => {
  var calColors = Utils.StaticData.calendarColors;
  const searchUserField = createRef();
  const [guestListSearchResults, setGuestListSearchResults] = useState([]);
  var calColorKeys = Object.keys(calColors);
  const searchUsers = (e) => {
    let searchValue = e.target.value.toLowerCase();
    let obj = [];
    if (searchValue!=='') {
      obj = Utils.StaticData.userList.filter(u => u.email.toLowerCase().indexOf(searchValue)>-1 || u.displayName.toLowerCase().indexOf(searchValue)>-1);
    }
    setGuestListSearchResults(obj);
  }
  const AddGuest = (guest) => {
    addRemoveUser(true, guest.uId, guest.displayName);
    searchUserField.current.value = '';
    searchUserField.current.focus();
    setGuestListSearchResults([]);
  }
  return (
    <div className={'view-event-guests '+((!detailsActive) ? 'block' : 'hidden')}>
      <Input
        disabled={!editingEvent}
        ref={searchUserField}
        className={"view-event-add-guest" + ((isMember) ? ' view-event-add-guest-full' : '')}
        type="text"
        onChange={searchUsers}
        placeholder="Add a Guest"
      />
      <Button className={"view-event-add-myself-btn" + ((isMember) ? ' hidden' : '')} onClick={(e) => addRemoveUser(true, user.uid, user.displayName)}>Add Myself</Button>
      <div className={'view_event-add-guest-results ' +((guestListSearchResults.length>0)?'visible':'invisible')}>
        {(guestListSearchResults).map(searchResult =>
          <div key={JSON.stringify(searchResult)} className='view_event-add-guest-result' onClick={() => {AddGuest(searchResult); }}>
            <div className="view-event-guest-icon" style={{ backgroundColor: calColors[calColorKeys[calColorKeys.length * Math.random() << 0]] }}>
                  {searchResult.displayName.substring(0, 1)}
            </div>&nbsp;&nbsp;
            {searchResult.displayName}&nbsp;&nbsp;
            <b>{(eventData.guests.find((guest) => guest.uId === searchResult.uId)!==undefined)?'- Already a Guest':''}</b>
          </div>
        )}
      </div>
      <br></br><br></br>
      <span>Guest</span>
      <span className={"float-right pr-10"}>Maybe</span>
      <div className='view-event-guest-list'>
        {eventData && eventData.guests && user &&
          (eventData.guests).map(guest =>
            <div className='view-event-guest' key={JSON.stringify(guest)}>
              <div className='view-event-guest-name'>
                <div className="view-event-guest-icon" style={{ backgroundColor: calColors[calColorKeys[calColorKeys.length * Math.random() << 0]] }}>
                  {guest.name.substring(0, 1)}
                </div>
                &nbsp;&nbsp;{guest.name}
              </div>
              <img
                alt='removeUser'
                title='Remove Guest'
                className={'view-event-guest-remove ' + ((user && (user.uid === guest.uId || editingEvent) && !guest.eventOwner) ? 'block cursor-pointer' : 'hidden')}
                src={'/assets/removeIcon.png'}
                onClick={(e) => addRemoveUser(false, guest.uId)}></img>
              <CheckBox
                disabled={!editingEvent && user.uid !== guest.uId}
                className={"view-event-guest-maybe " + ((guest.eventOwner) ? 'hidden' : 'block')}
                type="checkbox"
                checked={guest.maybe}
                onChange={(e) => changeMaybe(guest.uId, e.target.checked)}
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
        title="Invite other Guests"
        label="Invite Others"
      ></CheckBox>
      <CheckBox
        disabled={!editingEvent}
        type="checkbox"
        checked={eventData.guestsCanModify}
        onChange={(e) => updateEventData('guestsCanModify', e.target.checked)}
        title="Can Guests Modify this Event"
        label="Guests can modify this Event"
      ></CheckBox>
    </div>
  )
}

export default ViewEventGuests