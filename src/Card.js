import React, { useState } from "react";
import "./Card.css";

const Card = (props) => {
  const { image } = props;
  let cardBack = "./space/back-card.png";

  const [src, setSrc] = useState(cardBack);

  const handleCardClick = () => {
    console.log("clicked", image);
    setSrc(`./space/${image}.png`);
  };

  return (
    <div className="square shiny" onClick={handleCardClick}>
      <img src={src} alt="hi" className="card-picture center"></img>
    </div>
  );
};

export default Card;
