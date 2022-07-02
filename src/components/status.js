import { useEffect, useContext, useState } from "react";
import { AppContext } from "../context.js";
import Options from "./options";

function Status() {
  const gameState = useContext(AppContext);
  //const [pairs, setPairs] = useState(gameState.pairs);
  const [pairsLeft, setPairsLeft] = useState(gameState.pairsLeft);
  const [score, setScore] = useState(gameState.score);
  const [highScore, setHighScore] = useState(gameState.highScore);
  const [bounty, setBounty] = useState(gameState.bounty);
  const [message, setMessage] = useState(gameState.message);
  const [rating, setRating] = useState(gameState.rating);
  //const [guesses, setGuesses] = useState(gameState.guesses);

  useEffect(() => {
    //gameState.register("pairs", setPairs);
    gameState.register("pairsLeft", setPairsLeft);
    gameState.register("score", setScore);
    gameState.register("highScore", setHighScore);
    gameState.register("rating", setRating);
    gameState.register("bounty", setBounty);
    gameState.register("message", setMessage);
    //gameState.register("guesses", setGuesses);
  }, []);

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
      <Options />
      <h4>{message}</h4>
    </div>
  );
}

export default Status;
