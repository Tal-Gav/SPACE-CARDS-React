import "./App.css";
import GameTitle from "./GameTitle";
import CardsGrid from "./CardsGrid";

function App() {
  const spaceBackground = "./space/background-space.jpg";

  return (
    <div className="App">
      <div className="content"></div>
      <GameTitle />
      <div className="cards-grid-container">
        <CardsGrid />
      </div>
      <div
        className="space-background"
        style={{ backgroundImage: `url(${spaceBackground})` }}
      ></div>
    </div>
  );
}

export default App;
