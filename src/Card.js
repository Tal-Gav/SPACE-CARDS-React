import React, { useState } from "react";
import "./Card.css";
import { useSpring, animated } from "@react-spring/web";

const Card = (props) => {
  const { image, onCardClick } = props;
  const cardBack = "./space/back-card.png";
  const [isFlipped, setIsFlipped] = useState(false);

  const { transform } = useSpring({
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
  });

  const { opacity } = useSpring({
    opacity: isFlipped ? 0 : 1,
    config: { duration: 250 }, // Adjust the duration (in milliseconds) as needed
  });

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    onCardClick(image);
  };

  return (
    <div onClick={handleCardClick}>
      <animated.div
        className={`square shiny`}
        style={{
          transform,
        }}
      >
        <div className={`card ${isFlipped ? "flipped" : ""}`}>
          <animated.img
            src={isFlipped ? `./space/${image}.png` : cardBack}
            alt="hi"
            className="card-picture center"
            style={{
              opacity,
            }}
          />
        </div>
      </animated.div>
    </div>
  );
};

export default Card;
