import {useEffect} from 'react'
import { useDispatch} from 'react-redux'
import './App.css';
import{BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import {fetchAll} from './actions/listActions'
import {signInAction} from './actions/userActions'
import QaList from './components/qaList';
import Add from './components/add';
import Home from './components/Home';
import Nav from './components/Nav';
import Signup from './components/Signup'
import Signin from './components/Signin'
import ProtectedRoutes from './services/ProtectedRoutes';


const App=()=>{
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(signInAction())
    dispatch(fetchAll())
},[dispatch])

  return (
    <Router>
      <Nav />
      <Switch>
          <Route path='/' exact component={Home} />
          <ProtectedRoutes path='/add' component={Add} />
          <Route path='/login' component={Signin} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/list' component={QaList} />
      </Switch>
    </Router>
  );
}
export default App;
