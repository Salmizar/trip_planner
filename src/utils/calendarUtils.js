import { StaticData } from '.';

export const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const maxSlots = 10;
export const getDateWeek = function (dte, dowOffset) {
    /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */
    dowOffset = typeof (dowOffset) == 'number' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(dte.getFullYear(), 0, 1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((dte.getTime() - newYear.getTime() -
        (dte.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if (day < 4) {
        weeknum = Math.floor((daynum + day - 1) / 7) + 1;
        if (weeknum > 52) {
            var nYear = new Date(dte.getFullYear() + 1, 0, 1);
            var nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
              the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum + day - 1) / 7);
    }
    return weeknum;
};
export const getCalendarData = function (currentDate, calendarData) {
    var datesOfTheMonth = getDatesOfTheMonth(currentDate);
    var monthConfines = getMonthVisualStartStop(currentDate);
    for (var key in calendarData) {
        let event = calendarData[key];
        let eventStart = new Date(event.driveUpDate);
        let eventEnd = new Date(event.driveHomeDate);
        let eventLength = 1 + ((eventEnd.getTime() - eventStart.getTime()) / 86400000);
        let eventWeek = eventStart.getFullYear() + '-' + getDateWeek(eventStart);
        if (!datesOfTheMonth[eventWeek]) {
            if (monthConfines.endDate < eventStart || monthConfines.startDate > eventEnd) {
                continue;//Event doesn't start or within the current month
            } else {
                eventStart = monthConfines.startDate;
                eventWeek = eventStart.getFullYear() + '-' + getDateWeek(eventStart);
            }
        }

        let calendarDayEvents = datesOfTheMonth[eventWeek][eventStart.getTime()].dayEvents;
        let eventIndex = findBlankEventSlot(calendarDayEvents);
        var eventSlotOffset = 0;
        for (var eventLengthIndex = 0; eventLengthIndex < eventLength; eventLengthIndex++) {
            let offsetEventStart = new Date(event.driveUpDate);
            offsetEventStart.setDate(offsetEventStart.getDate() + eventLengthIndex);
            let eWeek = offsetEventStart.getFullYear() + '-' + getDateWeek(offsetEventStart);
            if (datesOfTheMonth[eWeek]) {
                if (offsetEventStart.getDay() === 0) {
                    //new Week, see if we can move the event to lower slots
                    eventSlotOffset = eventIndex - findBlankEventSlot(datesOfTheMonth[eWeek][offsetEventStart.getTime()].dayEvents);
                }
                datesOfTheMonth[eWeek][offsetEventStart.getTime()].dayEvents['e' + (eventIndex - eventSlotOffset)] = {
                    name: event.name,
                    eventSlot: (eventIndex - eventSlotOffset),
                    event: event,
                    eventLength: eventLength - eventLengthIndex,
                    eventStartOfNextWeek: (offsetEventStart.getDay() === 0),
                    eventStartingToday: (eventLengthIndex === 0),
                    color: event.color
                }
                datesOfTheMonth[eWeek][offsetEventStart.getTime()].dayEvents = sortObj(datesOfTheMonth[eWeek][offsetEventStart.getTime()].dayEvents);
            }
        }
    }
    return datesOfTheMonth;
}
const findBlankEventSlot = function(calendarDayEvents) {
    for (var findBlankSpot = 1; findBlankSpot <= maxSlots; findBlankSpot++) {
        if (calendarDayEvents['e'+findBlankSpot] === undefined) {
            return findBlankSpot;
        }
    }
}
const sortObj = function (unsorted) {
    return Object.keys(unsorted).sort().reduce(function (sorted, key) {
        sorted[key] = unsorted[key];
        return sorted;
    }, {});
}
export const getDatesOfTheMonth = function (currentDate) {
    const todaysDate = new Date();
    const datesOfTheMonth = {};
    const tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - currentDate.getDay());
    
    for (let weekCounter = 0; weekCounter <= 6; weekCounter++) {
        let weekArray = {};
        let weekOfYear = getDateWeek(tempDate);

        for (let dayCounter = 0; dayCounter <= 6; dayCounter++) {
            weekArray[tempDate.getTime()] = {
                dayEvents: {
                },
                dayOfMonth: tempDate.getDate(),
                year: tempDate.getFullYear(),
                month: tempDate.getMonth(),
                isThisMonth: currentDate.getMonth() === tempDate.getMonth(),
                isThisToday: todaysDate.getDate() === tempDate.getDate() && todaysDate.getMonth() === tempDate.getMonth() && todaysDate.getFullYear() === tempDate.getFullYear()
            };
            tempDate.setDate(tempDate.getDate() + 1);
        }
        datesOfTheMonth[tempDate.getFullYear() + '-' + weekOfYear] = weekArray;
        if (tempDate.getDate() < 8 && weekCounter > 0) {
            break;//We are at the end of the month
        }
    }
    return datesOfTheMonth;
}
export const newEventObject = function (newEventDate) {
    let calColors = StaticData.calendarColors;
    let calColorKeys = Object.keys(calColors);
    let eId = StaticData.calendarData.length + 1;
    return {
        name: 'New Trip',
        eId: eId,
        startDate: newEventDate.getTime(),
        endDate: newEventDate.getTime(),
        driveUpDate: newEventDate.getTime(),
        driveHomeDate: newEventDate.getTime(),
        color: calColors[calColorKeys[calColorKeys.length * Math.random() << 0]],
        location: '',
        notes: '',
        newEvent: true,
        canInvite: false,
        guestsCanModify: false,
        guests: [
            {
                uId: 0,
                name: '',
                eventOwner: true
            }
        ]
    }
}
const getMonthVisualStartStop = (currentDate) => {
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - currentDate.getDay());
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    return { startDate, endDate };
  };
