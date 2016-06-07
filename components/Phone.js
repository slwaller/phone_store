import React from 'react'

class Phone extends React.Component {
  _addToCart(){
    console.log('click')
  }

  clickPhone() {
    console.log(this.props.dude.name)
  }

  render() {
    console.log(this.props.dude)
    return (
      <p>
        <li onClick={this.clickPhone.bind(this)}>{ this.props.dude.name }</li>
        <button onClick={this._addToCart}>Buy</button>
      </p>
    )
  }
}

module.exports = Phone