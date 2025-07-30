import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Play, Settings, ShoppingCart, Car, Trophy, Coins, RotateCcw } from "lucide-react";
import { GameData } from "../mock";

const MainMenu = ({ player, onNavigate, needsTutorial }) => {
  const handleStartRace = () => {
    if (needsTutorial) {
      onNavigate("tutorial");
    } else {
      onNavigate("tracks");
    }
  };

  const handleResetGame = () => {
    if (window.confirm("Tem certeza que deseja resetar todos os dados do jogo? Esta ação não pode ser desfeita.")) {
      const resetData = GameData.reset();
      window.location.reload(); // Reload to apply reset
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Logo/Title */}
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Kart
          </span>
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Rush
          </span>
        </h1>
        <p className="text-xl text-gray-300">O jogo de corrida mais radical!</p>
      </div>

      {/* Player Info */}
      <Card className="mb-8 bg-black/30 border-yellow-400/30">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="flex items-center gap-2 text-yellow-400">
            <Coins className="w-5 h-5" />
            <span className="font-bold">{player.coins}</span>
          </div>
          <div className="text-white">
            <span>Nível {player.level}</span>
          </div>
          <div className="text-green-400">
            <span>{player.name}</span>
          </div>
          <div className="text-gray-400 text-sm">
            <span>Corridas: {player.totalRaces || 0}</span>
          </div>
        </CardContent>
      </Card>

      {/* Menu Buttons */}
      <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
        <Button
          onClick={handleStartRace}
          className="h-24 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200"
        >
          <Play className="w-8 h-8 mr-3" />
          {needsTutorial ? "Tutorial" : "Corrida"}
        </Button>

        <Button
          onClick={() => onNavigate("garage")}
          className="h-24 text-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
        >
          <Car className="w-8 h-8 mr-3" />
          Garagem
        </Button>

        <Button
          onClick={() => onNavigate("shop")}
          className="h-24 text-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
        >
          <ShoppingCart className="w-8 h-8 mr-3" />
          Loja
        </Button>

        <Button
          onClick={() => onNavigate("tracks")}
          disabled={needsTutorial}
          className="h-24 text-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trophy className="w-8 h-8 mr-3" />
          Pistas
        </Button>
      </div>

      {/* Reset Button */}
      <div className="mt-6">
        <Button
          onClick={handleResetGame}
          variant="outline"
          className="border-red-400 text-red-400 hover:bg-red-400/20"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Resetar Jogo
        </Button>
      </div>

      {needsTutorial && (
        <Card className="mt-6 bg-yellow-500/20 border-yellow-400/50">
          <CardContent className="p-4 text-center">
            <p className="text-yellow-200">
              Complete o tutorial antes de acessar outras funcionalidades!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MainMenu;