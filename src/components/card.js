import { useState } from "react";
import "./card.css";

function Card({ index, symbol, click }) {
  const [selected, setSelected] = useState(false);
  const [turnUp, setTurnUp] = useState(false);
  const [hide, setHide] = useState(false);
  const id = "card" + index;

  const handleClick = (e) => click(e.target, setSelected, setTurnUp, setHide);

  return (
    <div
      id={id}
      className={`card${selected ? " selected" : ""}${turnUp ? " turned" : ""}${hide ? " hide" : ""}`}
      onClick={handleClick}
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
