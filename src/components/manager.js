import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context.js";
import Status from "./status";
import GameGrid from "./gamegrid";

const cardCols = (pairs, maxRows) => {
  const total = 2 * pairs;
  let col = Math.ceil(Math.sqrt(total));
  let row = Math.ceil(total / col);
  if (row > maxRows) {
    col += Math.ceil((total - maxRows * col) / maxRows);
  }
  return col;
};

function Manager() {
  const gameState = useContext(AppContext);
  const [pairs, setPairs] = useState(gameState.pairs);

  useEffect(() => gameState.register("pairs", setPairs), []);

  return (
    <div id="manager" style={{ display: "flex" }}>
      <Status />
      <GameGrid cardsInRow={cardCols(pairs, 6)} />
    </div>
  );
}

export default Manager;
