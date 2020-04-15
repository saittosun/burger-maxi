// jshint esversion: 6
import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from "../../../../src/axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    // name: '',
    // email: '',
    // address: {
    //   street: '',
    //   postalCode: ''
    // },
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'your name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'street'
        },
        value: ''
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'your E-mail'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      }
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
      // customer: {
      //   name: 'maxi',
      //   adress: {
      //     street: 'teststreet',
      //     zipcode: '1111',
      //     country: 'Belgium'
      //   },
      //   email: 'test@test.com',
      // },
      // deliveryMethod: 'fastest'
    }
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({loading: false})
        this.props.history.push('/')
      })
      .catch(error => this.setState({loading: false}))
  }

  // I expect to get an event object as it will automatically be passed to me by react if this method is attached to an event listener which it of course is.
  // we also receive or need a second argument which is the input identifier so that we can reach out to our state, get the right element here, the right object and adjust its value.
  inputChangedHandler = (e, inputIdentifer) => {
    console.log(e.target.value)
    // this ID which is just a key from our object and that's exactly what I need. These keys here in our state object (name, street, zipcode and so on), these are the identifiers of the inputs and exactly the objects I need to adjust it. Now of course, I can use that information to update the value, the problem just is I of course can't access this.state.orderForm identifier and update the value, this is not how we mutate the state. Instead we have to mutate it, well immutably and we do this with set state.
    const updatedOrderForm = {
      ...this.state.orderForm
    }

    // I'll create a new object and used to spread operator here to create a clone. Now I can safely change the value of the updatedFormElement because it is again a clone.
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifer]
    }
    updatedFormElement.value = e.target.value;
    updatedOrderForm[inputIdentifer] = updatedFormElement;
    this.setState({orderForm: updatedOrderForm})
  }
  render() {
    const formElementsArray = [];
    // the keys are going to be name, street, zipcode and so on and if we access order form for a given key, we get these values here on the right side of course.
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        //  this is now the right side of this property so this javascript object, that is what we we'll store in this config property.
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form>
          {/* <Input inputtype="input" type="text" name="name" placeholder="Your name"/>
          <Input inputtype="input" type="email" name="email" placeholder="Your email"/>
          <Input inputtype="input" type="text" name="street" placeholder="Your street"/>
          <Input inputtype="input" type="text" name="postal" placeholder="Your postal"/> */}
          {formElementsArray.map(formElement => {
            return (
              <Input
                key={formElement.id} 
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(e) => this.inputChangedHandler(e, formElement.id)}/>
            )
          })}
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