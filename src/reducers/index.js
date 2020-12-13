import quizReducer from './quizReducer'
import{combineReducers} from 'redux'

export default combineReducers({qa: quizReducer})