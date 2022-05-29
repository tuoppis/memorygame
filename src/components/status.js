import { useEffect } from "react";
import Options from "./options";

function Status({ score, bounty, pairs, report }) {
  return (
    <div id="game-status">
      <h1>Memory game</h1>
      <p>Match the pairs by clicking on cards.</p>
      <p>Score: {score}</p>
      <p>Reward: {bounty}</p>
      <p>Pairs: {pairs} (left)</p>
      <Options pairCount={pairs} report={report} />
    </div>
  );
}

export default Status;
