import React, { useContext } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { AlertContext } from '../../context/alert/alertContext' 

export const Notes = ({notes, onRemove}) => {
    const alert = useContext(AlertContext)
    
    return (
        <TransitionGroup component={'ul'} className="list-group" style={{marginBottom:'40px'}}>
            {notes.map(note => {
                const currentDate = new Date(note.date)
                let [year, month, date, hour, minute, second, millisecond] = [
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate(),
                    currentDate.getHours(),
                    currentDate.getMinutes(),
                    currentDate.getSeconds(),
                    currentDate.getMilliseconds()
                ]

                month = (++month < 10) ? '0' + month : month
                date = (date < 10) ? '0' + date : date
                hour = (hour < 10) ? '0' + hour : hour
                minute = (minute < 10) ? '0' + minute : minute
                second = (second < 10) ? '0' + second : second

                return (
                <CSSTransition key={note.id}
                    timeout={800}
                    classNames={'note'}>
                    <li className="list-group-item note">
                        <div> 
                            <strong>{note.title}</strong>
                            <small>
                                {`${year}-${month}-${date} ${hour}:${minute}:${second}.${millisecond}`}
                            </small> 
                        </div>
                
                        <button type="button" className="btn btn-outline-danger btn-sm"
                            onClick={() => {
                                    onRemove(note.id)
                                    alert.show('The note was deleted', 'deleted', note.date, note.title)
                                }}> 
                            &times; 
                        </button>
                    </li>
                </CSSTransition>)
            })}
        </TransitionGroup> 
    )
} 