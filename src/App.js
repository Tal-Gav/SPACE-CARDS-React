import "./App.css";
import GameTitle from "./GameTitle";
import CardsGrid from "./CardsGrid";

function App() {
  const spaceBackground = "./space/background-space.jpg";

  const arrOfObj = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];

  return (
    <div className="App">
      <div className="content"></div>
      <GameTitle />
      <div className="cards-grid-container">
        <CardsGrid arrOfObj={arrOfObj} />
      </div>
      <div
        className="space-background"
        style={{ backgroundImage: `url(${spaceBackground})` }}
      ></div>
    </div>
  );
}

export default App;
