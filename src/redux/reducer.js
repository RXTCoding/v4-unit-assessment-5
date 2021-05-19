const initialState= {
username:'',
profile_pic:``
}

const UPDATE_USER='UPDATE_USER'
const LOGOUT= 'LOGOUT'

//ACTION BUILDER
export function updateUser(user){ //<-- somehow 'user' takes in the initialState
    const action={
        type: UPDATE_USER,
        payload: user
    }
    return action
}

export function logout() {
    const action={
        type: LOGOUT,
        payload: null  
    }
    return action
}

//REDUCER FUNCTION
export default function reducer( state=initialState, action){
    switch(action.type){
        case UPDATE_USER:
            return Object.assign(state, {user: action.payload})
        case LOGOUT:
            return  {username:'',profile_pic:''}
        default:
            return state
    }
}

//LOGOUT ACTION BUILDER

