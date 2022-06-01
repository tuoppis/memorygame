import { useState } from "react";

function Options({ pairCount, report }) {
  const [pairs, setPairs] = useState(pairCount);

  const handleValue = (e) => {
    const val = Number(e.target.value);
    if (val < 6) return setPairs(6);
    if (val > 36) return setPairs(36);
    setPairs(val || 10);
  };

  return (
    <div className="options-area" id="options">
      <label>
        Pairs: <input type="number" value={pairs} onChange={handleValue} />
      </label>

      <button onClick={() => report({ pairs })}>
        <b>New</b>
        <br />
        {pairs}
      </button>
      <button
        onClick={() => {
          setPairs(6);
          report({ pairs: 6 });
        }}
      >
        <b>Small</b>
        <br />6
      </button>
      <button
        onClick={() => {
          setPairs(10);
          report({ pairs: 10 });
        }}
      >
        <b>Medium</b>
        <br />
        10
      </button>
      <button
        onClick={() => {
          setPairs(15);
          report({ pairs: 15 });
        }}
      >
        <b>Large</b>
        <br />
        15
      </button>
      <button
        onClick={() => {
          setPairs(21);
          report({ pairs: 21 });
        }}
      >
        <b>Extra</b>
        <br />
        21
      </button>
      <button
        onClick={() => {
          setPairs(27);
          report({ pairs: 27 });
        }}
      >
        <b>Super</b>
        <br />
        27
      </button>
      <button
        onClick={() => {
          setPairs(36);
          report({ pairs: 36 });
        }}
      >
        <b>Mega</b>
        <br />
        36
      </button>
    </div>
  );
}

export default Options;
