import { useEffect, useState } from "react";
import Options from "./options";

const sqrtScale = (score, pairs) => {
  const val = Math.sqrt((2 * (score - pairs)) / (pairs * (pairs - 1)));
  return val > 0 ? 5 * val : 0;
};

const linScale = (score, pairs) => (score > pairs ? (10 * (score - pairs)) / (pairs * (pairs - 1)) : 0);

function Status({ score, highScore, bounty, pairs, pairsLeft, message, report }) {
  const rating = Math.ceil(linScale(score, pairs));

  return (
    <div id="game-status" style={{ textAlign: "left", margin: "10px", width: "250px" }}>
      <h1>Memory Game</h1>
      <p>
        Score: {score}
        {highScore > 0 ? ` (best: ${highScore})` : ""}
      </p>
      <p>Reward: {bounty}</p>
      <p>Pairs: {pairsLeft} (left)</p>
      <p>Rating: {"☺".repeat(rating)}</p>
      <Options pairCount={pairs} report={report} />
      <h4>{message}</h4>
    </div>
  );
}

export default Status;
