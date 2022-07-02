import { useState, useContext, useEffect, useMemo } from "react";
import { AppContext } from "../context.js";
import { CardInfo } from "../model/gamestate.js";
import "./card.css";

function Card({ index, symbol }) {
  const gameState = useContext(AppContext);
  const [selected, setSelected] = useState(false);
  const [turnUp, setTurnUp] = useState(false);
  const [hide, setHide] = useState(false);
  const info = useMemo(() => new CardInfo(index, symbol, setTurnUp, setHide, setSelected), [index, symbol]);

  return (
    <div
      id={"card" + index}
      className={`card${selected ? " selected" : ""}${turnUp ? " turned" : ""}${hide ? " hide" : ""}`}
      onClick={() => gameState.click(info)}
      data-index={index}
      data-symbol={symbol}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={`${process.env.PUBLIC_URL}/images/img_${symbol}_color.svg`} alt={`“symbol ${symbol}}”`} />
        </div>
        <div className="card-back">
          <img src={`${process.env.PUBLIC_URL}/images/img_back.svg`} alt="Back of the Card" />
        </div>
      </div>
    </div>
  );
}

export default Card;
