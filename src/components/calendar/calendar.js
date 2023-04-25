import React from 'react'
import "./calendar.css";
const Calendar = ({currentDate}) => {
  const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const tempDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),1-currentDate.getDay());
  const datesOfWeek = [];
  for (let week=0; week<=6 ; week++) {
    let weekArray = [];
    for (let day=0; day<=6 ; day++) {
      weekArray.push([tempDate.getDate(),currentDate.getMonth()!==tempDate.getMonth()]);
      tempDate.setDate(tempDate.getDate()+1);
    }
    datesOfWeek.push(weekArray);
    if (tempDate.getDate()<8 && week>0) {
      break;//We are at the end of the month
    }
  }
  return (
    <div className="calendar">
      <div className="calendar-days-of-week">
        {daysOfWeek.map(item =>
          <div key={item}> {item} </div>
          )}
      </div>
      {datesOfWeek.map(week =>
        <div key={week} className="calendar-date-of-week">
          {week.map(day => 
            <div className={(day[1])?"calendar-date-of-week-notthismonth":""} key={day}> {day[0]} </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Calendar