const quizReducer=(state=[8], action, payload)=>{
    switch(action.type){
        case 'ADD':
            return [...state, action.payload]
        default:
            return state
    }
}
export default quizReducer;