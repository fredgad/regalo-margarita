import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { MonthTemplate } from './MonthTemplate' 

export const MonthLink = ({array, month, monthState, setMonthState}) => {

    return (
        <CSSTransition  
            in={month === monthState}
            timeout={{
                enter: 500,
                exit: 500
            }}
            classNames={'month'}
            mountOnEnter
            unmountOnExit><div className="monthWrap">
            <p>{`${month[0].toUpperCase()}${month.slice(1)}`}</p>
            <MonthTemplate array={array} setMonthState={setMonthState} />
        </div></CSSTransition>  
    )
} 