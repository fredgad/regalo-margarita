import './App.scss'
import { Route, Switch } from 'react-router-dom'
import { AlertState } from './context/alert/AlertState'
import { FirebaseState } from './context/firebase/FirebaseState'
import PrivateRoute from './context/firebase/PrivateRoute'
import { AuthProvider } from './context/firebase/Auth'
import { Home } from './pages/Home'
import { Calendar } from './pages/Calendar'
import { Navbar } from './components/navbar/Navbar'
import { Weather } from './pages/Weather'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

function App({state}) {
  return (
    <AuthProvider>
      <FirebaseState>
        <AlertState>
          <Navbar />
          <Route render={({location}) => (
            <div className="container pt-4">
              <TransitionGroup>
                <CSSTransition
                  key={location.key} 
                  timeout={300} 
                  classNames='fade'> 
                  <Switch location={location}> 
                    <PrivateRoute path="/" exact component={Home} /> 
                    <Route path="/calendar" render={() => <Calendar state={state} />} />
                    <PrivateRoute path='/weather' component={Weather} />
                    <Route path={'/login'} exact render={() => <Login />} />
                    <Route path={'/signup'} exact render={() => <SignUp />} /> 
                    <Route path="/" render={() => <Login />} />  
                  </Switch>  
                </CSSTransition>
              </TransitionGroup> 
            </div>
          )} />
        </AlertState>
      </FirebaseState>
    </AuthProvider>
  )
}

export default App;
