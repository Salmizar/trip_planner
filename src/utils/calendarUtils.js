export const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const calendarColors = {
    //Credit https://proactivecreative.com/pastel-color-palette/
    Lavender: "#957DAD",
    Thistle_Pink: "#E0BBe4",
    Candy_Pink: "#FEC8D8",
    Misty_Rose: "#FFDFD3",
    Pastel_Pink: "#FFC4C4",
    Periwinkle: "#CBC7DD",
    Pale_Orange: "#FFDFBD",
    Palest_Yellow: "#F8FFEB",
    Pale_Sea_Blue: "#BAEEE5",
    Lilac: "#DFC5E8",
    Soft_Yellow1: "#FFFAB0",
    Tea_Green: "#CBF2B8",
    Baby_Blue: "#D6D8F2",
    Baby_Pink: "#F4CFDF",
    Soft_Yellow2: "#FAF4B7",
    Light_Brandy: "#E7CBA9",
    Soft_Sage: "#CCD4BF",
    Ecru: "#F5F3E7",
    Pastel_Peach: "#EEBAB2",
    Warm_Sand: "#E9DAC1",
    Light_Turquoise: "#CDFCF6",
    Sea_Green: "#54BAB90",
    Linen: "#F7ECDE",
    Muted_Blue: "#7882A4",
    Warm_Brown: "#C0A080",
    Light_Gray: "#EFEFEF",
    Medium_Gray: "#D1D1D1",
    Deep_Aubergine: "#645CAA",
    Medium_Purple: "#A084CA",
    Lavender2: "#BFACE0",
    Pale_Purple_Pink: "#EBC7E8",
    Warm_Sun: "#D37F40",
    Sea_Blue: "#94C0D0",
    Pale_Coral: "#ECCBC0",
    Soft_Orange: "#FAC590",
    Warm_Pink: "#EF7C8E",
    Rose_Pink: "#D8A7B1",
    Cream: "#FAE8EO",
    Mint_Green: "#B6E2D3",
    Pale_Sea_Blue2: "#D6EFED",
    Sky_Blue: "#B7D3DF",
    Medium_Lilac: "#C9BBCF",
    Muted_Purple: "#898AA6",
    Warm_Berry: "#85586F",
    Soft_Raspberry: "#AC7D88",
    Pale_Orange2: "#DEB6AB",
    Soft_Yellow3: "#F8ECD1",
    Slate_Blue: "#698396",
    Medium_Green2: "#A9C8C0",
    Warm_Yellow: "#DBBC8E",
    Rich_Blush_Pink: "#AE8A8C",
    Sunny_Yellow: "#F5F0BB",
    Spring_Green: "#C4DFAA",
    Medium_Green: "#90C8AC",
    Dark_Turquoise: "#73A9AD"
}
export const maxSlots = 10;
const oneDay = 86400000;
export const getDateWeek = (date) => {
    var week1 = new Date(date.getFullYear(), 0, 1);
    week1.setDate(1 - week1.getDay());
    week1.setTime(week1.getTime() + ((date.getTimezoneOffset() * 60 * 1000) - (week1.getTimezoneOffset() * 60 * 1000)));
    return 1 + Math.floor(((date.getTime() - week1.getTime()) / oneDay) / 7);
};
export const formatCalendarData = (currentDate, calendarEvents) => {
    var datesOfTheMonth = getDatesOfTheMonth(currentDate);
    var monthConfines = getMonthVisualStartStop(currentDate);
    for (var key in calendarEvents) {
        let event = calendarEvents[key];
        event.eId = key;
        let eventStart = new Date(event.driveUpDate);
        let eventEnd = new Date(event.driveHomeDate);
        let eventLength = 1 + ((eventEnd.getTime() - eventStart.getTime()) / oneDay);
        let eventWeek = eventStart.getFullYear() + '-' + getDateWeek(eventStart);
        if (!datesOfTheMonth[eventWeek]) {
            if (monthConfines.endDate < eventStart || monthConfines.startDate > eventEnd) {
                continue;//Event doesn't start or within the current month
            } else {
                eventStart = monthConfines.startDate;
                eventWeek = eventStart.getFullYear() + '-' + getDateWeek(eventStart);
            }
        }
        let calendarDayEvents = datesOfTheMonth[eventWeek][getDayMonthYear(eventStart)].dayEvents;
        let eventIndex = Object.entries(calendarDayEvents).length;
        var eventSlotOffset = 0;
        for (var eventLengthIndex = 0; eventLengthIndex < eventLength; eventLengthIndex++) {
            let offsetEventStart = new Date(event.driveUpDate);
            offsetEventStart.setDate(offsetEventStart.getDate() + eventLengthIndex);
            let eWeek = offsetEventStart.getFullYear() + '-' + getDateWeek(offsetEventStart);
            if (datesOfTheMonth[eWeek]) {
                if (offsetEventStart.getDay() === 0) {
                    //new Week, see if we can move the event to lower slots
                    eventSlotOffset = eventIndex - Object.entries(datesOfTheMonth[eWeek][getDayMonthYear(offsetEventStart)].dayEvents).length;
                }
                datesOfTheMonth[eWeek][getDayMonthYear(offsetEventStart)].dayEvents['e' + (eventIndex - eventSlotOffset)] = {
                    name: event.name,
                    eventSlot: (eventIndex - eventSlotOffset),
                    event: event,
                    eventLength: eventLength - eventLengthIndex,
                    eventStartOfNextWeek: (offsetEventStart.getDay() === 0),
                    eventStartingToday: (eventLengthIndex === 0),
                    color: event.color
                }
                datesOfTheMonth[eWeek][getDayMonthYear(offsetEventStart)].dayEvents = sortObj(datesOfTheMonth[eWeek][getDayMonthYear(offsetEventStart)].dayEvents);
            }
        }
    }
    return datesOfTheMonth;
}
const getDayMonthYear = (dte) => {
    return Intl.DateTimeFormat('en-US').format(dte).replace(/\//g, "-");
}
const sortObj = (unsorted) => {
    return Object.keys(unsorted).sort().reduce(function (sorted, key) {
        sorted[key] = unsorted[key];
        return sorted;
    }, {});
}
export const getDatesOfTheMonth = (currentDate) => {
    const todaysDate = new Date();
    const datesOfTheMonth = {};
    const tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - currentDate.getDay());
    for (let weekCounter = 0; weekCounter <= 6; weekCounter++) {
        let weekArray = {};
        let weekOfYear = (tempDate.getFullYear() < currentDate.getFullYear()) ? 1 : getDateWeek(tempDate);
        let something = getDateWeek(tempDate);
        let something2 = tempDate;
        for (let dayCounter = 0; dayCounter <= 6; dayCounter++) {
            weekArray[getDayMonthYear(tempDate)] = {
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
export const newEventObject = (newEventDate) => {
    let calColors = calendarColors;
    let calColorKeys = Object.keys(calColors);
    let eId = "NewEvent";
    return {
        name: 'New Trip',
        eId: eId,
        ownerId: 0,
        startDate: newEventDate.toISOString(),
        endDate: newEventDate.toISOString(),
        driveUpDate: newEventDate.toISOString(),
        driveHomeDate: newEventDate.toISOString(),
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
