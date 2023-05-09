import React from 'react'
import { Input } from "../../components/input/input.style";
import "./view-event-guests.css"
import CheckBox from '../../components/checkbox/checkbox';
import * as Utils from '../../utils';

const ViewEventGuests = ({ eventData, editingEvent, detailsActive, user }) => {
  var calColors = Utils.StaticData.calendarColors;
  var calColorKeys = Object.keys(calColors);
  return (
    <div style={{ display: ((!detailsActive) ? 'block' : 'none') }}>
      <Input
        disabled={!editingEvent}
        className="view-event-add-guest"
        type="text"
        onChange={(e) => console.log('do nothing')}
        placeholder="Add a Guest"
      />
      <br></br><br></br>
      <span>Guest</span>
      <span className={"float-right pr-10"}>Maybe</span>
      <div className='view-event-guest-list'>
        {
          ((eventData.guests) ? eventData.guests : []).map(guest =>
            <div className='view-event-guest' key={JSON.stringify(guest)}>
              <div>
                <div className="view-event-guest-icon" style={{ backgroundColor: calColors[calColorKeys[calColorKeys.length * Math.random() << 0]] }}>
                  {guest.name.substring(0, 1)}
                </div>
                &nbsp;&nbsp;{guest.name}
              </div>
              <CheckBox
                disabled={!editingEvent && user.uid != guest.uId}
                className={"view-event-guest-maybe " + ((guest.eventOwner) ? 'invisible' : 'visible')}
                type="checkbox"
                checked={guest.maybe}
                onChange={(e) => console.log('do nothing')}
                title="Maybe coming"
              ></CheckBox>
              <img
                alt='removeUser'
                title='Remove Guest'
                className={'view-event-guest-remove ' + (((user.uid === guest.uId || editingEvent) && !guest.eventOwner) ? 'visible cursor-pointer' : 'invisible')}
                src={'/assets/removeIcon.png'}></img>
              <div className={'view-event-guest-owner ' + ((guest.eventOwner) ? 'visible' : 'invisible')}>(Event Owner)</div>
            </div>
          )}
      </div>
      <br></br>
      <span>Marching Orders</span>
      <br></br>
      <br></br>
      <CheckBox
        disabled={!editingEvent}
        type="checkbox"
        checked={eventData.canInvite}
        onChange={(e) => console.log('do nothing')}
        title="Invite other Guests"
        label="Invite Others"
      ></CheckBox>
      <CheckBox
        disabled={!editingEvent}
        type="checkbox"
        checked={eventData.guestsCanModify}
        onChange={(e) => console.log('do nothing')}
        title="Can Guests Modify this Event"
        label="Guests can modify this Event"
      ></CheckBox>
    </div>
  )
}

export default ViewEventGuests