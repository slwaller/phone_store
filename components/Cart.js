import React from 'react'

import Phone from './Phone'
import autobind from 'autobind-decorator'

@autobind

class Cart extends React.Component{
  render(){
    console.log(this.props.list)
    return (
      <div>
        <h1> Your Cart!</h1>
        <ul>
          {this.props.list.map( (phone) =>
            <li key={phone.id}>{phone.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

module.exports = Cart