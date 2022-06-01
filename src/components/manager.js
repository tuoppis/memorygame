import { useState } from "react";
import Status from "./status";
import GameGrid from "./gamegrid";

function Manager() {
  const [selection, setSelection] = useState([]);
  const [allCards, setAllCards] = useState({});
  const [gameStat, setGameStat] = useState({ score: 0, bounty: 10, guesses: 0, pairsLeft: 10, highScore: 0 });
  const [score, setScore] = useState(0);
  const [bounty, setBounty] = useState(10);
  const [pairs, setPairs] = useState(10);
  const [pairsLeft, setPairsLeft] = useState(10);
  const [maxRows, setMaxRows] = useState(6);
  const [guesses, setGuesses] = useState(0);
  const [gameState, setGameState] = useState("play");
  const [message, setMessage] = useState("Start playing by clicking on the cards!");

  const bountyLimit = (b) => Math.max(Math.min(b, gameStat.pairsLeft), 1);
  const match = (cardA, cardB) => {
    setGuesses(++gameStat.guesses);
    cardA.turn(true);
    cardB.turn(true);
    if (cardA.symbol === cardB.symbol) {
      cardA.hide(true);
      cardB.hide(true);
      gameStat.score += gameStat.bounty;
      setScore(gameStat.score);
      setPairsLeft(--gameStat.pairsLeft);
      gameStat.bounty = bountyLimit(gameStat.bounty + 1);
      if (gameStat.pairsLeft === 0) {
        if (gameStat.score > gameStat.highScore) {
          setMessage("A new high score! Conrats!");
          gameStat.highScore = gameStat.score;
        } else {
          setMessage("You won the game!");
        }
        setGameState("ended");
      } else {
        setMessage("You found a pair!");
      }
    } else {
      setMessage("No luck! Try again!");
      gameStat.bounty = bountyLimit(gameStat.bounty - 1);
    }
    setBounty(gameStat.bounty);
  };

  const makeSelection = (...cards) => {
    selection.splice(0, selection.length);
    selection.push(...cards);
    cards.forEach((x) => x.select(true));
  };

  const clearSelection = () => {
    selection.forEach((card) => {
      card.select(false);
      card.turn(false);
    });
    selection.splice(0, selection.length);
  };

  const cardCols = (pairs) => {
    const total = 2 * pairs;
    let col = Math.ceil(Math.sqrt(total));
    let row = Math.ceil(total / col);
    if (row > maxRows) {
      col += Math.ceil((total - maxRows * col) / maxRows);
    }
    return col;
  };

  const handleClick = (trg, select, turn, hide) => {
    const current = { trg, symbol: trg.dataset.symbol, index: trg.dataset.index, select, turn, hide };
    allCards[current.index] = current;
    switch (selection.length) {
      case 0:
        return makeSelection(current);
      case 1: // match pairs
        if (selection[0].index === current.index) return clearSelection();
        else {
          makeSelection(selection[0], current);
          return match(current, selection[0]);
        }
      default:
        if (current.index !== selection[0].index && current.index !== selection[0].index) {
          clearSelection();
          makeSelection(current);
        } else clearSelection();
    }
  };

  const cardsReady = () => {
    for (const key in allCards) {
      const val = allCards[key];
      if (typeof val === "undefined") continue;
      val.select(false);
      val.turn(false);
      val.hide(false);
      allCards[key] = undefined;
    }
    setGameState("play");
  };

  const accept = ({ pairs: pairCount }) => {
    setPairs(pairCount);
    setScore((gameStat.score = 0));
    setBounty((gameStat.bounty = pairCount));
    setPairsLeft((gameStat.pairsLeft = pairCount));
    setGuesses((gameStat.guesses = 0));
    setMessage("Start playing by clicking on the cards!");
    setGameState("start");
  };

  return (
    <div id="manager" style={{ display: "flex" }}>
      <Status
        score={score}
        highScore={gameStat.highScore}
        bounty={bounty}
        message={message}
        pairsLeft={pairsLeft}
        pairs={pairs}
        report={accept}
      />
      <GameGrid
        cardCount={2 * pairs}
        cardsInRow={cardCols(pairs)}
        ready={cardsReady}
        click={handleClick}
        gameState={gameState}
      />
    </div>
  );
}

export default Manager;
