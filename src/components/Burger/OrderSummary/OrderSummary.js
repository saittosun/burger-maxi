// jshint esversion: 6
import React from 'react';

import Aux from '../../../hoc/_Aux';// I don't really need a wrapping element here therefore I will import my auxiliary element from aux

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      //double curly braces, the outer pair is for marking a dynamic entry and the inner curly braces are the javascript object
      return (
        <li key={igKey}> 
          <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li>
      )
    });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout?</p>
    </Aux>
  )
}

export default orderSummary;