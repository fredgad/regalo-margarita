import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import daisy from '../../img/daisy.png' 
import s from './Navbar.module.scss'
import { AlertContext } from '../../context/alert/alertContext'
import { AuthContext } from '../../context/firebase/Auth'
import SignOut from '../../context/firebase/SignOut'

export const Navbar = () => { 
    const alert = useContext(AlertContext)

    const {currentUser} = useContext(AuthContext)
    let userEmail = ''
    if(currentUser) {
        userEmail = currentUser.email
    }

    if(currentUser) {
        return (
            <nav className={s.nav + " navbar navbar-dark navbar-expand-lg"}>
                <SignOut /> 
                <div className="container" > 
                    <div className="navbar-brand">
                        <img src={daisy} alt="daisy"/>
                        <h5>
                            <span style={{color: '#FE4C80'}}>User</span>:
                            {userEmail}
                        </h5>
                    </div> 
            
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink onClick={alert.hide} className="nav-link" exact to="/">
                                Notes
                            </NavLink>
                        </li>
                        <li className="nav-item">  
                            <NavLink onClick={alert.hide} className="nav-link" exact to={'/calendar'}>  
                                Calendar
                            </NavLink> 
                        </li>
                        <li className="nav-item">    
                            <NavLink onClick={alert.hide} className="nav-link" to={'/weather'}>  
                                Weather
                            </NavLink> 
                        </li>
                    </ul> 
                </div>
            </nav> 
        )
    } else {
        return (
        <div className="navbar-brand">
            <img src={daisy} alt="daisy"/>
            <h1>Asistent Margarita</h1> 
        </div>
        )
    }
}
