import React, { useReducer } from 'react'
import { AlertContext } from './alertContext'
import { alertReducer } from './alertReducer'
import { SHOW_ALERT, HIDE_ALERT } from '../types' 

export const AlertState = ({children}) => {
    const [state, dispatch] = useReducer(alertReducer, {
        visible: false,
        delDate: '',
        delTitle: '',
        delNote: ''
    }) 

    const show = (text, type = 'warning', delDate, delTitle, delNote) => {
        dispatch({
            type: SHOW_ALERT, 
            payload: {text, type, delDate, delTitle, delNote} 
        })
    }

    const hide = () => dispatch({type: HIDE_ALERT})

    return (
        <AlertContext.Provider value={{
            show, hide,
            alert: state
        }}>
            {children}
        </AlertContext.Provider> 
    )
}