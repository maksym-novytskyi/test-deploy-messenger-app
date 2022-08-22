const initialState = {
    users: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NEW_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case 'USERS_FETCHED':
            return {
                ...state,
                users: action.payload
            }
        default:
            return state;

    }
}

export default usersReducer;