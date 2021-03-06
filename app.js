import React from "react";
import ReactDOM from "react-dom";

require("./app.css");

import Cart from './components/Cart'
import Inventory from './components/Inventory'
import autobind from 'autobind-decorator'



  let thing = {
    phones: [
      { id: 1, name: "Sam's Busted Phone"},
      { id: 2, name: "Nick's Beast"},
      { id: 3, name: "Brian's Busted Ass Phone"}
    ]
  }
@autobind

class App extends React.Component {

  constructor() {
    super();
    this.state = { cartlist: [] }
  }

  updateCartList(cartlist) {
    this.setState({ cartlist: cartlist })
  }

  addToCartList(phone) {
    var list = this.state.cartlist
    list.push(phone)
    this.updateCartList(list);
  }

  // componentDidMount(){
  //   this.setState({
  //     cartlist: "TEST"
  //   })
  // }

  render() {
    return (
      // React renders should only return 1 element
      <div>
        <Inventory phones={thing.phones} addToCartList={this.addToCartList}/>
        <Cart list ={this.state.cartlist}/>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('phone-index'));