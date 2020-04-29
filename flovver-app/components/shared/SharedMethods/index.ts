import moment from 'moment'


export const addDays = (days:number, date:Date) => {
    const newDate = new Date(date.valueOf())  
    date.setDate(newDate.getDate() + days);
    return date;
}

export const diffDays = (date1:Date, date2:Date) => {
    let a = moment.utc(date2.toISOString())
    let b = moment.utc(date1.toISOString())

    return b.diff(a, 'days')
}

export const getAcronDateShort = (date) => {
    return moment.utc(date.toISOString()).format("MMM DD")
}

export const getDate = (date) => {
    console.log(date.toISOString())
    return moment.utc(date.toISOString().split("T")[0]).format("MMM D, YYYY")
}