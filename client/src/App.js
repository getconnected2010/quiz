import './App.css';
import{BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import List from './components/qaList';
import Add from './components/add';
import Home from './components/Home';
import Nav from './components/Nav';


const App=()=>{
  return (
    <Router>
      <Nav />
      <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/list' component={List} />
          <Route path='/add' component={Add} />
      </Switch>
    </Router>
  );
}
export default App;
