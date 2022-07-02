import { useState, useEffect } from "react";
import { AppContext } from "./context.js";
import "./App.css";
import GameGrid from "./components/gamegrid.js";
import Status from "./components/status.js";
import GameState from "./model/gamestate.js";

const cardCols = (pairs, maxRows) => {
  const total = 2 * pairs;
  let col = Math.ceil(Math.sqrt(total));
  let row = Math.ceil(total / col);
  if (row > maxRows) {
    col += Math.ceil((total - maxRows * col) / maxRows);
  }
  return col;
};

function App() {
  const [gameState] = useState(new GameState(10));
  const [pairs, setPairs] = useState(gameState.pairs);

  useEffect(() => gameState.register("pairs", setPairs), [gameState]);

  return (
    <div className="App" style={{ display: "flex" }}>
      <AppContext.Provider value={gameState}>
        <Status />
        <GameGrid cardsInRow={cardCols(pairs, 6)} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
