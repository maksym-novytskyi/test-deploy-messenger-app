export const fetchUsers = (request) => (dispatch) => {
    request("http://maksym-novytskyi.github.io:3001/users")
        .then(data => dispatch(usersFetched(data)))
}

export const usersFetched = (users) => {
    return {
        type: 'USERS_FETCHED',
        payload: users
    }
}

export const usersUpdated = (users) => {
    return {
        type: 'USERS_UPDATED',
        payload: users
    }
}
