//jshint esversion: 6
import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' active>Burger Builder</NavigationItem>
    <NavigationItem link='/'>CheckOut</NavigationItem>
  </ul>
)

export default navigationItems;