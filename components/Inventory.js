import React from 'react'

import Phone from './Phone'
import autobind from 'autobind-decorator'

@autobind
class Inventory extends React.Component {
  renderPhone(phone) {
    console.log(phone);
    return (
      <Phone key={phone.name} dude={phone} addToCartList={this.props.addToCartList}/>
    )
  }

  render(){
    return (
      <div>
        <h1> Phones For Sale</h1>
        <ul>
          {this.props.phones.map(this.renderPhone)}
        </ul>
      </div>
    );
  }
}

module.exports = Inventory