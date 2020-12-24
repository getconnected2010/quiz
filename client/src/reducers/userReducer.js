const userReducer =(state={user_id: null, admin: false}, action, payload)=>{
    switch(action.type){
        case 'SIGNIN':
            return action.payload;
        case 'SIGNOUT':
            return {user_id: null, admin: false};
        default:
            return state
    }
}
export default userReducer;