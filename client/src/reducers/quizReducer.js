const quizReducer=(state=[], action, payload)=>{
    switch(action.type){
        case 'ADD':
            console.log('state', state)
            console.log('payload', action.payload)
            return [...state, action.payload]
        case 'FETCH':
            return action.payload
        default:
            return state
    }
}
export default quizReducer;