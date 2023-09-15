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

  // Create a ref to track component mount status
  const isMounted = useRef(false);

  // Use state to store randomizedImages
  const [randomizedImages, setRandomizedImages] = useState([]);

  useEffect(() => {
    if (!isMounted.current) {
      // Component is mounting
      setRandomizedImages(createRandomImages());
      isMounted.current = true; // Set the isMounted ref to true after the initial render
    }
  }, []); // The empty dependency array ensures it runs only once

  return (
    <div className="container">
      {randomizedImages.map((image, index) => (
        <div key={index}>
          <Card image={image} />
        </div>
      ))}
      <button
        style={{ height: "100px" }}
        onClick={() => setRandomizedImages(createRandomImages())}
      >
        {" "}
        Regenerate Cards
      </button>
    </div>
  );
}
