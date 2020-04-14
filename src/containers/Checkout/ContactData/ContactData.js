// jshint esversion: 6
import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from "../../../../src/axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (e) => {
    e.preventDefault();
    // we get the ingredients in there with the ingredients being passed, now submitting the request is easy of course. In the burger builder where I have commented out this code for sending a request
    console.log(this.props.ingredients);
    this.setState({loading: true})
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'maxi',
        adress: {
          street: 'teststreet',
          zipcode: '1111',
          country: 'Belgium'
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest'
    }
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({loading: false})
        this.props.history.push('/')
      })
      .catch(error => this.setState({loading: false}))
  }
  render() {
    let form = (
      <form>
          <Input inputtype="input" type="text" name="name" placeholder="Your name"/>
          <Input inputtype="input" type="email" name="email" placeholder="Your email"/>
          <Input inputtype="input" type="text" name="street" placeholder="Your street"/>
          <Input inputtype="input" type="text" name="postal" placeholder="Your postal"/>
          <Button 
            btnType="Success"
            clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = (
        <Spinner/>
      )
    }
    return (
      <div className={classes.ContactData}>
        <h4>enter your contact data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;