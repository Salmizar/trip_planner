export const locations = [
    { location: 'Montreal River Harbour', lon: -84.649356, lat: 47.232487, isFirst: true },
    { location: 'Cochrane', lon: -81.278790, lat: 49.166792 },
    { location: 'Sudbury', lon: -81.0071182, lat: 46.5025031 },
    { location: 'Mattawa', lon: -78.965881, lat: 46.446380 },
    { location: 'Ottawa', lon: -75.6901106, lat: 45.4208777 },
    { location: 'Treeriding Adventure', lon: -71.656786, lat: 47.081166 },
    { location: 'Auberge 31km', lon: -70.589226, lat: 48.669603 },
    { location: 'Chic Chocs', lon: -66.038694, lat: 49.064366 }
];
export const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
export const weatherIconDescription = {
    '01': 'clear sky',
    '02': 'few clouds',
    '03': 'scattered clouds',
    '04': 'broken clouds',
    '09': 'shower rain',
    '10': 'rain',
    '11': 'thunderstorn',
    '13': 'snow',
    '50': 'mist'
};
export const convertMPStoKPH = (mps) => {
    return Math.round((mps * 60 * 60) / 1000);
}
export const getWindDirection = (deg) => {
    if (deg >= 11.25 && deg < 33.75)
        return "NNE";
    if (deg >= 33.75 && deg < 56.25)
        return "NE";
    if (deg >= 56.25 && deg < 78.75)
        return "ENE";
    if (deg >= 78.75 && deg < 101.25)
        return "E";
    if (deg >= 101.25 && deg < 123.75)
        return "ESE";
    if (deg >= 123.75 && deg < 146.25)
        return "SE";
    if (deg >= 146.25 && deg < 168.75)
        return "SSE";
    if (deg >= 168.75 && deg < 191.25)
        return "S";
    if (deg >= 191.25 && deg < 213.75)
        return "SSW";
    if (deg >= 213.75 && deg < 236.25)
        return "SW";
    if (deg >= 236.25 && deg < 258.75)
        return "WSW";
    if (deg >= 258.75 && deg < 281.25)
        return "W";
    if (deg >= 281.25 && deg < 303.75)
        return "WNW";
    if (deg >= 303.75 && deg < 326.25)
        return "NW";
    if (deg >= 326.25 && deg < 348.75) {
        return "NNW";
    } else {
        return "N"
    }
}