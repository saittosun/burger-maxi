// jshint esversion: 9
import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    // ingredientName containers/burgerBuilder.js den geliyor payload olarak
    ingredientName: name
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    // ingredientName containers/burgerBuilder.js den geliyor payload olarak
    ingredientName: name
  };
};