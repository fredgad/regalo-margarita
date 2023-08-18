import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import app from './base'
import s from './SignOut.module.scss'


const SignOut = () => {
    const [log, setLog] = useState({visible: false})

    return (
        <>
            <button className={s.signOutButton} onClick={() => setLog({visible: true})}>Sign Out</button>

            <CSSTransition  
            in={log.visible}
            timeout={{
                enter: 350,
                exit: 350
            }}
            classNames={'signOut'}
            mountOnEnter
            unmountOnExit>
                <div className={s.signOut} onClick={() => setLog({visible: false})}>
                    <div>
                        <button onClick={() => app.auth().signOut()}>Log Out</button>
                        <button onClick={() => setLog({visible: false})}>Canсel</button>
                    </div>
                </div> 
            </CSSTransition>
        </>
    )
}

export default SignOut 