import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { MonthLink } from '../components/calendar/MonthLink'
import { AuthContext } from '../context/firebase/Auth'

export const Calendar = React.memo(({state}) => {
    const currentMonth = new Date().getMonth(),
          months = ['january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december']
        
    const [dropState, setDropState] = useState({dropDown: false}) 
    const [monthState, setMonthState] = useState(months[currentMonth]) 
    const {currentUser} = useContext(AuthContext)

    const change = (el = monthState) => {
        setMonthState(el)
        setDropState(dropState => ({...dropState, dropDown: !dropState.dropDown}))
    }

    let dropDownClass = `dropdown-menu ${dropState.dropDown ? 'show' : ''}`
    let btnGroup = `btn-group ${dropState.dropDown ? 'show' : ''}`
    if(currentUser) {
        return ( 
            <div className="Calendar">
                <div className={btnGroup}>
                    <button onClick={() => change()}
                        className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Select month
                    </button>
                    <div className={dropDownClass}>
                        {Object.keys(state).map(el => (
                            <div key={el} onClick={() => change(el)}
                            className="dropdown-item">
                                {`${el[0].toUpperCase()}${el.slice(1)}`}
                            </div>
                        ))}
                    </div> 
                </div>
                {Object.keys(state).map(el => (
                    <MonthLink key={el} array={state[el]} 
                        monthState={monthState} setMonthState={setMonthState} 
                        month={el} />
                ))}
            </div>
        )
    } else {
        return (
            <Redirect to={'/login'} />
        )
    }
})