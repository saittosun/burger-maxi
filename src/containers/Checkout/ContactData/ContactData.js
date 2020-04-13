// jshint esversion: 6
import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }
  render() {
    return (
      <div className={classes.ContactData}>
        <h4>enter your contact data</h4>
        <form>
          <input type="text" name="name" placeholder="Your name"/>
          <input type="email" name="email" placeholder="Your email"/>
          <input type="text" name="street" placeholder="Your street"/>
          <input type="text" name="postal" placeholder="Your postal"/>
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    )
  }
}

export default ContactData;