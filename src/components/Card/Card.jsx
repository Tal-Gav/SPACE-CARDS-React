import React, { useState, useEffect } from "react";
import { Tilt } from "react-tilt";
import "./Card.css";
import { useSpring, animated } from "@react-spring/web";
import cardBack from "../../assets/space/back-card.png";
const Card = (props) => {
  const {
    index,
    image,
    onCardClick,
    cardsFlippedStates,
    setCardsFlippedStates,
    selectedCards,
    isCardDisabled,
  } = props;

  const { transform, opacity, resetOpacity } = useSpring({
    transform: `perspective(600px) rotateY(${
      cardsFlippedStates[index] ? 180 : 0
    }deg)`,
    opacity: cardsFlippedStates[index] ? 0 : 1,
    resetOpacity: cardsFlippedStates[index] ? 1 : 0,
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
    if (!isCardDisabled) {
      onCardClick(index);
      // make the flip animation, by changing the flipstate of the current card index in the cards_flipped_states array,
      // then it renders the componenet accordingly (returns the specific card layout)

      let currentFlippedCardsState = [...cardsFlippedStates];
      currentFlippedCardsState[index] = !currentFlippedCardsState[index];

      setCardsFlippedStates(currentFlippedCardsState);
    }
  };

  return (
    <Tilt options={defaultOptions}>
      <div
        onClick={handleCardClick}
        className={!selectedCards.includes(undefined) ? "disable-div" : ""}
      >
        <animated.div
          className={
            isCardDisabled ? "square matched-card" : "square card-default shiny"
          }
          style={{
            transform,
            position: "relative", // Use relative positioning for the square div
          }}
        >
          <div>
            {!cardsFlippedStates[index] ? (
              <img
                draggable="false"
                src={cardBack}
                alt="cardBackImg"
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
            ) : (
              <img
                draggable="false"
                src={`./src/assets/space/${image}.png`}
                alt="cardImg"
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
            )}
          </div>
        </animated.div>
      </div>
    </Tilt>
  );
};

export default Card;
