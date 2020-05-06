import React, { Component } from "react";
import Piece from "./piece";

class Home extends Component {
  state = {};
  render() {
    const { player1Pieces, player2Pieces } = this.props;
    return (
      <div
        className="d-flex justify-content-start m-2"
        style={{ width: 75, backgroundColor: "lightGray" }}
      >
        <div className="d-flex align-items-end justify-content-between">
          {renderPieces(player1Pieces, "white")}
        </div>
        <div className="d-flex align-items-start justify-content-between">
          {renderPieces(player2Pieces, "black")}
        </div>
      </div>
    );
  }
}

const renderPieces = (numPieces, color) => {
  let pieces = [];
  for (let i = 0; i < numPieces; i++) {
    pieces.push(<Piece color={color} />);
  }
  return <div>{pieces}</div>;
};

export default Home;
