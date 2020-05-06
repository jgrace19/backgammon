import React, { Component } from "react";
import Point from "./point";

class BoardRow extends Component {
  state = {
    points: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  };
  constructor(props) {
    super(props);
    const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.state = { points: this.props.row === 2 ? points.reverse() : points };
  }

  render() {
    const {
      row,
      playerPositions,
      onDrag,
      canMovePiece,
      onPieceMove,
    } = this.props;

    return (
      <div className="d-flex">
        {this.state.points.map((point) => (
          <Point
            key={point}
            index={point + (row === 2 ? 12 : 0)}
            playerPositions={playerPositions}
            onPieceMove={onPieceMove}
            onDrag={onDrag}
            canMovePiece={canMovePiece}
            player={this.props.player}
          ></Point>
        ))}
      </div>
    );
  }
}

export default BoardRow;
