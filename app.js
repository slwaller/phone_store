import React from "react";
import ReactDOM from "react-dom";

require("./app.css");
import Cart from './components/Cart'

class Inventory extends React.Component{
  render(){
    return (
      <div>
        <h1> Phones For Sale
          <ul>
            <li id="phone1">Phone 1</li>
            <li id="phone2">Phone 2</li>
            <li id="phone3">Phone 3</li>
            <li id="phone4">Phone 4</li>
            <li id="phone5">Phone 5</li>
          </ul>
        </h1>
      </div>
    );
  }
}



ReactDOM.render(<Inventory />, document.getElementById('phone-index'));