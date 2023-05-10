import React from 'react'
import { Input } from "../../components/input/input.style";
import DateInput from "../../components/date-input/date-input";
import { TextArea } from "../../components/textarea/textarea.style";
import "./view-event-details.css"
const ViewEventDetails = ({eventData, editingEvent, detailsActive, updateEventData}) => {
  return (
    <div className={((detailsActive)?'block':'hidden')}>
        <Input
          disabled={!editingEvent}
          className="view-event-title"
          type="text"
          value={eventData.name || ''}
          onChange={(e) => updateEventData('name', e.target.value)}
          placeholder="Event Title"
        />
        <div>
          <DateInput
            disabled={!editingEvent}
            className="view-event-date view-event-start"
            dateValue={eventData.startDate}
            title="Event Start Date"
            placeholder="Start Date"
          />
          <span className='view-event-date-to'>to</span>
          <DateInput
            disabled={!editingEvent}
            className="view-event-date view-event-end"
            dateValue={eventData.endDate}
            title="Event End Date"
            placeholder="End Date"
          />
        </div>
        <br></br><br></br>
        <div className='view-event-date-container'>
          <div className="view-event-date-label">Drive Up:</div>
          <DateInput
          disabled={!editingEvent}
          className="view-event-date"
          dateValue={eventData.driveUpDate}
          title="Drive Update Date"
          placeholder="Drive Up Date"
        />
        </div>
        <div className='view-event-date-container'>
          <div className="view-event-date-label">Drive Home:</div>
          <DateInput
          disabled={!editingEvent}
          className="view-event-date"
          dateValue={eventData.driveHomeDate}
          title="Drive Home Date"
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
            value={eventData.location || ''}
            onChange={(e) => updateEventData('location', e.target.value)}
            placeholder="Location Information"
          />
        </div>
        <TextArea
          disabled={!editingEvent}
          className="view-event-notes"
          type="text"
          value={eventData.notes || ''}
          onChange={(e) => updateEventData('notes', e.target.value)}
          placeholder="Misc Notes"
          rows={3}
        />
    </div>
  )
}

export default ViewEventDetails