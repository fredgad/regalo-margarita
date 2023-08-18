import React, { useState, useContext, useEffect } from 'react'
import { CalendarNote } from './CalendarNote'
import { state } from '../../context/staticState/state'
import { FirebaseContext } from '../../context/firebase/firebaseContext'
import { MonthTemplateDates } from './MonthTemplateDates'

export const MonthTemplate = ({array, setMonthState}) => {
    const {calendarNotes, fetchCalendarNotes } = useContext(FirebaseContext)

    useEffect(() => {
        fetchCalendarNotes() 
        // eslint-disable-next-line
    }, [])

    let exactMonth = (new Date().getMonth() === +array[41].day)

    const [get, set] = useState({
        visible: false,
        title: '',
        note: '',
        date: undefined,
        dataId: undefined
    })

    const countDay = (el) => {
        let thisMonth = state[Object.keys(state)[array[41].day-1]],
        day = Object.values(thisMonth)[el].day
        day =  day.length < 2 ? `0${day}` : day  
        return day
    }

    const countMonth = () => {
        let month = +array[41].day+1
        month = month < 10 ? `0${month}` : month
        return month
    }
    
    const addCalendarNote = (id, item, day) => {
        let month = countMonth(id)
        if (day === '') {
            return
        }
        set({ 
            visible: true,
            title: item ? item.title : '',
            note: item ? item.calendarNote : '', 
            date: `${day}/${month}/2023`,
            dataId: `${day}-${month}-2023`
        })
    }

    return ( 
        <div className="MonthTamplate">
            <CalendarNote set={set} get={get} />
            <div className="days">
                <div>Mon</div>
                <div>Tue</div>
                <div>Weв</div>
                <div>Thu</div>
                <div>Fri</div>
                <div className="weekend">Sat</div>
                <div className="weekend">Sun</div> 
            </div>
            <MonthTemplateDates 
                calendarNotes={calendarNotes}
                array={array}
                addCalendarNote={addCalendarNote}
                exactMonth={exactMonth}
                countMonth={countMonth}
                countDay={countDay}
                state={state}
                setMonthState={setMonthState}
            />
        </div> 
    )
}
