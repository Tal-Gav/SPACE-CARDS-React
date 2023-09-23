import React, { useState, useEffect, useRef } from "react";
import "./CardsGrid.css";
import Card from "./Card";
import VictoryAlert from './VictoryAlert'

const CardsGrid = (props) => {
  const isCardMounted = useRef(false);
  const [selectedCards, setSelectedCards] = useState([undefined, undefined]);
  const [randomizedImages, setRandomizedImages] = useState([]);
  const [disabledCards, setDisabledCards] = useState([]);
  const [cardsFlippedStates, setCardsFlippedStates] = useState(
    Array.from({ length: 18 }, () => false)
  );
  const [showVictoryAlert, setShowVictoryAlert] = useState(false);


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
    let check = cardsFlippedStates.every(card => card === true);
    console.log('check', check, cardsFlippedStates)
    return check
  }

  const compareCardImgs = () => {
    if (!selectedCards.includes(undefined)) {
      console.log("Selected Cards:", selectedCards);

      const [firstCardIndex, secondCardIndex] = selectedCards;

      if (
        randomizedImages[firstCardIndex] === randomizedImages[secondCardIndex] && firstCardIndex !== secondCardIndex
      ) {
        console.log("Match! :)");
        disableMatchedCards(firstCardIndex, secondCardIndex)

        if (isAllCardsMatched()) {
          console.log('game finished')
          setShowVictoryAlert(true)
        }

      } else {
        console.log("Not a match :(");
        resetCards(firstCardIndex, secondCardIndex);
      }
      console.log(cardsFlippedStates)


      // reset the 2 current cards
      setTimeout(() => {
        setSelectedCards([undefined, undefined]);
      }, 1000);
    }
  };

  useEffect(() => {
    console.log(selectedCards);

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

  const restartGame = () => {
    window.location.reload(false);
  }
  
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
      {showVictoryAlert ? <VictoryAlert restartGame={restartGame} /> : ''}
    </div>
  );
};
export default CardsGrid;
