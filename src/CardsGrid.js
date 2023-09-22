import React, { useState, useEffect, useRef } from "react";
import "./CardsGrid.css";
import Card from "./Card";

const CardsGrid = (props) => {
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

  const isCardMounted = useRef(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [randomizedImages, setRandomizedImages] = useState([]);

  const setRandomCardImgs = () => {
    if (!isCardMounted.current) {
      setRandomizedImages(createRandomImages());
      isCardMounted.current = true;
    }
  };

  // TODO: Pass isFlipped to parent

  const [isMatched, setIsMatched] = useState();

  const compareCardImgs = () => {
    if (selectedCards.length === 2) {
      const [firstCardImg, secondCardImg] = selectedCards;
      console.log("Selected Cards:", selectedCards);

      if (firstCardImg === secondCardImg) {
        console.log("Match! :)");
        setIsMatched(true);
      } else {
        console.log("Not a match :(");
        setIsMatched(false);
      }
      setSelectedCards([]);

      // Add this line to reset isMatched to undefined after the compare
      setTimeout(() => {
        setIsMatched(undefined);
      }, 1000); // Adjust the delay time (in milliseconds) as needed
    }
  };

  useEffect(() => {
    setRandomCardImgs();
    compareCardImgs();
  }, [selectedCards]);
  const handleCardClick = (image) => {
    setSelectedCards((prevSelectedCards) => [...prevSelectedCards, image]);
  };

  return (
    <div className="container">
      {randomizedImages.map((image, index) => (
        <div key={index}>
          <Card
            key={index}
            image={image}
            onCardClick={handleCardClick}
            isMatched={isMatched}
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
