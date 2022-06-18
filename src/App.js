import { useContext, useReducer } from "react";
import { AppContext } from "./context.js";
import "./App.css";
import Manager from "./components/manager";

const gameReducer = (state, value) => {
  const bountyLimit = (val) => Math.min(state.pairsLeft, Math.max(1, val));
  const selectCards = (...cards) => {
    state.selected.forEach((card) => {
      card.selected(false);
      card.turned(false);
    });
    state.selected = cards;
  };
  const clearSelected = () => {};
  const match = () => {
    const cardA = state.selected[0];
    const cardB = state.selected[1];
  };

  if ("add" in value) {
    state.score += value.add.score ?? 0;
    state.bounty = bountyLimit(state.bounty + (value.add.bounty ?? 0));
    state.pairsLeft += value.add.pairsLeft ?? 0;
    state.guesses += value.add.guesses ?? 0;
  }
  if ("set" in value) {
    state.message = value.set.message ?? state.guesses;
    state.gameState = value.set.gameState ?? state.gameState;
  }
  if ("reset" in value) {
    state.score = 0;
    state.guesses = 0;
    state.bounty = state.pairs = value.reset;
    state.pairsLeft = state.pairs;
    state.message = "Start playing by clicking on the cards!";
    state.gameState = "start";
    for (const idx in state.cardsClicked) {
      const card = state.cardsClicked[idx];
      if (!card) continue;
      card.selected(false);
      card.hidden(false);
      card.turned(false);
      state.cardsClicked[idx] = undefined;
    }
  }
  if ("clicked" in value) {
    const card = value.clicked;
    state.cardsClicked[card.index] = card;
    switch (state.selected.length) {
      case 0:
        selectCards(card);
        break;
      case 1:
        if (state.selected[0].index === card.index) clearSelected();
        else {
          selectCards(state.selected[0], card);
          match();
        }
        break;
      default:
        if (card.index !== state.selected[0] && card.index !== state.selected[1]) {
          clearSelected();
          selectCards(card);
        } else {
          clearSelected();
        }
    }
  }

  return state; // does not change ref.
};

function App() {
  const [gameStats, dispatch] = useReducer(gameReducer, {});
  return (
    <div className="App">
      <AppContext.Provider value={[gameStats, dispatch]}>
        <Manager />
      </AppContext.Provider>
    </div>
  );
}

export default App;
