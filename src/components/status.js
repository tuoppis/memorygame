import { useEffect, useState } from "react";
import Options from "./options";

function Status({ score, highScore, bounty, pairs, pairsLeft, message, report }) {
  return (
    <div id="game-status" style={{ textAlign: "left", margin: "10px" }}>
      <h1>Memory Game</h1>
      <h4>{message}</h4>
      <p>
        Score: {score}
        {highScore > 0 ? ` (best: ${highScore})` : ""}
      </p>
      <p>Reward: {bounty}</p>
      <p>Pairs: {pairsLeft} (left)</p>
      <Options pairCount={pairs} report={report} />
    </div>
  );
}

export default Status;
