import React, { useState, useEffect } from "react";
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
    config: { mass: 5, tension: 500, friction: 50 },
  });

  const handleCardClick = () => {
    onCardClick(image);
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    console.log(isFlipped); // Log the updated state
  }, [isFlipped]);

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
