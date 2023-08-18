import React, { useCallback, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import app from '../context/firebase/base'
import s from './LoginAndSignUp.module.scss' 

const SignUp = ({history}) => { 
    const [getError, setError] = useState({
        error: '',
        wrongLogin: false,
        wrongPassword: false 
    })

    const handleSignUp = useCallback(async event => {
        event.preventDefault()
        const { email, password } = event.target.elements
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push('/')
        }
        catch(error) {
            let log = (error.code === "auth/email-already-in-use" ||
                error.code === "auth/invalid-email") ? true : false,
                pass = error.code === "auth/weak-password" ? true : false
            setError({
                error: error.message,
                wrongLogin: log,
                wrongPassword: pass 
            }) 
        }
    }, [history])

    return (
        <div className={`${s.registration} forms`}>
            <NavLink className="nav-link" exact to="/login">Login</NavLink>
            <h2>Registration</h2>
            <form onSubmit={handleSignUp}>  
                <label>
                    <p>Email</p>
                    <input className={getError.wrongLogin ? 'wrong' : '' } name="email" type="email" placeholder="Email" />
                </label>
                <label>
                    <p>Password</p>
                    <input className={getError.wrongPassword ? 'wrong' : '' } name="password" type="password" placeholder="Password" />
                </label>
                <button type="submit">Sign Up</button>
            </form>
            <div className="error">{getError.error}</div>
        </div>
    )
}
 
export default withRouter(SignUp)