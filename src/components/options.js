import { useState, useContext, useCallback } from "react";
import { AppContext } from "../context.js";

function OptionButton({ title, value, callback }) {
  return (
    <button onClick={() => callback(value)}>
      <b>{title}</b>
      <br />
      {value}
    </button>
  );
}

function Options() {
  const gameState = useContext(AppContext);
  const [pairs, setPairs] = useState(10);
  const handleButton = useCallback(
    (value) => {
      setPairs(value);
      gameState.reset(value);
    },
    [gameState]
  );
  const handleValue = useCallback(
    (e) => setPairs(Math.max(6, Math.min(gameState.symbolCount, Number(e.target.value))) || 10),
    [gameState]
  );

  return (
    <div className="options-area" id="options">
      <label>
        Pairs: <input type="number" value={pairs} onChange={handleValue} />
      </label>
      <OptionButton title="Custom" value={pairs} callback={handleButton} />
      <OptionButton title="Small" value={6} callback={handleButton} />
      <OptionButton title="Medium" value={10} callback={handleButton} />
      <OptionButton title="Large" value={15} callback={handleButton} />
      <OptionButton title="Extra" value={21} callback={handleButton} />
      <OptionButton title="Super" value={27} callback={handleButton} />
      <OptionButton title="Mega" value={36} callback={handleButton} />
    </div>
  );
}

export default Options;
