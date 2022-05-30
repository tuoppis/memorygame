import { useState } from "react";

function Options({ pairCount, report }) {
  const [pairs, setPairs] = useState(pairCount);

  const handleValue = (e) => {
    const val = Number(e.target.value);
    if (val < 2) return setPairs(2);
    if (val > 36) return setPairs(36);
    setPairs(val || 10);
  };

  return (
    <div id="options">
      <label>
        Pairs:
        <br />
        <input type="nunber" value={pairs} onChange={handleValue} />
      </label>
      <button onClick={() => report({ pairs })}>New Game?</button>
    </div>
  );
}

export default Options;
