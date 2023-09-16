import React, { useState } from "react";
import "./Card.css";

const Card = (props) => {
  const { image, onCardClick } = props;
  let cardBack = "./space/back-card.png";
  const [src, setSrc] = useState(cardBack);

  const handleCardClick = () => {
    setSrc(`./space/${image}.png`);
    onCardClick(image);
  };

  return (
    <div className="square shiny" onClick={handleCardClick}>
      <img src={src} alt="hi" className="card-picture center"></img>
    </div>
  );
};

export default Card;
