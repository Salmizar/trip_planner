export const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getDateWeek = function (dte, dowOffset) {
    /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */
        dowOffset = typeof(dowOffset) == 'number' ? dowOffset : 0; //default dowOffset to zero
        var newYear = new Date(dte.getFullYear(),0,1);
        var day = newYear.getDay() - dowOffset; //the day of week the year begins on
        day = (day >= 0 ? day : day + 7);
        var daynum = Math.floor((dte.getTime() - newYear.getTime() - 
        (dte.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
        var weeknum;
        //if the year starts before the middle of a week
        if(day < 4) {
            weeknum = Math.floor((daynum+day-1)/7) + 1;
            if(weeknum > 52) {
                var nYear = new Date(this.getFullYear() + 1,0,1);
                var nday = nYear.getDay() - dowOffset;
                nday = nday >= 0 ? nday : nday + 7;
                /*if the next year starts before the middle of
                  the week, it is week #1 of that year*/
                weeknum = nday < 4 ? 1 : 53;
            }
        }
        else {
            weeknum = Math.floor((daynum+day-1)/7);
        }
        return weeknum;
    };
export const datesOfTheWeek = function (currentDate) {
    const tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - currentDate.getDay());
    const todaysDate = new Date();
    const datesOfWeek = {};
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
        datesOfWeek[weekOfYear] = weekArray;
        if (tempDate.getDate() < 8 && weekCounter > 0) {
            break;//We are at the end of the month
        }
    }
    return datesOfWeek;
}