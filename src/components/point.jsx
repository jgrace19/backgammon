import React, { Component } from "react";
import Piece from "./piece";
import ItemTypes from "./ItemTypes";
import { useDrop } from "react-dnd";

function Point({
  index,
  playerPositions,
  onPieceMove,
  onDrag,
  canMovePiece,
  player,
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.PIECE,
    canDrop: () => canMovePiece(index),
    drop: () => onPieceMove(index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const handleClick = () => {
    console.log(index);
  };

  const getAlignItems = (idx) => {
    let classes = "m-2 d-flex flex-column align-items-center";
    return idx > 12 ? classes : classes + " justify-content-end";
  };

  const getPointStyle = (idx) => {
    let pointStyle = { width: 50, height: 200 };
    if (idx % 2 === 0) {
      pointStyle["backgroundColor"] = "grey";
    } else {
      pointStyle["backgroundColor"] = "red";
    }
    if (!isOver && canDrop) {
      pointStyle["backgroundColor"] = "yellow";
    }
    if (isOver && canDrop) {
      pointStyle["backgroundColor"] = "green";
    }
    return pointStyle;
  };

  return (
    <div
      ref={drop}
      onClick={() => handleClick()}
      className={getAlignItems(index)}
      style={getPointStyle(index)}
    >
      {playerPositions.player1
        .filter((piece) => piece === index)
        .map((piece) => {
          return (
            <Piece
              onDrag={() => onDrag(index)}
              color="white"
              canDrag={player === "player1"}
            />
          );
        })}

      {playerPositions.player2
        .filter((piece) => piece === index)
        .map((piece) => {
          return (
            <Piece
              onDrag={() => onDrag(index)}
              color="black"
              canDrag={player === "player2"}
            />
          );
        })}
    </div>
  );
}

export default Point;
