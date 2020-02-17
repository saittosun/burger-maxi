//jshint esversion: 6
//Now this allows us to simply use this layout component as a wrapper around the core content component we want to render to the screen.
import React from 'react';
import Aux from '../../hoc/_Aux';

//two solutions to that, do you remember them? Well for one, we could return an array here instead of JSX which is sitting next to each other, if we return an array and give each item a key, we are allowed to kind of return adjacent elements. The alternative is to create such an auxiliary higher order component. It serves only one purpose, wrapping something and immediately outputting it but hence fulfilling the requirement of having a wrapping component. we also have of course the third option of wrapping everything in a div here or another element but I don't need that div or any other element, actually I want to have adjacent elements, that is why I will go with the higher order component approach and create such a utility auxiliary component.
const layout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>{props.children}</main>
  </Aux>
);

export default layout;