import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "./CardsGrid.css";
import Card from "../Card/Card";
import medalImg from "../../assets/space/medal.png";
import spaceCardsImg from "../../assets/space/space-favicon.png";
import { restartGame } from "../../utils/utils";

const CardsGrid = () => {
  const isCardMounted = useRef(false);
  const [selectedCards, setSelectedCards] = useState([undefined, undefined]);
  const [randomizedImages, setRandomizedImages] = useState([]);
  const [disabledCards, setDisabledCards] = useState([]);
  const [cardsFlippedStates, setCardsFlippedStates] = useState(
    Array.from({ length: 18 }, () => false)
  );

  const getRandomImage = (cardImages) => {
    const keysArray = Object.keys(cardImages);
    const randomKey = keysArray[Math.floor(Math.random() * keysArray.length)];

    return randomKey;
  };

  const createRandomImages = () => {
    let cardImages = {
      cyan: 0,
      earth: 0,
      green: 0,
      magma: 0,
      marble: 0,
      pink: 0,
      red: 0,
      saturn: 0,
      sun: 0,
    };

    let randomizedImages = [];

    while (randomizedImages.length < 18) {
      const randomImage = getRandomImage(cardImages);

      if (cardImages[randomImage] < 2) {
        randomizedImages.push(randomImage);
        cardImages[randomImage]++;
      }
    }
    return randomizedImages;
  };

  const showStartAlert = () => {
    Swal.fire({
      title: "Space Cards",
      html: `<img src=${spaceCardsImg} alt="spaceCardsImg" style="max-width: 20%;" /><br/>The goal is to find all the pairs.<br/>Good Luck!`,
      confirmButtonText: "Let's Go",
      allowOutsideClick: false,
      customClass: {
        popup: "swal-custom-style", // Define a custom CSS class for the alert
      },
    });
  };

  const showVictoryAlert = () => {
    Swal.fire({
      title: "You Won!",
      html: `<img src=${medalImg} alt="Victory Image" style="max-width: 20%;" />`,
      confirmButtonText: "New Game",
      allowOutsideClick: false,
      customClass: {
        popup: "swal-custom-style", // Define a custom CSS class for the alert
      },
    }).then(() => restartGame());
  };

  const resetCards = (firstCardIndex, secondCardIndex) => {
    // flip back each cards
    setTimeout(() => {
      let currentFlippedCardsState = [...cardsFlippedStates];
      // setting the first one also in order to return
      currentFlippedCardsState[firstCardIndex] = false;
      currentFlippedCardsState[secondCardIndex] = false;

      setCardsFlippedStates(currentFlippedCardsState);
    }, 1000);
  };
  const disableMatchedCards = (firstCardIndex, secondCardIndex) => {
    // Mark the matched cards as disabled in the cardsFlippedStates array
    setDisabledCards([...disabledCards, firstCardIndex, secondCardIndex]);
  };

  const isAllCardsMatched = () => {
    return cardsFlippedStates.every((card) => card === true);
  };

  const compareCardImgs = () => {
    if (!selectedCards.includes(undefined)) {
      const [firstCardIndex, secondCardIndex] = selectedCards;

      if (
        randomizedImages[firstCardIndex] ===
          randomizedImages[secondCardIndex] &&
        firstCardIndex !== secondCardIndex
      ) {
        disableMatchedCards(firstCardIndex, secondCardIndex);

        if (isAllCardsMatched()) {
          showVictoryAlert();
        }
      } else {
        resetCards(firstCardIndex, secondCardIndex);
      }
      // reset the 2 current cards
      setTimeout(() => {
        setSelectedCards([undefined, undefined]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!isCardMounted.current) {
      showStartAlert();
      setRandomizedImages(createRandomImages());
      isCardMounted.current = true;
    }
    compareCardImgs();
  }, [selectedCards]);

  const handleCardClick = (index) => {
    // fill the undefined array -> [undefined, undefined] -> if the first ([0]) is undefined, than replace it with the image_index. and then,
    // if it's not undefined, replace the second ([1]) with image_index. that's how we fill the array with 2 image_indexes
    let currentSelectedCards = [...selectedCards];

    currentSelectedCards[currentSelectedCards[0] === undefined ? 0 : 1] = index;
    setSelectedCards(currentSelectedCards);
  };

  return (
    <div className="container">
      {randomizedImages.map((image, index) => (
        <div key={index}>
          <Card
            index={index}
            image={image}
            onCardClick={handleCardClick}
            selectedCards={selectedCards}
            cardsFlippedStates={cardsFlippedStates}
            setCardsFlippedStates={setCardsFlippedStates}
            isCardDisabled={disabledCards.includes(index)}
          />
        </div>
      ))}
    </div>
  );
};
export default CardsGrid;
