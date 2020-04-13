// jshint esversion: 6
// show the burger itself, rebuild the burger in this checkout summary form and then when the user clicks on continue and then want to load the contact form. So that's the goal here
import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 1,
      meat: 1
    }
  }

  // I need to parse this in the checkout component and then I'll do this in componentDidMount I won't use componentDidUpdate or anything like that because whenever I load this component, it will mount itself, there is no way I can route to it without it being mounted again because it's not nested in some other page or anything like that.
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      // ['salad', '1']
      ingredients[param[0]] = +param[1];
    }
    this.setState({ingredients: ingredients});
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  render() {
    return (
      // I want to have a div which wraps my entire page because this will be used as a page with the React router. 
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}/> 
        <Route 
          path={this.props.match.path + '/contact-data'}
          component={ContactData}/> 
      </div>
    )
  }
}

export default Checkout;