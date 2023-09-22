import React, { useState, useEffect, useRef } from "react";
import "./CardsGrid.css";
import Card from "./Card";

const CardsGrid = (props) => {
  const isCardMounted = useRef(false);
  const [selectedCards, setSelectedCards] = useState([undefined, undefined]);
  const [randomizedImages, setRandomizedImages] = useState([]);
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
    console.log(randomizedImages);
    return randomizedImages;
  };

  const setRandomCardImgs = () => {
    if (!isCardMounted.current) {
      setRandomizedImages(createRandomImages());
      isCardMounted.current = true;
    }
  };

  // TODO: Pass isFlipped to parent

  const failedMatch = (firstCardIndex, secondCardIndex) => {
    // flip back each cards

    setTimeout(() => {
      let currentFlippedCardsState = [...cardsFlippedStates];
      // setting the first one also in order to return
      currentFlippedCardsState[firstCardIndex] = false;
      currentFlippedCardsState[secondCardIndex] = false;

      setCardsFlippedStates(currentFlippedCardsState);
    }, 1000);
  };

  const compareCardImgs = () => {
    if (!selectedCards.includes(undefined)) {
      console.log("Selected Cards:", selectedCards);

      const [firstCardIndex, secondCardIndex] = selectedCards;

      if (
        randomizedImages[firstCardIndex] === randomizedImages[secondCardIndex]
      ) {
        console.log("Match! :)");
      } else {
        console.log("Not a match :(");
        failedMatch(firstCardIndex, secondCardIndex);
      }

      // reset the 2 current cards
      setTimeout(() => {
        setSelectedCards([undefined, undefined]);
      }, 1000);
    }
  };

  console.log(cardsFlippedStates, selectedCards);
  useEffect(() => {
    setRandomCardImgs();
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
          />
        </div>
      ))}
      <button
        style={{ height: "100px" }}
        onClick={() => setRandomizedImages(createRandomImages())}
      >
        Regenerate Cards
      </button>
    </div>
  );
};
export default CardsGrid;
