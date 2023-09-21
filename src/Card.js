import React, { useState } from "react";
import "./Card.css";

const Card = (props) => {
  const { image, onCardClick } = props;
  const cardBack = "./space/back-card.png";
  const [isFlipped, setIsFlipped] = useState(false); // Local state for each card

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    onCardClick(image);
  };

  return (
    <div
      className={`square shiny card-flip ${isFlipped ? "flipped" : ""}`}
      onClick={handleCardClick}
    >
      <img
        src={isFlipped ? `./space/${image}.png` : cardBack}
        alt="hi"
        className="card-picture center"
      />
    </div>
  );
};

export default Card;
