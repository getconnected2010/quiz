import{combineReducers} from 'redux'
import messageReducer from './messageReducer'
import quizReducer from './quizReducer'
import userReducer from './userReducer'

export default combineReducers({
    modalMessage: messageReducer,
    qa: quizReducer, 
    user: userReducer
})