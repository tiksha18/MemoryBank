import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

// dispatched actions
export const signin = (formData, history) => async (dispatch) => {
    try {
        // log in the user
        const { data } = await api.signIn(formData);
        dispatch({ type : AUTH, data });  // dispatched action to reducer 
        history.push('/');  // navigate to homepage after logging in 
    } catch (error) {
       console.log(error); 
    }
};

export const signup = (formData, history) => async (dispatch) => {
    try {
        // sign up the user
        const { data } = await api.signUp(formData);
        dispatch({ type : AUTH, data });  // dispatched action to reducer
        history.push('/');  // navigate to homepage after signing up 
    } catch (error) {
        console.log(error);
    }
};