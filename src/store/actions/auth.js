// jshint esversion: 9
import axios from 'axios';

import * as actionTypes from './actionTypes';

// I will essentially use this action to set a loading state and potentially show a spinner if I want to.
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    axios
      .post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfJAwZWGyJIt_3DeJJ27QilDOgB6nPgaQ',
      authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data))
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err))
      })
  }
}

