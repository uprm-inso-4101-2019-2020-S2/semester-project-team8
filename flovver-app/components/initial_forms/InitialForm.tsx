import React, {useState, useEffect} from 'react';

import InitialFormView from './InitialFormView'

const InitialForm = ( { history } ) => {

    const [periodStart, setPeriodStart] = useState(new Date())
    const [periodDuration, setPeriodDuration] = useState("5")
    const [cycleLen, setCycleLen] = useState(28)
   
    useEffect(() => { 
        history.push("/InitialForm/Period")
    }, [])

    return (<InitialFormView 
            periodStart={periodStart}
            setPeriodStart={setPeriodStart}
            periodDuration={periodDuration}
            setPeriodDuration={setPeriodDuration}
            cycleLen={cycleLen}
            setCycleLen={setCycleLen}
        />)
}


export default InitialForm