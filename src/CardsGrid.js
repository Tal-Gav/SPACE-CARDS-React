import React, { useState, useEffect, useRef } from "react";
import "./CardsGrid.css";
import Card from "./Card";

const CardsGrid = (props) => {
  const isCardMounted = useRef(false);
  const [selectedCards, setSelectedCards] = useState([undefined, undefined]);
  const [randomizedImages, setRandomizedImages] = useState([]);
  const [cardsFlippedState, setCardsFlippedState] = useState(
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
        setTimeout(() => {
          let temp = [...cardsFlippedState];
          temp[firstCardIndex] = false;
          setCardsFlippedState(temp);
        }, 1000);

        setTimeout(() => {
          let temp = [...cardsFlippedState];
          temp[firstCardIndex] = false;
          temp[secondCardIndex] = false;
          setCardsFlippedState(temp);
        }, 1000);
      }

      setTimeout(() => {
        setSelectedCards([undefined, undefined]);
      }, 1000);
    }
  };
  console.log(cardsFlippedState, selectedCards);
  useEffect(() => {
    setRandomCardImgs();
    compareCardImgs();
  }, [selectedCards]);

  const handleCardClick = (index) => {
    let temp = [...selectedCards];
    temp[temp[0] === undefined ? 0 : 1] = index;
    setSelectedCards(temp);
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
            cardsFlippedState={cardsFlippedState}
            setCardsFlippedState={setCardsFlippedState}
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
