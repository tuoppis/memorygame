import "./gamegrid.css";
import { useState, useEffect } from "react";
import Card from "./card";

const shuffle = (array) => {
  for (let i = 0; i < array.length; i++) {
    const p = Math.floor((array.length - i) * Math.random()) + i;
    [array[i], array[p]] = [array[p], array[i]];
  }
  return array;
};

const symbolTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

function GameGrid({ cardCount, cardsInRow, gameState, click, ready }) {
  const [cards, setCards] = useState([]);
  const createCard = (index, symbol, symbols) => (
    <Card key={`card${index}`} index={index} symbol={symbols[symbol]} click={click} />
  );
  const repopulate = () => {
    const symbols = shuffle([...symbolTable]);
    const cardOrder = [];
    for (let i = 0; i < cardCount; i++) cardOrder.push(i);
    shuffle(cardOrder);
    setCards(cardOrder.map((symIdx, deckIdx) => createCard(deckIdx, symIdx >> 1, symbols)));
    ready();
  };

  useEffect(() => document.getElementById("grid").style.setProperty("--cards-in-row", cardsInRow), [cardsInRow]);
  useEffect(() => repopulate(), [cardCount]);
  useEffect(() => {
    if (gameState === "start") repopulate();
  }, [gameState]);

  return (
    <div id="grid" className="game-grid">
      {cards}
    </div>
  );
}

export default GameGrid;
