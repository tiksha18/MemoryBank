import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData : null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));   // adding/setting the logged in user data to localstorage that is local db or redux so that after refreshing the page the user still remains logged in    
            return {...state, authData : action?.data};
        case LOGOUT:
            localStorage.clear();
            return {...state, authData : null};
        default:
            return state;
    }
};

export default authReducer;