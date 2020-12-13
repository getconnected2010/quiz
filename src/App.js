import './App.css';
import{useSelector} from 'react-redux'
import List from './components/qaList';
import Add from './components/add';


const App=()=>{
  const qaList = useSelector(state => state.qa)
  console.log(qaList)
  return (
    <div className="App">
        <List />
        <Add />
    </div>
  );
}

export default App;
