// jshint esversion:6
import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from '../src/hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  // state = {
  //   show: true
  // }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({show: false})
  //   }, 5000);
  // }
  render() {
    return (
      <div className="App">
        <Layout>
          {/* {this.state.show && <BurgerBuilder />} */}
          {/* <BurgerBuilder />
          <Checkout/> */}
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
