import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import Tutorial from "./components/Tutorial";
import Garage from "./components/Garage";
import PowerShop from "./components/PowerShop";
import TrackSelection from "./components/TrackSelection";
import RaceGame from "./components/RaceGame";
import { mockPlayer } from "./mock";

function App() {
  const [player, setPlayer] = useState(mockPlayer);
  const [gameState, setGameState] = useState("menu"); // menu, tutorial, garage, shop, tracks, race

  const updatePlayer = (updates) => {
    setPlayer(prev => ({ ...prev, ...updates }));
  };

  const renderCurrentScreen = () => {
    switch (gameState) {
      case "tutorial":
        return <Tutorial onComplete={() => {
          updatePlayer({ completedTutorial: true });
          setGameState("menu");
        }} />;
      case "garage":
        return <Garage player={player} onUpdatePlayer={updatePlayer} onBack={() => setGameState("menu")} />;
      case "shop":
        return <PowerShop player={player} onUpdatePlayer={updatePlayer} onBack={() => setGameState("menu")} />;
      case "tracks":
        return <TrackSelection player={player} onSelectTrack={() => setGameState("race")} onBack={() => setGameState("menu")} />;
      case "race":
        return <RaceGame player={player} onRaceEnd={() => setGameState("menu")} />;
      default:
        return <MainMenu 
          player={player} 
          onNavigate={setGameState}
          needsTutorial={!player.completedTutorial}
        />;
    }
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={renderCurrentScreen()} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;