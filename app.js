import React from "react";
import ReactDOM from "react-dom";

require("./app.css");

import Cart from './components/Cart'
import Inventory from './components/Inventory'
import Phone from './components/Phone'

let thing = {
  phones: [
    { id: 1, name: "Sam's Busted Phone"},
    { id: 2, name: "Nick's Beast"},
    { id: 3, name: "Brian's Busted Ass Phone"}
  ]
}

let thong = {
  cartlist: []
}

class App extends React.Component {
  render() {
    return (
      // React renders should only return 1 element
      <div>
        <Inventory phones={thing.phones}/>
        <Cart list ={thong.cartlist}/>
        <Phone />
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('phone-index'));