import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT
} from './types';
import { setAlert } from './alert';

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        const body = JSON.stringify({ token: localStorage.getItem('access')});

        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify`, body, config)
            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
    
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
        dispatch(setAlert('Zostałeś zalogowany!', 'success'));
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
        dispatch(setAlert('Podałeś błędne dane podczas logowania!', 'error'));
    }
};

export const register = (email, name, surname, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ email, name, surname, password, re_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        })
        dispatch(setAlert('Wystąpił błąd podczas rejestracji!', 'error'));
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch(setAlert('Zostałeś pomyślnie wylogowany', 'success'));
};