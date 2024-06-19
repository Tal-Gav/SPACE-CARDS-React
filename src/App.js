import "./App.css";
import GameTitle from "./GameTitle";
import CardsGrid from "./CardsGrid";

function App() {
  const spaceBackground = "./space/background-space.jpg";

  return (
    <div className="App">
      <div
        className="space-background"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          overflow: "hidden",
          backgroundImage: `url(${spaceBackground})`,
          backgroundSize: "cover",
        }}
      ></div>
      <div className="wrapper">
        <div className="content"></div>
        <GameTitle />
        <div className="cards-grid-container">
          <CardsGrid />
        </div>
      </div>
    </div>
  );
}

export default App;
