import { useState } from "react";

function Options({ pairCount, report }) {
  const [pairs, setPairs] = useState(pairCount);

  return (
    <div id="options">
      <label>
        Pairs:
        <input type="nunber" value={pairs} onChange={(e) => setPairs(Number(e.target.value))} />
      </label>
      <button onClick={() => report({ pairs })}>New Game?</button>
    </div>
  );
}

export default Options;
