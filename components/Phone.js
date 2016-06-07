import React from 'react'

class Phone extends React.Component {
  clickPhone() {
    console.log(this.props.dude.name)
  }

  render() {
    console.log(this.props.dude)
    return (
      <li onClick={this.clickPhone.bind(this)}>{ this.props.dude.name }</li>  
    )
  }
}

module.exports = Phone