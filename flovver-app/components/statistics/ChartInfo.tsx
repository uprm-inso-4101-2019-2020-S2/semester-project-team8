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
    
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43]
          }
        ]
      };

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
            height={300}
            yAxisLabel=""
            fromZero={true}
            chartConfig={chartConfig}
            // verticalLabelRotation={30}
        />
    )

}

export default ChartInfo
// const data = [
//     {
//         value: 50,
//         label: 'One',
//     },
//     {
//         value: 10,
//         label: 'Two',
//     },
//     {
//         value: 40,
//         label: 'Three',
//     },
//     {
//         value: 95,
//         label: 'Four',
//     },
//     {
//         value: 85,
//         label: 'Five',
//     },
// ]

// const CUT_OFF = 50
// const Labels = ({  x, y, bandwidth, data }) => (
//     data.map((value, index) => (
//         <Text
//             key={ index }
//             x={ value > CUT_OFF ? x(0) + 10 : x(value) + 10 }
//             y={ y(index) + (bandwidth / 2) }
//             fontSize={ 14 }
//             fill={ value > CUT_OFF ? 'white' : 'black' }
//             alignmentBaseline={ 'middle' }
//         >
//             {value}
//         </Text>
//     ))
// )

//                         {/* <YAxis
//                         data={data}
//                         contentInset={{top: 20}}
//                         yAccessor={({ index }) => index}
//                         svg={{
//                             fill: 'grey',
//                             fontSize: 10,
//                         }}
//                         scale={scale.scaleBand}
//                         numberOfTicks={10}
//                         formatLabel={(days) => `${days}`}
//                     /> */}
//                     <BarChart 
//                         // style={styles.PeriodChart}
//                         yAccessor={({ item }) => item.value}
//                         xAccessor={({ item }) => item.label}
//                         data={data}
//                         svg={{fill:COLORS.MID_BLUE}}
//                         contentInset={{top: 10}}
//                         gridMin={0}
//                         horizontal={true}
                        
//                     >
//                         <Grid direction={Grid.Direction.VERTICAL}/>
//                         {/* <Labels/> */}
//                     </BarChart>
//                     {/* <XAxis
//                         data={data}
//                         contentInset={{left:10}}
//                         xAccessor={({ index }) => index}
//                         svg={{
//                             fill: 'grey',
//                             fontSize: 10,
//                         }}
//                         scale={scale.scaleBand}
//                         numberOfTicks={10}
//                         formatLabel={(days) => `${days}`}  
//                     /> */}
//                     {/* X axis: days/duration, Y axis: start date */}
