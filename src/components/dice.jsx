import React, { Component } from "react";

class Dice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: [
        "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/dice-six-faces-one.svg",
        "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/dice-six-faces-two.svg",
        "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/dice-six-faces-three.svg",
        "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/dice-six-faces-four.svg",
        "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/dice-six-faces-five.svg",
        "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/dice-six-faces-six.svg",
      ],
    };
  }

  render() {
    const { dieValues } = this.props;

    return (
      <div>
        <img
          className="m-2"
          alt="die"
          width="10%"
          src={this.state.dice[dieValues[0] - 1]}
          style={this.getDieStyle(dieValues[0])}
        />
        <img
          className="m-2"
          alt="die"
          width="10%"
          src={this.state.dice[dieValues[1] - 1]}
          style={this.getDieStyle(dieValues[1])}
        />
      </div>
    );
  }

  getDieStyle = (dieValue) => {
    const dieOverlays = [...this.props.dieValuesRemaining];
    const found = dieOverlays.indexOf(dieValue);
    if (found === -1) {
      return { filter: "grayscale(1)", opacity: "0.5" };
    }
  };
}

export default Dice;
