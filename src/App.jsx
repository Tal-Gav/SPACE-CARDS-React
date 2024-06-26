import "./App.css";
import GameTitle from "./components/GameTitle/GameTitle";
import CardsGrid from "./components/CardsGrid/CardsGrid";
import spaceBackground from "./assets/background-space.jpg";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { isScreenPortrait } from "./utils/utils";
import { Box, Typography } from "@mui/material";

const App = () => {
  const [isPortarit, setIsPortrait] = useState(isScreenPortrait());

  useEffect(() => {
    const handleOrientationChange = (e) => {
      const portrait = e.matches;
      setIsPortrait(portrait);
    };

    const mediaQuery = window.matchMedia("(orientation: portrait)");
    mediaQuery.addEventListener("change", handleOrientationChange);

    // Cleanup listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleOrientationChange);
    };
  }, []);

  return (
    <>
      <Box p={1} pb={3}>
        {isPortarit && (
          <Backdrop
            sx={{
              color: "#fff",
              backgroundColor: "fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={true}
          >
            <Box
              p={1}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              display={"flex"}
              gap={5}
            >
              <Typography fontSize={"1.8em"}>Rotate for game time. </Typography>
              <div className="phone" />
            </Box>
          </Backdrop>
        )}

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
      </Box>
    </>
  );
};

export default App;
