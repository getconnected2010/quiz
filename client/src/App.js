import {useEffect} from 'react'
import { useDispatch} from 'react-redux'
import './App.css';
import{BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import {fetchAll} from './actions/listActions'
import QaList from './components/qaList';
import Add from './components/add';
import Home from './components/Home';
import Nav from './components/Nav';
import Signup from './components/Signup'


const App=()=>{
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchAll())
},[dispatch])

  return (
    <Router>
      <Nav />
      <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/add' component={Add} />
          <Route path='/signup' component={Signup} />
          <Route path='/list' component={QaList} />
      </Switch>
    </Router>
  );
}
export default App;
