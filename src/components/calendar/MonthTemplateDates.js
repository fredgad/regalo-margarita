import React from 'react'
import daisy from '../../img/daisy.png'

export const MonthTemplateDates = ({calendarNotes, array, addCalendarNote, 
    countMonth, exactMonth, countDay, state, setMonthState}) => { 
    const swipeHash = {
        maxSwipeTime: 500,
        swipeRange: 30,
        swipeHeight: undefined,
        swipeWidth: undefined,
        startTime: undefined,
        endTime: undefined,
        swipeXStart: undefined,
        swipeYStart: undefined,
        swipeXEnd: undefined,
        swipeYEnd: undefined
    }

    const touchStart = (event) => {
        swipeHash.startTime = new Date().getTime()
        swipeHash.swipeXStart = event.changedTouches[0].pageX
        swipeHash.swipeYStart = event.changedTouches[0].pageY
    }

    const touchEnd = (event) => {
            swipeHash.endTime = new Date().getTime() - swipeHash.startTime
            swipeHash.swipeXEnd = event.changedTouches[0].pageX
            swipeHash.swipeYEnd = event.changedTouches[0].pageY
            swipeHash.swipeHeight = swipeHash.swipeYEnd - swipeHash.swipeYStart
            swipeHash.swipeWidth = swipeHash.swipeXEnd - swipeHash.swipeXStart

        if (swipeHash.endTime <= swipeHash.maxSwipeTime && Math.abs(swipeHash.swipeHeight) <= 100) {
            if (swipeHash.swipeWidth >= swipeHash.swipeRange) {
                let prev = (+countMonth()-3 < 0) ? 'december' :
                    Object.keys(state)[+countMonth()-3]
                setMonthState(prev)
            } else if (swipeHash.swipeWidth <= -swipeHash.swipeRange) {
                let next = (+countMonth()-1 > 10) ? 'february' :
                    Object.keys(state)[+countMonth()-1]
                setMonthState(next)
            }
        }
    }
    
    return ( 
        <div className="dates" 
            onTouchStart={touchStart.bind(null)}
            onTouchEnd={touchEnd.bind(null)}>
            {array.map(el => {
                let today = new Date().getDate(),
                    currentDay = el.id !== 41 ? countDay(el.id) : 0,
                    dateClass = el.h ? 'bg-secondary' : 'bg-light',
                    currentMonth = countMonth(),
                    dateToCompare = `${currentDay}-${currentMonth}-2023`,
                    exactDay = (+el.day === today) && exactMonth,
                    existDay = el.day && el.id !== 41 ? true : false
            
                dateClass = existDay ? dateClass += ' exist' : dateClass
            
                let item = calendarNotes.find(el => dateToCompare === el.id && el)
            
                return (
                    <div key={el.id} className={dateClass} 
                        onClick={() => addCalendarNote(el.id, item, el.day) }>
                        {item && <span className={exactDay ? 'noteOnToday' : ''}>
                            <img src={daisy} alt=""/></span>}  
                        {exactDay ? <p>today</p> : ''}
                        {el.day}
                    </div>
                )
            })}
        </div>
    )
}
