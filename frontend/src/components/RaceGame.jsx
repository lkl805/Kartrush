import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Pause, Play } from "lucide-react";

const RaceGame = ({ player, track, gameMode, onRaceEnd }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [gameState, setGameState] = useState("racing"); // racing, paused, finished
  const [raceData, setRaceData] = useState({
    position: 1,
    lap: 1,
    totalLaps: 3,
    time: 0,
    speed: 0,
    startTime: Date.now()
  });
  
  // Game objects
  const [player1, setPlayer1] = useState({
    x: 100,
    y: 300,
    rotation: 0,
    speed: 0,
    maxSpeed: 5,
    acceleration: 0.2,
    friction: 0.05,
    vx: 0,
    vy: 0
  });

  const [player2, setPlayer2] = useState({
    x: 100,
    y: 350,
    rotation: 0,
    speed: 0,
    maxSpeed: 5,
    acceleration: 0.2,
    friction: 0.05,
    vx: 0,
    vy: 0
  });

  const [keys, setKeys] = useState({});
  const [powerUps, setPowerUps] = useState([]);

  // Initialize game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 1200;
    canvas.height = 600;

    // Generate power-ups
    const initialPowerUps = [];
    for (let i = 0; i < 10; i++) {
      initialPowerUps.push({
        x: Math.random() * (canvas.width - 100) + 50,
        y: Math.random() * (canvas.height - 100) + 50,
        type: ["missile", "shield", "turbo", "oil"][Math.floor(Math.random() * 4)],
        collected: false
      });
    }
    setPowerUps(initialPowerUps);

    gameLoop();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: true }));
    };

    const handleKeyUp = (e) => {
      setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game physics
  const updatePlayer = (playerState, isPlayer1) => {
    const newState = { ...playerState };
    
    // Player 1 controls (Arrow keys)
    if (isPlayer1) {
      if (keys.arrowup) newState.speed = Math.min(newState.speed + newState.acceleration, newState.maxSpeed);
      if (keys.arrowdown) newState.speed = Math.max(newState.speed - newState.acceleration, -newState.maxSpeed / 2);
      if (keys.arrowleft && Math.abs(newState.speed) > 0) newState.rotation -= 3 * (newState.speed / newState.maxSpeed);
      if (keys.arrowright && Math.abs(newState.speed) > 0) newState.rotation += 3 * (newState.speed / newState.maxSpeed);
    } 
    // Player 2 controls (WASD)
    else {
      if (keys.w) newState.speed = Math.min(newState.speed + newState.acceleration, newState.maxSpeed);
      if (keys.s) newState.speed = Math.max(newState.speed - newState.acceleration, -newState.maxSpeed / 2);
      if (keys.a && Math.abs(newState.speed) > 0) newState.rotation -= 3 * (newState.speed / newState.maxSpeed);
      if (keys.d && Math.abs(newState.speed) > 0) newState.rotation += 3 * (newState.speed / newState.maxSpeed);
    }

    // Apply friction
    newState.speed *= (1 - newState.friction);

    // Convert rotation to velocity
    const radians = (newState.rotation * Math.PI) / 180;
    newState.vx = Math.cos(radians) * newState.speed;
    newState.vy = Math.sin(radians) * newState.speed;

    // Update position
    newState.x += newState.vx;
    newState.y += newState.vy;

    // Boundary checking
    const canvas = canvasRef.current;
    if (!canvas) return newState;

    newState.x = Math.max(20, Math.min(canvas.width - 20, newState.x));
    newState.y = Math.max(20, Math.min(canvas.height - 20, newState.y));

    return newState;
  };

  // Game loop
  const gameLoop = () => {
    if (gameState !== "racing") return;

    setPlayer1(prev => updatePlayer(prev, true));
    setPlayer2(prev => updatePlayer(prev, false));
    
    setRaceData(prev => ({
      ...prev,
      time: prev.time + 1/60,
      speed: Math.abs(player1.speed * 20) // Convert to km/h approximation
    }));

    draw();
    animationRef.current = requestAnimationFrame(gameLoop);
  };

  // Render game
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw track background
    drawTrack(ctx, canvas);

    // Draw power-ups
    powerUps.forEach(powerUp => {
      if (!powerUp.collected) {
        drawPowerUp(ctx, powerUp);
      }
    });

    // Draw players
    drawKart(ctx, player1, "#FF6B6B", "P1");
    drawKart(ctx, player2, "#4ECDC4", "P2");

    // Draw UI
    drawUI(ctx, canvas);
  };

  const drawTrack = (ctx, canvas) => {
    // Simple oval track
    ctx.fillStyle = "#2D5A27";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Track
    ctx.fillStyle = "#444";
    ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Track lines
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Center divider
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 50);
    ctx.lineTo(canvas.width / 2, canvas.height - 50);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const drawKart = (ctx, kart, color, label) => {
    ctx.save();
    ctx.translate(kart.x, kart.y);
    ctx.rotate((kart.rotation * Math.PI) / 180);

    // Kart body
    ctx.fillStyle = color;
    ctx.fillRect(-15, -10, 30, 20);

    // Kart wheels
    ctx.fillStyle = "#333";
    ctx.fillRect(-12, -12, 6, 4);
    ctx.fillRect(-12, 8, 6, 4);
    ctx.fillRect(6, -12, 6, 4);
    ctx.fillRect(6, 8, 6, 4);

    // Player label
    ctx.fillStyle = "#FFF";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(label, 0, -20);

    ctx.restore();
  };

  const drawPowerUp = (ctx, powerUp) => {
    const powerUpColors = {
      missile: "#FF4444",
      shield: "#44FF44", 
      turbo: "#FFFF44",
      oil: "#444444"
    };

    ctx.fillStyle = powerUpColors[powerUp.type] || "#888";
    ctx.beginPath();
    ctx.arc(powerUp.x, powerUp.y, 8, 0, Math.PI * 2);
    ctx.fill();

    // Power-up icon
    ctx.fillStyle = "#FFF";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    const icons = { missile: "🚀", shield: "🛡️", turbo: "⚡", oil: "🛢️" };
    ctx.fillText(icons[powerUp.type] || "?", powerUp.x, powerUp.y + 4);
  };

  const drawUI = (ctx, canvas) => {
    // Semi-transparent overlay for UI
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, 80);

    // Race info
    ctx.fillStyle = "#FFF";
    ctx.font = "20px Arial";
    ctx.fillText(`Volta: ${raceData.lap}/${raceData.totalLaps}`, 20, 30);
    ctx.fillText(`Posição: ${raceData.position}°`, 20, 55);
    
    ctx.fillText(`Tempo: ${Math.floor(raceData.time / 60)}:${Math.floor(raceData.time % 60).toString().padStart(2, '0')}`, 200, 30);
    ctx.fillText(`Velocidade: ${Math.floor(raceData.speed)} km/h`, 200, 55);

    // Controls reminder
    ctx.font = "14px Arial";
    ctx.fillText("P1: Setas | P2: WASD | ESC: Pausar", canvas.width - 250, 30);
  };

  const togglePause = () => {
    if (gameState === "racing") {
      setGameState("paused");
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    } else if (gameState === "paused") {
      setGameState("racing");
      gameLoop();
    }
  };

  const handleFinishRace = () => {
    setGameState("finished");
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Award coins based on performance
    const coinsEarned = raceData.position === 1 ? 100 : raceData.position === 2 ? 50 : 25;
    console.log(`Corrida finalizada! Moedas ganhas: ${coinsEarned}`);
    
    setTimeout(() => {
      onRaceEnd(coinsEarned);
    }, 3000);
  };

  // Listen for ESC key to pause
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        togglePause();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState]);

  if (gameState === "finished") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-black/30 border-yellow-400/50">
          <CardContent className="text-center p-8">
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-3xl font-bold text-white mb-4">Corrida Finalizada!</h1>
            <div className="space-y-2 text-gray-300 mb-6">
              <p>Posição: <span className="text-yellow-400 font-bold">{raceData.position}°</span></p>
              <p>Tempo: <span className="text-blue-400 font-bold">
                {Math.floor(raceData.time / 60)}:{Math.floor(raceData.time % 60).toString().padStart(2, '0')}
              </span></p>
              <p>Moedas ganhas: <span className="text-green-400 font-bold">+50</span></p>
            </div>
            <Button 
              onClick={() => onRaceEnd()}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              Voltar ao Menu
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => onRaceEnd()}
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Sair
          </Button>
          
          <Button
            onClick={togglePause}
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-700"
          >
            {gameState === "paused" ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </Button>
        </div>

        <Button
          onClick={handleFinishRace}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
        >
          🏁 Finalizar Corrida
        </Button>
      </div>

      {/* Game Canvas */}
      <div className="flex justify-center">
        <div className="relative border-4 border-gray-600 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            className="bg-gray-800"
            style={{ imageRendering: 'pixelated' }}
          />
          
          {gameState === "paused" && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <Card className="bg-black/80 border-gray-600">
                <CardContent className="text-center p-8">
                  <Pause className="w-16 h-16 mx-auto mb-4 text-white" />
                  <h2 className="text-2xl font-bold text-white mb-4">Jogo Pausado</h2>
                  <Button onClick={togglePause} className="bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Continuar
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Split-screen dividers and player info */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Card className="bg-red-500/20 border-red-400/50">
          <CardContent className="p-4 text-center">
            <h3 className="text-red-400 font-bold">Player 1</h3>
            <p className="text-white text-sm">Controles: Setas do teclado</p>
            <p className="text-gray-300 text-xs">↑↓ Acelerar/Frear | ←→ Virar</p>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-500/20 border-blue-400/50">
          <CardContent className="p-4 text-center">
            <h3 className="text-blue-400 font-bold">Player 2</h3>
            <p className="text-white text-sm">Controles: WASD</p>
            <p className="text-gray-300 text-xs">WS Acelerar/Frear | AD Virar</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RaceGame;