import moment from 'moment'


export const addDays = (days:number, date:Date) => {
    const newDate = new Date(date.valueOf())  
    date.setDate(newDate.getDate() + days);
    return date;
}

export const getAcronDateShort = (date) => {
    return moment.utc(date.toISOString()).format("MMM D")
}

export const getDate = (date) => {
    return moment.utc(date.toISOString()).format("MMM D, YYYY")
}