export const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
        var eventIndex = getEmptyEventSlot(calendarDayEvents);
        if (eventIndex > 0) {
            //Found an open slot
            var eventSlotOffset = 0;
            for (var eventLengthIndex = 0; eventLengthIndex < eventLength; eventLengthIndex++) {
                let offsetEventStart = new Date(event.driveUpDate);
                offsetEventStart.setDate(offsetEventStart.getDate() + eventLengthIndex);
                let eWeek = offsetEventStart.getFullYear() + '-' + getDateWeek(offsetEventStart);
                if (datesOfTheMonth[eWeek]) {
                    if (offsetEventStart.getDay() === 0 && eventIndex > 0) {
                        //new Week, see if we can move the event to lower slots
                        var eventSlotOffset = eventIndex - getEmptyEventSlot(datesOfTheMonth[eWeek][offsetEventStart.getTime()].dayEvents);
                    }
                    datesOfTheMonth[eWeek][offsetEventStart.getTime()].dayEvents['e' + (eventIndex - eventSlotOffset)] = {
                        name: event.name,
                        event: event,
                        eventLength: eventLength - eventLengthIndex,
                        eventStartOfNextWeek: (offsetEventStart.getDay() === 0),
                        eventStartingToday: (eventLengthIndex === 0),
                        color: event.color
                    }
                }
            }
        } else if (eventIndex === 4) {
            //no more slots available, so toss it in overflow
            calendarDayEvents['overflow']['e' + Object.keys(calendarDayEvents['overflow']).length] = {
                name: event.name,
                event: event,
                eventLength: eventLength,
                eventStartOfNextWeek: (eventStart.getDay() === 0),
                eventStartingToday: (eventLengthIndex === 0),
                color: event.color
            }
        }
    }
    return datesOfTheMonth;
}
const getEmptyEventSlot = function (calendarDayEvents) {
    for (let eventIndex = 1; eventIndex <= 4; eventIndex++) {
        if (Object.keys(calendarDayEvents['e' + eventIndex]).length === 0) {
            return eventIndex;
        } else if (eventIndex === 4) {
            return 4;
        }
    }
    return 0;
}
export const getDatesOfTheMonth = function (currentDate) {
    const tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - currentDate.getDay());
    const todaysDate = new Date();
    const datesOfTheMonth = {};
    for (let weekCounter = 0; weekCounter <= 6; weekCounter++) {
        let weekArray = {};
        var weekOfYear = getDateWeek(tempDate);
        for (let dayCounter = 0; dayCounter <= 6; dayCounter++) {
            weekArray[tempDate.getTime()] = {
                dayEvents: {
                    'e1': {},
                    'e2': {},
                    'e3': {},
                    'e4': {},
                    'overflow': {}
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
const getMonthVisualStartStop = function (currentDate) {
    const tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - currentDate.getDay());
    const visualDates = {};
    visualDates.startDate = new Date(tempDate.getTime());
    for (let weekCounter = 0; weekCounter <= 6; weekCounter++) {
        for (let dayCounter = 0; dayCounter <= 6; dayCounter++) {
            tempDate.setDate(tempDate.getDate() + 1);
        }
        if (tempDate.getDate() < 8 && weekCounter > 0) {
            tempDate.setDate(tempDate.getDate() - 1);
            break;//We are at the end of the month
        }
    }
    visualDates.endDate = tempDate;
    return visualDates;
}