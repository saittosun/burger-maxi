// jshint esversion: 9
import * as actionTypes from './actionTypes';
import axios from '../../../src/axios-orders';

// these two actioncreators are sync
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

// so that I can handle this in redux because this being a async normal action reaches redux which has the reducer.
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

// async actioncreator--this is the action we dispatched from the container once we click that order button. 
// Now I'll create an action creator for this (actionTypes.js de ki => export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';) , we have one which is named like this but this has our async code and therefore doesn't return an action, so I'll actually refactor this and I'll add a new action creator. bu yuzden ismini degistirdi.
export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios
    .post('/orders.json', orderData)
    .then(response => {
      console.log(response.data);
      dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    })
    .catch(error => {
      dispatch(purchaseBurgerFail(error)); 
    })
  }
}