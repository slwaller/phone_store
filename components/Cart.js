import React from 'react'

class Cart extends React.Component{

  render(){
    return (
      <div>
        <h1> Your Cart!</h1>
        <li>{this.cartlist}</li>
      </div>
    );
  }
}

module.exports = Cart