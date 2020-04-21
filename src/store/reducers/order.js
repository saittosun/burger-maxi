// jshint esversion: 9
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      }
      return {
        ...state,
        loading: false,
        purchased: true,
        // concat returns a new array and therefore we added this immutably.
        orders: state.orders.concat(newOrder)
      }
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        // to set loading to false of course also because even if it failed, we're still done and the error should be handled through that modal since we added the withErrorHandler higher order component to contact data.
        loading: false,

      }
    default:
      return state;
  }
}

export default reducer;