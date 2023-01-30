import React, { Component } from "react";

class Input extends Component {
  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>
          {this.props.children}
          <input
            type={this.props.type}
            name={this.props.id}
            value={this.props.value}
            onChange={this.props.onChange}
          ></input>
        </label>
      </div>
    );
  }
}

export default Input;
