import React, { useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
import { AlertContext } from '../../../context/alert/alertContext'
import { FirebaseContext } from '../../../context/firebase/firebaseContext'
import './Alert.scss'

export const Alert = ({calendar, set, get, form}) => {
    const {alert, hide, show} = useContext(AlertContext)
    const {addNote, addCalendarNote, fetchCalendarNotes} = useContext(FirebaseContext)

    const restoreNote = () => { 
        if(calendar) {
            addCalendarNote(alert.delTitle, alert.delNote, get.dataId)   
                .then(()=> {
                    fetchCalendarNotes()
                    show('The note was restored', 'success') 
                    set({
                        visible: true,
                        delDate: alert.delDate,
                        dataId: get.dataId, 
                        title: alert.delTitle,
                        note: alert.delNote,
                        date: get.date 
                    })
                    console.log(get)
                    form.current.elements.title.value = alert.delTitle
                    form.current.elements.note.value = alert.delNote 
                })
        } else {
            addNote(alert.delTitle, alert.delDate)  
                .then(()=> {
                    show('The note was restored', 'success', undefined, undefined)
                })
        }
    }

    return (
        <CSSTransition  
            in={alert.visible}
            timeout={{
                enter: 500,
                exit: 350
            }}
            classNames={'alert'}
            mountOnEnter
            unmountOnExit>
            <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`}>
                <strong>{ alert.text }!</strong> 
                <p onClick={() => restoreNote()} >
                    {calendar ? 'Restore here' : 'Restore'}
                </p>
                <button onClick={hide} type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div> 
        </CSSTransition>
    )
} 