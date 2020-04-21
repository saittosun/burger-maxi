// jshint esversion: 9
import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Auth extends Component {
  // I want to use my custom input and button components, just as I use them in the contact data component or container. I'll also manage my form through the state of this auth container, not through redux because I'm only talking about the local state, the values the user entered into their form inputs and so on and it makes more sense to me to use them and to manage them inside the container with react's state property.
  state = {
    controls: {
      // ContactData.js den aldik asagidaki kodu sonra duzeltik
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'mail address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  }

  checkValidity(value, rules) {
    let isValid = true; 
    // We can of course also implement both for double security but again, I like the approach up here by adding this empty validation object the most because it makes all the controls configured equally.
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
  }
    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      //  for that given control name and distribute all these properties so that I can then overwrite some of the properties
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value, 
          this.state.controls[controlName].validation),
        touched: true
      }
    }
    this.setState({controls: updatedControls});
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value
    )
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    const form = (
      formElementsArray.map(formElement => {
        return (
          <Input
            key={formElement.id} 
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            valueType={formElement.config.elementConfig.placeholder}
            changed={(e) => this.inputChangedHandler(e, formElement.id)}/>
        )
      })
    )
    return (
        // now we got a form with inputs and a button. To see it, we need to load it via routing, we got the auth container and we set up all our routes in the app.js file.
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button 
            btnType="Success">
            SUBMIT
          </Button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // With that, we can execute onAuth on our props in this container and I want to do this whenever the form is submitted.
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
}

export default connect(null, mapDispatchToProps) (Auth);