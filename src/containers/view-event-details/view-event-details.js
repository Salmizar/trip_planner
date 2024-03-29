import React, { useEffect } from 'react'
import { Input } from "../../components/input/input.style";
import DateInput from "../../components/date-input/date-input";
import { TextArea } from "../../components/textarea/textarea.style";
import "./view-event-details.css"
const ViewEventDetails = ({eventData, editingEvent, detailsTabActive, updateEventData}) => {
  useEffect(() => {
    document.getElementsByClassName('view-event-title')[0].focus();
  },[editingEvent]);
  return (
    <div className={'view-event-details '+((detailsTabActive)?'block':'hidden')}>
        <Input
          disabled={!editingEvent}
          className="view-event-title"
          theme={((!editingEvent)?'disabled':((eventData && eventData.name && eventData.name.length>0)?'enabled':'error'))}
          error={true}
          type="text"
          value={eventData.name || ''}
          onChange={(e) => updateEventData('name', e.target.value)}
          placeholder="Event Title"
        />
        <div className='view-event-date-container'>
          <div className="view-event-date-label">Drive Up:</div>
          <DateInput
            disabled={!editingEvent}
            error={eventData.driveUpDate > eventData.driveHomeDate || eventData.startDate < eventData.driveUpDate || eventData.startDate > eventData.driveHomeDate}
            className="view-event-date"
            dateValue={eventData.driveUpDate}
            onChange={(newValue) => updateEventData('driveUpDate', newValue.toISOString())}
            title="Drive Update Date"
            placeholder="Drive Up Date"
          />
        </div>
        <div className='view-event-date-container'>
          <div className="view-event-date-label">Start Ride:</div>
          <DateInput
            disabled={!editingEvent}
            error={eventData.startDate > eventData.endDate || eventData.startDate < eventData.driveUpDate || eventData.startDate > eventData.driveHomeDate}
            className="view-event-date view-event-start"
            dateValue={eventData.startDate}
            onChange={(newValue) => updateEventData('startDate', newValue.toISOString())}
            title="Event Start Date"
            placeholder="Start Date"
          />
        </div>
        <div className='view-event-date-container'>
          <div className="view-event-date-label">End Ride:</div>
          <DateInput
            disabled={!editingEvent}
            containerXOffset={-80}
            error={eventData.startDate > eventData.endDate || eventData.endDate > eventData.driveHomeDate || eventData.endDate < eventData.driveUpDate}
            className="view-event-date view-event-end"
            dateValue={eventData.endDate}
            onChange={(newValue) => updateEventData('endDate', newValue.toISOString())}
            title="Event End Date"
            placeholder="End Date"
          />
        </div>
        <div className='view-event-date-container'>
          <div className="view-event-date-label">Drive Home:</div>
          <DateInput
            disabled={!editingEvent}
            error={eventData.driveUpDate > eventData.driveHomeDate || eventData.endDate > eventData.driveHomeDate || eventData.endDate < eventData.driveUpDate}
            className="view-event-date"
            dateValue={eventData.driveHomeDate}
            onChange={(newValue) => updateEventData('driveHomeDate', newValue.toISOString())}
            title="Drive Home Date"
            placeholder="Drive Home Date"
          />
        </div>
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