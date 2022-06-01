import { useEffect, useState } from "react";
import Options from "./options";

function Status({ score, highScore, bounty, pairs, pairsLeft, message, report }) {
  const rating = Math.round((5 * (score - pairs)) / ((pairs * (pairs + 1)) / 2 - pairs)); //== (score - min score) * 5 / (max score - min score)
  const ratingStr = () => "☺".repeat(rating > 0 ? rating : 0); //+ "○".repeat(5 - rating);
  return (
    <div id="game-status" style={{ textAlign: "left", margin: "10px", width: "250px" }}>
      <h1>Memory Game</h1>
      <p>
        Score: {score}
        {highScore > 0 ? ` (best: ${highScore})` : ""}
      </p>
      <p>Reward: {bounty}</p>
      <p>Pairs: {pairsLeft} (left)</p>
      <p>Rating: {ratingStr()}</p>
      <Options pairCount={pairs} report={report} />
      <h4>{message}</h4>
    </div>
  );
}

export default Status;
