import{combineReducers} from 'redux'
import quizReducer from './quizReducer'
import adminReducer from './adminReducer'

export default combineReducers({
    qa: quizReducer, 
    admin: adminReducer
})