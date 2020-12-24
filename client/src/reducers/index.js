import{combineReducers} from 'redux'
import quizReducer from './quizReducer'
import userReducer from './userReducer'

export default combineReducers({
    qa: quizReducer, 
    user: userReducer
})