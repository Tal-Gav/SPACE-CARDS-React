import React, { useState, useEffect, useRef } from "react";
import "./CardsGrid.css";
import Card from "./Card";

export default function CardsGrid(props) {
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

  const compareCardImgs = () => {
    if (selectedCards.length === 2) {
      const [firstCardImg, secondCardImg] = selectedCards;
      console.log("Selected Cards:", selectedCards);

      if (firstCardImg === secondCardImg) {
        console.log("Match! :)");
      } else {
        console.log("Not a match :(");
      }
      setSelectedCards([]);
    }
  };

  useEffect(() => {
    console.log(selectedCards);
    setRandomCardImgs();
    compareCardImgs();
  }, [selectedCards]); // The empty dependency array ensures it runs only once

  const handleCardClick = (image) => {
    setSelectedCards((prevSelectedCards) => [...prevSelectedCards, image]);
  };

  return (
    <div className="container">
      {randomizedImages.map((image, index) => (
        <div key={index}>
          <Card image={image} onCardClick={handleCardClick} />
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
}
