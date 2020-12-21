const adminReducer =(state=false, action)=>{
    switch(action.type){
        case 'ADMIN':
            return true;
        default:
            return state
    }
}
export default adminReducer;