import React, { Component } from "react";

class Button extends Component {
  render() {
    return <button type={this.props.type}> {this.props.children} </button>;
  }
}

export default Button;
