import React, { Component } from "react";
import firebase from "./firebase";
import NavBar from "./components/navbar";
import Dice from "./components/dice";
import Board from "./components/board";
import { PLAYER1, PLAYER2 } from "./components/constants";
import "./App.css";
import { render } from "@testing-library/react";

class Game extends Component {
  state = {
    playerPositions: {
      player1: [24, 24, 13, 13, 13, 13, 13, 6, 6, 6, 6, 6, 8, 8, 8],
      player2: [1, 1, 19, 19, 19, 19, 19, 17, 17, 17, 12, 12, 12, 12, 12],
      // player1: [1, 3, 4, 6, 6, 6, 6, 6, 8, 8, 8],
      // player2: [19, 19, 19, 19, 19, 17],
    },
    dieValues: [0, 0],
    dieValuesRemaining: [],
    turn: PLAYER1,
    piecesHome: {
      player1: 0,
      player2: 0,
    },
    piecesJailed: {
      player1: 1,
      player2: 0,
    },
    status: "",
    castingOff: {
      player1: false,
      player2: false,
    },
  };

  handleDieRoll = () => {
    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;
    this.state.castingOff[this.state.turn] &&
      this.handleCastingOff([roll1, roll2]);
    const dieValues = [roll1, roll2];
    if (roll1 === roll2) {
      dieValues.push(roll1, roll2);
    }
    this.setState({
      dieValues,
      dieValuesRemaining: dieValues,
      status: this.state.turn + "'s roll",
    });
    this.setState({});
  };

  handleCastingOff = (die) => {
    let numPiecesHome = this.state.piecesHome[this.state.turn];
    let playerPosition = [...this.state.playerPositions[this.state.turn]];
    die.map((die) => {
      const found = playerPosition.indexOf(
        this.state.turn === PLAYER1 ? die : 25 - die
      );
      if (found !== -1) {
        playerPosition.splice(found, 1);
        numPiecesHome++;
      }
    });
    const piecesHome = { ...this.state.piecesHome };
    const playerPositions = { ...this.state.playerPositions };
    playerPositions[this.state.turn] = playerPosition;
    piecesHome[this.state.turn] = numPiecesHome;
    this.setState({ playerPositions, piecesHome });
  };

  handleJailOpponentPiece = (index) => {
    console.log("handle jail opponent");
    const opponent = this.getOppositePlayer(this.state.turn);
    //add 1 to jailed pieces
    let piecesJailed = { ...this.state.piecesJailed };
    piecesJailed[opponent]++;

    let playerPositions = { ...this.state.playerPositions };
    playerPositions[opponent].splice(
      this.state.playerPositions[opponent].indexOf(index),
      1
    );

    const castingOff = { ...this.state.castingOff };
    castingOff[opponent] = false;

    this.setState({
      piecesJailed,
      playerPositions,
      castingOff,
    });
  };

  handlePieceMove = (index) => {
    const playerPosition = [...this.state.playerPositions[this.state.turn]];
    const ind = playerPosition.indexOf(this.state.oldPieceInd);
    if (ind === -1) {
      playerPosition.push(index);
      const piecesJailed = { ...this.state.piecesJailed };
      piecesJailed[this.state.turn]--;
      this.setState({ piecesJailed });
    } else {
      playerPosition[ind] = index;
    }
    const playerPositions = { ...this.state.playerPositions };
    playerPositions[this.state.turn] = playerPosition;
    this.setState({ playerPositions });

    //remove die value from die values remaining
    let dieValuesRemaining = [...this.state.dieValuesRemaining];
    const usedRoll = this.getDestinationForPlayer(index);
    const rollInd = dieValuesRemaining.indexOf(usedRoll);
    if (rollInd === -1) {
      dieValuesRemaining = [];
    } else {
      dieValuesRemaining.splice(rollInd, 1);
    }
    this.setState({ dieValuesRemaining });

    //handle casting off if necessary
    if (
      !this.state.playerPositions[this.state.turn].filter((point) =>
        this.isInHomeRangeForPlayer(point)
      ).length
    ) {
      const castingOff = { ...this.state.castingOff };
      castingOff[this.state.turn] = true;
      this.setState({ castingOff });
    }

    //handle if landing on a single opponent piece
    if (this.getNumOpponentPiecesOnPoint(index) === 1) {
      this.handleJailOpponentPiece(index);
    }
  };

