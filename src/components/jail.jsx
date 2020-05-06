import React, { Component } from "react";
import Piece from "./piece";

function Jail({ piecesJailed, color, onDrag }) {
  const renderPiecesJailed = () => {
    let jail = [];
    for (let i = 0; i < piecesJailed; i++) {
      jail.push(
        <Piece canDrag="true" color={color} onDrag={() => onDrag(0)} />
      );
    }
    return jail;
  };

  return (
    <div
      className="w-25 m-2 d-flex justify-content-center align-items-center"
      style={{ height: "30px", backgroundColor: "lightGray" }}
    >
      {renderPiecesJailed()}
    </div>
  );
}

export default Jail;
