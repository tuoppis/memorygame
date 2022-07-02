import "./gamegrid.css";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context.js";
import Card from "./card";

const shuffle = (array) => {
  for (let i = 0; i < array.length; i++) {
    const p = Math.floor((array.length - i) * Math.random()) + i;
    [array[i], array[p]] = [array[p], array[i]];
  }
  return array;
};

const createCard = (index, symbol, symbols) => <Card key={`card${index}`} index={index} symbol={symbols[symbol]} />;

const repopulate = (gameState, setCards) => {
  const symbols = shuffle(gameState.symbols);
  const cards = [];
  for (let i = 0; i < gameState.pairs; i++) cards.push(i, i);
  shuffle(cards);
  setCards(cards.map((symIdx, deckIdx) => createCard(deckIdx, symIdx, symbols)));
  gameState.cardsReady();
};

function GameGrid({ cardsInRow }) {
  const gameState = useContext(AppContext);
  const [cards, setCards] = useState([]);
  const [pairs, setPairs] = useState(gameState.pairs);
  const [mode, setMode] = useState(gameState.mode);

  useEffect(() => {
    gameState.register("pairs", setPairs);
    gameState.register("mode", setMode);
  }, [gameState]);

  useEffect(() => document.getElementById("grid").style.setProperty("--cards-in-row", cardsInRow), [cardsInRow]);
  useEffect(() => repopulate(gameState, setCards), [pairs, gameState]);
  useEffect(() => {
    if (mode === "start") repopulate(gameState, setCards);
  }, [mode, gameState]);

  return (
    <div id="grid" className="game-grid">
      {cards}
    </div>
  );
}

export default GameGrid;
