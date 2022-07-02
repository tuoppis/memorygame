import { useState } from "react";
import { AppContext } from "./context.js";
import "./App.css";
import Manager from "./components/manager";
import GameState from "./model/gamestate.js";

function App() {
  const [gameState] = useState(new GameState(10));
  return (
    <div className="App">
      <AppContext.Provider value={gameState}>
        <Manager />
      </AppContext.Provider>
    </div>
  );
}

export default App;
