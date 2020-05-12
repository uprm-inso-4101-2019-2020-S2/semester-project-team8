import * as moment from 'moment'
import * as COLORS  from '../../../styles/colors'

export const getMarkedDates = (cycles, cycleInfos) => {

    const markedDates = {}


    cycles.map((cycle)=>{
            
        let sd = new Date(cycle.bleed_start)
        let ed = new Date(cycle.bleed_end)

        for(let i = new Date(sd); i <= new Date(ed); i.setDate(i.getDate() + 1)){
            // TODO: MAKE ROUUUUUUUUUND!!!
            if(i.getDate() === sd.getDate()){
                markedDates[moment.utc(i.toISOString()).format("YYYY-MM-DD")] = {
                    color:COLORS.PINK,
                    startingDay: true
                }
            }
            else if(i.getDate() === ed.getDate()){
                markedDates[moment.utc(i.toISOString()).format("YYYY-MM-DD")] = {
                    color:COLORS.PINK,
                    endingDay:true
                }
            }else{
                markedDates[moment.utc(i.toISOString()).format("YYYY-MM-DD")] = {
                    color:COLORS.PINK,
                }
            }
            
        }
        
    })

    cycleInfos.map((info)=>{
        const sd = new Date(info.fertile_start)
        const ed = new Date(info.fertile_end)

        for(let i = new Date(sd); i <= new Date(ed); i.setDate(i.getDate() + 1)){
            // TODO: MAKE ROUUUUUUUUUND!!!
            if(i.getDate() === sd.getDate()){
                markedDates[moment.utc(i.toISOString()).format("YYYY-MM-DD")] = {
                    color:COLORS.YELLOW,
                    startingDay: true
                }
            }
            else if(i.getDate() === ed.getDate()){
                markedDates[moment.utc(i.toISOString()).format("YYYY-MM-DD")] = {
                    color:COLORS.YELLOW,
                    endingDay:true
                }
            }else{
                markedDates[moment.utc(i.toISOString()).format("YYYY-MM-DD")] = {
                    color:COLORS.YELLOW,
                }
            }
            
        }
        markedDates[moment.utc(info.ovulation_date.toISOString()).format("YYYY-MM-DD")] = {
            ...markedDates[moment.utc(info.ovulation_date.toISOString()).format("YYYY-MM-DD")],
            color:COLORS.ORANGE,
        }
    })

    return markedDates

}