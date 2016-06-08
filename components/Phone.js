import React from 'react'
import autobind from 'autobind-decorator'

@autobind
class Phone extends React.Component {
  _addToCart(){
    console.log(this)
    // this.setState({
    // });
    this.props.addToCartList(this.props.dude);
  }

  clickPhone() {
    console.log(this.props.dude.name)
  }

  render() {
    return (
      <p>
        <li onClick={this.clickPhone}>{ this.props.dude.name }</li>
        <button onClick={this._addToCart}>Buy</button>
      </p>
    )
  }
}

module.exports = Phone