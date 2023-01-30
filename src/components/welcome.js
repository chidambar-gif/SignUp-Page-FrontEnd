import React, { Component } from "react";

class Welcome extends Component {
  render() {
    return (
      <div>
        <h1>Hero is {this.props.heroname}</h1>
      </div>
    );
  }
}

export default Welcome;
