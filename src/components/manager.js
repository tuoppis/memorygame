import { useState } from "react";
import Status from "./status";
import GameGrid from "./gamegrid";

function Manager() {
  const [selection, setSelection] = useState([]);
  const [allCards, setAllCards] = useState({});
  const [score, setScore] = useState(0);
  const [bounty, setBounty] = useState(0);
  const [pairs, setPairs] = useState(12);
  const [pairsLeft, setPairsLeft] = useState(12);
  const [maxRows, setMaxRows] = useState(6);
  const [guesses, setGuesses] = useState(0);
  const [gameState, setGameState] = useState("play");
  const [message, setMessage] = useState("Start playing by clicking on the cards!");

  //const hideCard = (card) => card.trg.classList.add("hide");
  const bountyLimit = (b) => Math.max(Math.min(b, pairsLeft - 1), 5);
  const match = (cardA, cardB) => {
    setGuesses(guesses + 1);
    cardA.turn(true);
    cardB.turn(true);
    console.log(cardA, cardB);
    if (cardA.symbol === cardB.symbol) {
      setScore(score + bounty);
      setPairsLeft(pairsLeft - 1);
      setBounty(bountyLimit(bounty + 1));
      cardA.hide(true);
      cardB.hide(true);
      if (pairsLeft === 1) {
        setMessage("You won the game!");
        setGameState("ended");
      } else {
        setMessage("You found a pair!");
      }
    } else {
      setMessage("Try again!");
      setBounty(bountyLimit(bounty - 1));
    }
  };

  const makeSelection = (...cards) => {
    selection.splice(0, selection.length);
    selection.push(...cards);
    //    setSelection(cards);
    console.log(cards);
    cards.forEach((x) => x.select(true));
  };

  const clearSelection = () => {
    selection.forEach((card) => {
      card.select(false);
      card.turn(false);
    });
    selection.splice(0, selection.length);
    //setSelection([]);
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
    //turn(true);
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
    // const cards = document.getElementById("grid").children;
    // for (const elem of cards) elem.classList.remove("selected", "turned", "hide");
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
    setScore(0);
    setBounty(pairCount);
    setPairsLeft(pairCount);
    setMessage("Start playing by clicking on the cards!");
    setGameState("start");
  };

  return (
    <div id="manager" style={{ display: "flex" }}>
      <Status score={score} bounty={bounty} message={message} pairs={pairsLeft} report={accept} />
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
