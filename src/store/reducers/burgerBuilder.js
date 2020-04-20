// jshint esversion: 6
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients : null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // we don't need break statements because we return in each case anyways, so the code execution won't continue in this function.
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          // with that in this new ingredients object, we want to overwrite the given ingredient which we need to get as a payload of this action. Now in ES6, there is this special syntax you can use to dynamically overwrite a property in a given javascript object, you can use square brackets, now this does not create an array here. Instead here, you can now pass a variable over a something which contains the name you actually want to use as a property name and I expect to get that property name on my action. Now ingredient name is something we get as a payload to the action and then here, we simply distribute all ingredients into our new object su an icinde bulundugumuz object, So this object then holds salad, meat bacon and cheese and one of these, which ever that is which we receive as a payload of the action will receive a new value. We target it with this syntax(action.ingredientName) and then with colon and the new value, well we set this new value, the new value now simply is state.ingredients then again select the given ingredient name, so this now fetchs the old value for that ingredient, so like 0 or 1 or whatever it was and then we add plus one. So now here, we get the number(state.ingredients[action.ingredientName]) of the old ingredients, add one and assign this to this ingredient([action.ingredientName]) where we overwrite the copy we created here. Now we're returning a new version of the state with the updated ingredients.
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
      case actionTypes.SET_INGREDIENTS:
        return {
          ...state,
          // I receive these ingredients because in the burger builder action file where we have setIngredients, I do pass this ingredients property.
          ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
          }
          // I want to set my error to false to reset it in case we had an error earlier
          error: false
        };
      case actionTypes.FETCH_INGREDIENTS_FAILED:
        return {
          ...state,
          error: true
        };
    default:
      return state;
  }
}

export default reducer;
