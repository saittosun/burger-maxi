// jshint esversion: 9
import React, { Component } from "react";

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Aux from '../../hoc/_Aux/_Aux';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../../src/axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  //  I want to set up the state dynamically and you learned that a good place for fetching data is componentDidMount
  componentDidMount() {
    console.log(this.props);
    // this will now send a request to get our ingredients, I'll then add a then block here to handle the response we get back and that response should of course contain our ingredients object.
    axios
      .get('https://hamburger-react-maxi.firebaseio.com/ingredients.json')
      .then(response => {
        // a data object which actually contains the data we fetched.
        this.setState({ingredients: response.data});
      })
      // If we catch an error there and simply don't do anything with it for example, then we will already not get this anymore because now we're not calling the then block anymore. We can still dismiss the network error and our application is now broken, so we probably would want to handle that specific error case here for this specific page by for example also setting the UI here.
      .catch(error => {
        this.setState({error: true})
      })
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  // I will command all this code out because I no longer want to store it on firebase immediately here I want to go to the checkout component instead Now as you learned since burger builder is part of the routable area of our project, we have access to the match location and history props. Bunu yukarida console.log(this.props); satirinda ispatliyor.
  purchaseContinueHandler = () => {
    // alert('you continue');
    // this.setState({loading: true})
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'maxi',
    //     adress: {
    //       street: 'teststreet',
    //       zipcode: '1111',
    //       country: 'Belgium'
    //     },
    //     email: 'test@test.com',
    //   },
    //   deliveryMethod: 'fastest'
    // }
    // axios
    //   .post('/orders.json', order)
    //   .then(response => this.setState({loading: false, purchasing: false}))
    //   .catch(error => this.setState({loading: false, purchasing: false}));
    const queryParams = [];
    for (let i in this.state.ingredients) {
      // helper method which is provided by javascript, encodeURIComponent, which simply encodes my elements such that they can be used in the URL
      queryParams.push(
        // i is the key, these are the property names in my ingredients in the end just and here I'm setting property name equal to well the value for that property name.
        encodeURIComponent(i) + '=' + 
        encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      //we can use this to return new value and replace the old value which was the property name, salad and so on with that new value.
      return ingredients[igKey];//here I simply wanted to return ingredients and there the value for a given key and this will be the amount because with ingredients and this notation, I'm accessing a certain property in the ingredients object, igKey is salad, bacon and so on so I'm basically getting these values, the numbers and that is what I return for each key.
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    this.setState({purchaseable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type]= updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {return;}
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type]= updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0//disableInfo key is the value of each key
    }
    //the structure of disabledInfo is basically {salad: true, meat: false, ...}
    let orderSummary = null; 

    let burger = this.state.error ? <p>Ingredients can not be loaded!</p> : <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}/>
        </Aux>
      );
      orderSummary = (
        <OrderSummary 
          ingredients={this.state.ingredients}
          price={this.state.totalPrice.toFixed(2)}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler} />
      )     
    }
   
    if (this.state.loading) {
      orderSummary = <Spinner/>
    }
    

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    ) 
  }
}

export default withErrorHandler(BurgerBuilder, axios);