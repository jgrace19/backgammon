import React, { Component } from "react";
import { useDrag, getDropResult } from "react-dnd";
import ItemTypes from "./ItemTypes";

function Piece({ onDrag, canDrag, color }) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.PIECE },
    begin: onDrag,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={canDrag ? drag : undefined}
      className="m-1"
      style={{
        width: 20,
        height: 20,
        backgroundColor: color,
        cursor: "move",
      }}
    />
  );
}

export default Piece;
