// jshint esversion: 6
// show the burger itself, rebuild the burger in this checkout summary form and then when the user clicks on continue and then want to load the contact form. So that's the goal here
import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    // ingredients: {
    //   salad: 1,
    //   bacon: 1,
    //   cheese: 1,
    //   meat: 1
    // }
    ingredients: null,
    price: 0
  }

  // I need to parse this in the checkout component and then I'll do this in componentDidMount I won't use componentDidUpdate or anything like that because whenever I load this component, it will mount itself, there is no way I can route to it without it being mounted again because it's not nested in some other page or anything like that.
  // we can simply change componentDidMount to WillMount before we render the child component, we already have access to the props there so we can already get the queryParams there. and we do this at the point of time where we don't render children so we can set up the state prior to render children.
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      // ['salad', '1']
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ingredients: ingredients, totalPrice: price});
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
        {/* <Route 
          path={this.props.match.path + '/contact-data'}
          component={ContactData}/>  */}
        <Route 
          path={this.props.match.path + '/contact-data'}
          //  since I now render it manually here I can pass props to it and here, I'll add my ingredients as a prop and refer to this.state.ingredients.
          render={(props) => (
            <ContactData 
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              // Let's now also make sure we redirect once we are done. bunu contact data.Js de this.props.history.push('/') da yaptik. Now in order to redirect here, normally we could run this.props.history, this history object we get by the router and then push for example to the route page. However due to the waiver loading contact data by basically rendering it manually down here with the render method, we don't have the history object available in there. Now there are two ways we can use to fix this, one is we can wrap the contact data component with this withRouter helper method. The other would be to pass history which we do get in the props of this render method here onto contact data. Now I will use the props I get in this render method and I will simply distribute them here after passing my own props with curly braces props. Whatever I get in the props here will be passed on to a contact data and therefore since this will include the history object, this push method here should work.
              {...props}/>)}/>
      </div>
    )
  }
}

export default Checkout;