import React from 'react'
import { Input } from "../../components/input/input.style";
import DateInput from "../../components/date-input/date-input";
import { TextArea } from "../../components/textarea/textarea.style";
import "./view-event-details.css"
const ViewEventDetails = ({eventData, editingEvent, detailsActive}) => {
  return (
    <div style={{display:((detailsActive)?'block':'none')}}>
        <Input
          disabled={!editingEvent}
          className="view-event-title"
          type="text"
          defaultValue={eventData.name}
          onChange={(e) => console.log('do nothing')}
          placeholder="Event Title"
        />
        <div>
          <DateInput
            disabled={!editingEvent}
            className="view-event-date view-event-start"
            dateValue={eventData.startDate}
            placeholder="Event Start Date"
          />
          <span className='view-event-date-to'>to</span>
          <DateInput
            disabled={!editingEvent}
            className="view-event-date view-event-end"
            dateValue={eventData.endDate}
            placeholder="Event End Date"
          />
        </div>
        <br></br><br></br>
        <div className='view-event-date-container'>
          <div className="view-event-date-label">Drive Up:</div>
          <DateInput
          disabled={!editingEvent}
          className="view-event-date"
          dateValue={eventData.driveUpDate}
          placeholder="Drive Up Date"
        />
        </div>
        <div className='view-event-date-container'>
          <div className="view-event-date-label">Drive Home:</div>
          <DateInput
          disabled={!editingEvent}
          className="view-event-date"
          dateValue={eventData.driveHomeDate}
          placeholder="Drive Home Date"
        />
        </div>
        <br></br>
        <div className="view-event-location-container">
          <img alt='locationIcon' className='view-event-location-icon' src={'/assets/locationIcon.png'}></img>
          <Input
            disabled={!editingEvent}
            className="view-event-location"
            type="text"
            defaultValue={eventData.location}
            onChange={(e) => console.log('do nothing')}
            placeholder="Location Information"
          />
        </div>
        <TextArea
          disabled={!editingEvent}
          className="view-event-notes"
          type="text"
          defaultValue={eventData.notes}
          onChange={(e) => console.log('do nothing')}
          placeholder="Misc Notes"
          rows={3}
        />
    </div>
  )
}

export default ViewEventDetails