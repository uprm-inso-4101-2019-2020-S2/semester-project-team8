import moment from 'moment'


export const addDays = (days:number, date:Date) => {
    const newDate = new Date(date.valueOf())  
    date.setDate(newDate.getDate() + days);
    return date;
}

export const getDate = (date) => {
    
    const mom = moment(date)

    const dd = String(date.getDate()).padStart(2, '0');
    //const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const mm = date.toLocaleString('default', {month:"short"} )
    // const yyyy = date.getFullYear();
    return mm + ' ' + dd;

}