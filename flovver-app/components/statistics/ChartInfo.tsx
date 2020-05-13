import React, { useState, useContext, useEffect } from 'react'
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit'
import moment from 'moment'

import * as COLORS from '../../styles/colors'
import { useMenstrualData } from '../shared/Hooks';

const ChartInfo = ({forPeriod}) => {

    const [cycleArray] = useMenstrualData()

    const [cycleData, setCycleData] = useState({
        labels:[],
        datasets:[
            {
                data:[]
            }
        ]
    })

    useEffect(() => {
        
        const d_data = {
            labels:[],
            datasets:[
                {
                    data:[]
                }
            ]
        }

        if(forPeriod){
            cycleArray.forEach(element => {
                let m0 = moment.utc(element.bleed_start)
                let m1 = moment.utc(element.bleed_end)
    
                let days = m1.diff(m0, "days")
    
                d_data.labels.push(m0.format("MMM DD"))
                d_data.datasets[0].data.push(days)
            });
        }
        else {
            cycleArray.forEach(element => {
                let m0 = moment.utc(element.bleed_start)
                let m1 = moment.utc(element.end_date)
    
                let days = m1.diff(m0, "days")
    
                d_data.labels.push(m0.format("MMM DD"))
                d_data.datasets[0].data.push(days)
            });
        }
        

        setCycleData(d_data)

    }, [])
    

    const chartConfig= forPeriod?{
        backgroundColor: COLORS.DARK_GREY,
        backgroundGradientFrom: COLORS.WHITE,
        backgroundGradientTo: COLORS.DARK_GREY,
        color: (opacity = 1) => COLORS.DARK_PINK_RGBA
    }:{
        backgroundColor: COLORS.DARK_GREY,
        backgroundGradientFrom: COLORS.WHITE,
        backgroundGradientTo: COLORS.DARK_GREY,
        color: (opacity = 1) => COLORS.DARK_BLUE
    }
    return (
        <BarChart
            style={{paddingTop:10}}
            data={cycleData}
            width={Dimensions.get("screen").width}
            height={Dimensions.get("screen").height * 0.30}
            yAxisLabel=""
            fromZero={true}
            chartConfig={chartConfig}
            // verticalLabelRotation={30}
        />
    )

}

export default ChartInfo