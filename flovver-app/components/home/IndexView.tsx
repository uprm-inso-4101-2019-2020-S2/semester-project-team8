import React from 'react'
import HomeArea from './HomeArea'
import BottommMenu from './BottomMenu'


const IndexView = ({history}) => (
    <React.Fragment>
        <HomeArea />
        <BottommMenu history={history}/>
    </React.Fragment>
)


export default IndexView