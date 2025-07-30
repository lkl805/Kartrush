import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Lock, Trophy, Star, MapPin } from "lucide-react";
import { mockTracks } from "../mock";

const TrackSelection = ({ player, onSelectTrack, onBack }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [gameMode, setGameMode] = useState("solo"); // solo or multiplayer

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy": return "text-green-400";
      case "medium": return "text-yellow-400";
      case "hard": return "text-orange-400";
      case "expert": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getThemeIcon = (theme) => {
    switch (theme) {
      case "city": return "🏙️";
      case "forest": return "🌲";
      case "desert": return "🏜️";
      case "space": return "🚀";
      default: return "🏁";
    }
  };

  const handleStartRace = () => {
    if (selectedTrack) {
      console.log(`Iniciando corrida offline: ${selectedTrack.name} - Modo: ${gameMode}`);
      onSelectTrack(selectedTrack, gameMode);
    }
  };

  const isTrackUnlocked = (trackId) => {
    return (player.unlockedTracks || []).includes(trackId);
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-white">Seleção de Pista</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Track List */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockTracks.map((track) => (
              <Card 
                key={track.id}
                className={`cursor-pointer transition-all duration-200 ${
                  !track.unlocked
                    ? "bg-gray-800/50 border-gray-600 opacity-60"
                    : selectedTrack?.id === track.id
                    ? "bg-blue-500/30 border-blue-400 ring-2 ring-blue-400"
                    : "bg-black/30 border-gray-600 hover:border-gray-400"
                }`}
                onClick={() => track.unlocked && setSelectedTrack(track)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <span className="text-2xl">{getThemeIcon(track.theme)}</span>
                      {track.name}
                    </CardTitle>
                    {!track.unlocked && <Lock className="w-5 h-5 text-gray-400" />}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {/* Track Preview Image */}
                  <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                    <img 
                      src={track.preview} 
                      alt={track.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Track Info */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Dificuldade:</span>
                      <span className={`font-bold capitalize ${getDifficultyColor(track.difficulty)}`}>
                        {track.difficulty === "easy" && "Fácil"}
                        {track.difficulty === "medium" && "Médio"}
                        {track.difficulty === "hard" && "Difícil"}
                        {track.difficulty === "expert" && "Expert"}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Atalhos:</span>
                      <span className="text-yellow-400">{track.shortcuts}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Melhor tempo:</span>
                      <span className="text-green-400">
                        {track.bestTime || "---"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Obstacles */}
                  <div>
                    <p className="text-gray-300 text-sm mb-1">Obstáculos:</p>
                    <div className="flex flex-wrap gap-1">
                      {track.obstacles.map((obstacle, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded"
                        >
                          {obstacle.replace("_", " ")}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Race Configuration */}
        <div className="space-y-6">
          {/* Selected Track Info */}
          <Card className="bg-black/30 border-purple-400/50">
            <CardHeader>
              <CardTitle className="text-white">Pista Selecionada</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTrack ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{getThemeIcon(selectedTrack.theme)}</div>
                    <h3 className="text-xl font-bold text-white">{selectedTrack.name}</h3>
                    <p className={`text-sm ${getDifficultyColor(selectedTrack.difficulty)}`}>
                      {selectedTrack.difficulty === "easy" && "Fácil"}
                      {selectedTrack.difficulty === "medium" && "Médio"}
                      {selectedTrack.difficulty === "hard" && "Difícil"}
                      {selectedTrack.difficulty === "expert" && "Expert"}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">
                        {selectedTrack.obstacles.length} obstáculos
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300 text-sm">
                        {selectedTrack.shortcuts} atalhos
                      </span>
                    </div>
                    {selectedTrack.bestTime && (
                      <div className="flex items-center justify-between">
                        <Trophy className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm">
                          {selectedTrack.bestTime}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Selecione uma pista para começar</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Game Mode Selection */}
          <Card className="bg-black/30 border-green-400/50">
            <CardHeader>
              <CardTitle className="text-white">Modo de Jogo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => setGameMode("solo")}
                variant={gameMode === "solo" ? "default" : "outline"}
                className={`w-full justify-start ${
                  gameMode === "solo" 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "border-gray-600 text-white hover:bg-gray-700"
                }`}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Solo (Contra IA)
              </Button>
              
              <Button
                onClick={() => setGameMode("multiplayer")}
                variant={gameMode === "multiplayer" ? "default" : "outline"}
                className={`w-full justify-start ${
                  gameMode === "multiplayer"
                    ? "bg-green-600 hover:bg-green-700"
                    : "border-gray-600 text-white hover:bg-gray-700"
                }`}
              >
                <Star className="w-4 h-4 mr-2" />
                Local (2 Jogadores)
              </Button>
            </CardContent>
          </Card>

          {/* Start Race Button */}
          <Button
            onClick={handleStartRace}
            disabled={!selectedTrack}
            className="w-full h-16 text-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selectedTrack ? "🏁 Iniciar Corrida!" : "Selecione uma pista"}
          </Button>

          {/* Race Tips */}
          <Card className="bg-yellow-500/10 border-yellow-400/50">
            <CardContent className="p-4">
              <h4 className="text-yellow-400 font-bold mb-2">💡 Dicas de Corrida:</h4>
              <ul className="text-yellow-200 text-sm space-y-1">
                <li>• Use as setas para controlar seu kart</li>
                <li>• Colete poderes espalhados pela pista</li>
                <li>• Procure por atalhos secretos</li>
                <li>• No modo 2 jogadores: P1 usa setas, P2 usa WASD</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackSelection;