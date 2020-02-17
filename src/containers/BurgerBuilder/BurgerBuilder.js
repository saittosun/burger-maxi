// jshint esversion: 6
import React, { Component } from "react";

import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/_Aux';

class BurgerBuilder extends Component {
  render() {
    return (
      <Aux>
        <Burger />
        <div>Build Controls</div>
      </Aux>
    )
  }
}

export default BurgerBuilder;