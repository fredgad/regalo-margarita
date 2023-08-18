import React, { useCallback, useContext, useState } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import app from '../context/firebase/base'
import { AuthContext } from '../context/firebase/Auth'
import s from './LoginAndSignUp.module.scss'

const Login = ({history}) => {
    const [getError, setError] = useState({
        error: '',
        wrongLogin: false,
        wrongPassword: false
    })

    const handleLogin = useCallback(async event => {
        event.preventDefault()
        const { email, password } = event.target.elements
        try {
            await app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
            history.push('/')
        }
        catch(error) {
            let log = error.code === "auth/user-not-found" ? true : false,
                pass = error.code === "auth/wrong-password" ? true : false
            setError({
                error: error.message,
                wrongLogin: log,
                wrongPassword: pass 
            }) 
        }
    }, [history])

    const { currentUser } = useContext(AuthContext)

    if(currentUser) {
        return <Redirect to="/" /> 
    }

    return (
        <div className={`${s.registration} forms`}>
            <NavLink className="nav-link" exact to="/signup">Sign Up</NavLink>
            <h2>Authorization</h2>
            <form onSubmit={handleLogin}>
                <label>
                    <p>Email</p>
                    <input className={getError.wrongLogin ? 'wrong' : '' } name="email" type="email" placeholder="Email" />
                </label>
                <label>
                    <p>Password</p>
                    <input className={getError.wrongPassword ? 'wrong' : '' } name="password" type="password" placeholder="Password" />
                </label>
                <button type="submit">Login</button> 
            </form>
            <div className="error">{getError.error}</div>
        </div>
    )
}
 
export default withRouter(Login)  