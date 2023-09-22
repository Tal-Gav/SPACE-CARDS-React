import React, { useState, useEffect } from "react";
import { Tilt } from "react-tilt";
import "./Card.css";
import { useSpring, animated } from "@react-spring/web";

const Card = (props) => {
  const { image, onCardClick, isMatched } = props;
  const [isFlipped, setIsFlipped] = useState(false);
  const cardBack = "./space/back-card.png";

  const { transform, opacity, resetOpacity } = useSpring({
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
    opacity: isFlipped ? 0 : 1,
    resetOpacity: isFlipped ? 1 : 0,
    config: { mass: 5, tension: 500, friction: 50 },
  });

  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  const handleCardClick = () => {
    onCardClick(image);
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    console.log("isMatched", isMatched);

    if (isMatched === false) {
      // If the card was just flipped back (unflipped), add a delay before flipping it
      setTimeout(() => {
        setIsFlipped(false);
        console.log("flipping it back");
      }, 1000); // Adjust the delay time (in milliseconds) as needed
    }
    // Log the updated state
  }, [isFlipped, isMatched]);

  return (
    <Tilt options={defaultOptions}>
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
                position: "absolute",
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
                position: "absolute",
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
    </Tilt>
  );
};

export default Card;