  isInHomeRangeForPlayer = (point) => {
    return this.state.turn === PLAYER1 ? point > 6 : point < 19;
  };

  getOppositePlayer = (player) => {
    return player === PLAYER1 ? PLAYER2 : PLAYER1;
  };

  handleDrag = (index) => {
    this.setState({ oldPieceInd: index });
  };

  handleFinishTurnClick = () => {
    if (this.state.dieValues[0] === this.state.dieValues[1]) {
      this.setState({
        status: "doubles",
        dieValues: undefined,
      });
    } else {
      const turn = this.state.turn === PLAYER1 ? PLAYER2 : PLAYER1;
      const status = turn + "'s turn";
      const dieValues = undefined;
      this.setState({ turn, status, dieValues });
    }
    const itemRef = firebase.database().ref("test");
    const testItem = {
      test: 3,
    };
    itemRef.push(testItem);
  };

  getDestinationForPlayer = (newInd) => {
    const oldInd = this.state.oldPieceInd;
    if (oldInd === 0) return this.state.turn === PLAYER2 ? newInd : 25 - newInd;
    return this.state.turn === PLAYER1 ? oldInd - newInd : newInd - oldInd;
  };

  getNumOpponentPiecesOnPoint(index) {
    const player = this.getOppositePlayer(this.state.turn);
    return this.state.playerPositions[player].filter((piece) => piece === index)
      .length;
  }

  canMoveJailedPiece = (index) => {
    if (
      this.state.dieValuesRemaining.length === 0 ||
      this.getNumOpponentPiecesOnPoint(index) > 1
    )
      return false;
    return this.state.dieValuesRemaining.filter(
      (die) => die === this.getDestinationForPlayer(index)
    ).length;
  };

  canMovePiece = (index) => {
    if (this.state.oldPieceInd === 0) return this.canMoveJailedPiece(index);
    if (
      this.state.dieValuesRemaining.length === 0 ||
      this.state.castingOff[this.state.turn] ||
      this.state.piecesJailed[this.state.turn] ||
      this.getNumOpponentPiecesOnPoint(index) > 1
    )
      return false;
    return (
      this.state.dieValuesRemaining.filter(
        (die) => die === this.getDestinationForPlayer(index)
      ).length ||
      this.state.dieValuesRemaining.reduce(function (a, b) {
        return a + b;
      }) === this.getDestinationForPlayer(index)
    );
  };

  getDiceOrRollButton = () => {
    return this.state.dieValues ? (
      <Dice
        dieValues={this.state.dieValues}
        dieValuesRemaining={this.state.dieValuesRemaining}
      />
    ) : (
      <button className="btn btn-primary" onClick={this.handleDieRoll}>
        {this.state.status === "doubles" ? "Roll Again" : "Roll"}
      </button>
    );
  };

  render() {
    return (
      <React.Fragment>
        <NavBar turn={this.state.turn} />
        <main className="">
          <div className="d-flex">
            <button className="btn btn-primary m-2">Undo Move</button>
            <button
              className="btn btn-primary m-2"
              onClick={this.handleFinishTurnClick}
            >
              Finish Turn
            </button>
          </div>

          <Board
            playerPositions={this.state.playerPositions}
            onPieceMove={this.handlePieceMove}
            onDrag={this.handleDrag}
            canMovePiece={this.canMovePiece}
            piecesHome={this.state.piecesHome}
            piecesJailed={this.state.piecesJailed}
            player={this.state.turn}
          />
          {this.getDiceOrRollButton()}
          <h1>{this.state.turn}</h1>
        </main>
      </React.Fragment>
    );
  }
}

export default Game;
