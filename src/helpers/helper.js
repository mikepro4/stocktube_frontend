import ReactGA from 'react-ga';

export function getObjectFromUrl(url) {
    if(!url) url = location.search;
    let result = null;
    if (url && url.length) {
        result = {};
        let query = url.substr(1);
        query.split("&").forEach(function(part) {
            let item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
    }
    return result;
}

export function getMessageDateOrTime(date) {
    if (date !== null) {
        const dateObj = new Date(date);
        const dateDetails = {
            date: dateObj.getDate(),
            month: dateObj.getMonth() + 1,
            year: dateObj.getFullYear(),
            hour: dateObj.getHours(),
            minutes: dateObj.getMinutes()
        }
        const currentDateObj = new Date();
        const currentDateDetails = {
            date: currentDateObj.getDate(),
            month: currentDateObj.getMonth() + 1,
            year: currentDateObj.getFullYear(),
            hour: currentDateObj.getHours(),
            minutes: currentDateObj.getMinutes()
        }
        if (dateDetails.year !== currentDateDetails.year && dateDetails.month !== currentDateDetails.month && dateDetails.date !== currentDateDetails.date) {
            return dateDetails.date + '-' + dateDetails.month + '-' + dateDetails.year;
        } else {
            return dateDetails.hour + ':' + dateDetails.minutes + ` ${dateDetails.hour < 12 ? 'AM' : 'PM'}`
        }

    }
    return '';
}

// export const analyticEvent = (category, action) => {
//     return ReactGA.event({ category, action });
// } 