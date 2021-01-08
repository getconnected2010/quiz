import {useEffect} from 'react'
import { useDispatch} from 'react-redux'
import './App.css';
import{BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {signInAction} from './actions/userActions'
import QaList from './components/qaList';
import Add from './components/add';
import Home from './components/Home';
import Nav from './components/Nav';
import Signup from './components/Signup'
import Signin from './components/Signin'
import {AdminOnly, LoggedOnly, UnloggedOnly} from './services/ProtectedRoutes';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile'


const App=()=>{
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(signInAction())
},[dispatch])

  return (
    <Router>
      <Nav />
      <Switch>
          <Route path='/' exact component={Home} />
          <AdminOnly path='/add' component={Add} />
          <Route path='/list' component={QaList} />
          <UnloggedOnly path='/login' component={Signin} />
          <LoggedOnly path='/profile' component={Profile} />
          <LoggedOnly path='/retrieve' component={ResetPassword} />
          <UnloggedOnly path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
      </Switch>
    </Router>
  );
}
export default App;
