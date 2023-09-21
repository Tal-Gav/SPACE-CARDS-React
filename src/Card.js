import React, { useState } from "react";
import "./Card.css";
import { useSpring, animated } from "@react-spring/web";

const Card = (props) => {
  const { image, onCardClick } = props;
  const [isFlipped, setIsFlipped] = useState(false);
  const cardBack = "./space/back-card.png";

  const { transform, opacity, resetOpacity } = useSpring({
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
    opacity: isFlipped ? 0 : 1,
    resetOpacity: isFlipped ? 1 : 0,
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
          position: "relative", // Use relative positioning for the square div
        }}
      >
        <div>
          <animated.img
            src={cardBack}
            alt="hi"
            className="card-picture center"
            style={{
              position: "absolute", // Use absolute positioning for the images
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity,
            }}
          />
          <animated.img
            src={`./space/${image}.png`}
            alt="hi"
            className="card-picture center invert"
            style={{
              position: "absolute", // Use absolute positioning for the images
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: resetOpacity,
            }}
          />
        </div>
      </animated.div>
    </div>
  );
};

export default Card;
