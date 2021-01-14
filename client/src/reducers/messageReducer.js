const messageReducer = (state={}, action) => {
   switch (action.type) {
       case 'NEW-MESSAGE':
           return action.payload;
        case 'ERASE-MESSAGE':
            return {}
       default:
           return state
   }
}

export default messageReducer
