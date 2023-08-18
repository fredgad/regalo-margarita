import React, { useContext, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { FirebaseContext } from '../../context/firebase/firebaseContext'
import { AlertContext } from '../../context/alert/alertContext'
import s from './CalendarNote.module.scss'
import { Alert } from '../common/alert/Alert' 

export const CalendarNote = ({get, set}) => {
    const {addCalendarNote, fetchCalendarNotes, removeCalendarNote} = useContext(FirebaseContext)
    const alert = useContext(AlertContext)
    const calendarForm = useRef(null) 

    const submit = event => {
        event.preventDefault()
        addCalendarNote(event.target.elements.title.value.trim(),
            event.target.elements.note.value.trim(), get.dataId)
            .then(() => {
                fetchCalendarNotes() 
                alert.show(`The note on ${get.date} was save`, 'success')
                set({
                    visible: true,
                    delDate: get.date,
                    dataId: get.dataId, 
                    title: calendarForm.current.elements.title.value,
                    note: calendarForm.current.elements.note.value  
                })
            })
            .catch(() => { 
                alert.show('Something went wrong', 'danger') 
            })
    }

    const deleteCalendarNote = () => {
        removeCalendarNote(get.dataId || get.delDate)
            .then(() => {
                fetchCalendarNotes().then(() => {
                    alert.show(`The note on ${get.date} was deleted`, 
                        'deleted', get.dataId, get.title, get.note)  
                        set({
                            visible: true,
                            title: '',
                            note: '',
                            dataId: get.dataId,
                            date: get.date
                        }) 
                        
                        calendarForm.current.elements.title.value = ''
                        calendarForm.current.elements.note.value = ''
                })
            })
            .catch(() => { 
                alert.show('Something went wrong', 'danger') 
            })
    } 
 
    return (
        <CSSTransition  
            in={get.visible}
            timeout={{
                enter: 200,
                exit: 350
            }} 
            classNames={'simple'}
            mountOnEnter
            unmountOnExit> 
            <form ref={calendarForm} onSubmit={submit} className={s.note}>  
                <button onClick={() => set({visible: false})} type="button" className={s.btn + " btn btn-outline-danger btn-sm"}>×</button>
                <Alert calendar={true} set={set} get={get} form={calendarForm} /> 
                <span>{get.date}</span> 
                <input className="form-control" name="title" type="text" defaultValue={get.title} placeholder="Title"></input>
                <textarea className="form-control" name="note" type="textarea" defaultValue={get.note} placeholder="Note"></textarea>
                    {(get.title || get.note) ? 
                        <b> 
                            <button className={s.save}>Update</button>  
                            <div onClick={() => deleteCalendarNote()} className={s.delete}>Delete</div> 
                        </b> :
                        <button className={s.save}>Create</button> 
                    }
            </form>
        </CSSTransition>
    )
}
