import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import Tutorial from "./components/Tutorial";
import Garage from "./components/Garage";
import PowerShop from "./components/PowerShop";
import TrackSelection from "./components/TrackSelection";
import RaceGame from "./components/RaceGame";
import { GameData } from "./mock";

function App() {
  const [player, setPlayer] = useState(GameData.load());
  const [gameState, setGameState] = useState("menu"); // menu, tutorial, garage, shop, tracks, race
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [gameMode, setGameMode] = useState("solo");

  // Salva automaticamente quando player muda
  useEffect(() => {
    GameData.save(player);
  }, [player]);

  const updatePlayer = (updates) => {
    setPlayer(prev => {
      const newPlayer = { ...prev, ...updates };
      GameData.save(newPlayer);
      return newPlayer;
    });
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
        return <TrackSelection 
          player={player} 
          onSelectTrack={(track, mode) => {
            setSelectedTrack(track);
            setGameMode(mode);
            setGameState("race");
          }} 
          onBack={() => setGameState("menu")} 
        />;
      case "race":
        return <RaceGame 
          player={player} 
          track={selectedTrack}
          gameMode={gameMode}
          onRaceEnd={(coinsEarned = 0, newBestTime = null) => {
            let updates = {};
            if (coinsEarned > 0) {
              updates.coins = player.coins + coinsEarned;
              updates.totalRaces = (player.totalRaces || 0) + 1;
            }
            if (newBestTime && selectedTrack) {
              updates.bestTimes = { ...player.bestTimes, [selectedTrack.id]: newBestTime };
            }
            if (Object.keys(updates).length > 0) {
              updatePlayer(updates);
            }
            setGameState("menu");
          }} 
        />;
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