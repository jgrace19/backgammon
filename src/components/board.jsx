import React, { Component } from "react";
import BoardRow from "./boardRow";
import Jail from "./jail";
import { PLAYER1, PLAYER2 } from "./constants";
import Home from "./home";

class Board extends Component {
  render() {
    const {
      piecesHome,
      playerPositions,
      onPieceMove,
      onDrag,
      canMovePiece,
      player,
      piecesJailed,
      canMoveJailedPiece,
    } = this.props;

    return (
      <div className="d-flex flex-column">
        <Jail
          piecesJailed={piecesJailed[PLAYER2]}
          color="black"
          canMoveJailedPiece={canMoveJailedPiece}
          onDrag={onDrag}
        />
        <div className="d-flex">
          <Home
            player1Pieces={piecesHome[PLAYER1]}
            player2Pieces={piecesHome[PLAYER2]}
          />

          <div>
            <BoardRow
              row={2}
              playerPositions={playerPositions}
              onPieceMove={onPieceMove}
              onDrag={onDrag}
              canMovePiece={canMovePiece}
              player={player}
            />
            <BoardRow
              row={1}
              playerPositions={playerPositions}
              onPieceMove={onPieceMove}
              onDrag={onDrag}
              canMovePiece={canMovePiece}
              player={player}
            />
          </div>

          <Home />
        </div>
        <Jail
          piecesJailed={piecesJailed[PLAYER1]}
          color="white"
          canMoveJailedPiece={canMoveJailedPiece}
          onDrag={onDrag}
        />
      </div>
    );
  }
}

export default Board;
