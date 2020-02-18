// jshint esversion: 6
import React from 'react';

import classes from './Modal.css';

const modal = (props) => (
  //props.children really can be anything, can be our own components, can be some text, a paragraph, that is totally up to us how we use the modal and we can pass anything in there.
  <div 
    className={classes.Modal}
    style={{
      transform: props.show ? 'translateY(0)' : 'translateY(-100vh)', 
      opacity: props.show ? '1' : '0'
    }}>
    {props.children}
  </div>
)

export default modal;