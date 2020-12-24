const userReducer =(state=[{user_id: null}, {admin: false}], action)=>{
    switch(action.type){
        case 'SIGNIN':
            return state;
        default:
            return state
    }
}
export default userReducer;