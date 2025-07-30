import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Coins, Zap, Gauge, Steering } from "lucide-react";
import { mockCars, mockCustomization, GameData } from "../mock";

const Garage = ({ player, onUpdatePlayer, onBack }) => {
  const [selectedCar, setSelectedCar] = useState(mockCars.find(car => car.id === player.selectedCar) || mockCars[0]);
  const [activeTab, setActiveTab] = useState("cars");
  const [previewCar, setPreviewCar] = useState({ 
    ...selectedCar,
    ...(player.carCustomization && player.carCustomization[selectedCar.id] ? player.carCustomization[selectedCar.id] : {})
  });

  const handlePurchase = (item, cost, type) => {
    if (player.coins >= cost) {
      onUpdatePlayer({ coins: player.coins - cost });
      
      if (type === "color") {
        setPreviewCar(prev => ({ ...prev, baseColor: item.value }));
      } else if (type === "wheels") {
        setPreviewCar(prev => ({ ...prev, wheels: item.value }));
      } else if (type === "engine") {
        setPreviewCar(prev => ({ ...prev, engine: item.value }));
      } else if (type === "car") {
        const newUnlockedCars = [...(player.unlockedCars || []), item.id];
        onUpdatePlayer({ unlockedCars: newUnlockedCars });
      }
    }
  };

  const saveCustomization = () => {
    const newCustomization = {
      ...player.carCustomization,
      [previewCar.id]: {
        baseColor: previewCar.baseColor,
        wheels: previewCar.wheels,
        engine: previewCar.engine,
        stickers: previewCar.stickers || []
      }
    };
    
    onUpdatePlayer({ 
      selectedCar: previewCar.id,
      carCustomization: newCustomization
    });
    
    console.log("Customização salva offline:", newCustomization);
  };

  const renderCarStats = (car) => {
    let totalSpeed = car.speed;
    let totalAcceleration = car.acceleration;
    let totalHandling = car.handling;

    // Add bonuses from customizations
    const wheels = mockCustomization.wheels.find(w => w.value === car.wheels);
    const engine = mockCustomization.engines.find(e => e.value === car.engine);

    if (wheels) {
      totalSpeed += wheels.speed;
      totalHandling += wheels.handling;
    }
    if (engine) {
      totalSpeed += engine.speed;
      totalAcceleration += engine.acceleration;
    }

    return (
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center">
          <Zap className="w-6 h-6 text-yellow-400 mb-1" />
          <span className="text-sm text-gray-300">Velocidade</span>
          <span className="text-xl font-bold text-white">{totalSpeed}</span>
        </div>
        <div className="flex flex-col items-center">
          <Gauge className="w-6 h-6 text-green-400 mb-1" />
          <span className="text-sm text-gray-300">Aceleração</span>
          <span className="text-xl font-bold text-white">{totalAcceleration}</span>
        </div>
        <div className="flex flex-col items-center">
          <Steering className="w-6 h-6 text-blue-400 mb-1" />
          <span className="text-sm text-gray-300">Manuseio</span>
          <span className="text-xl font-bold text-white">{totalHandling}</span>
        </div>
      </div>
    );
  };

  const renderCarPreview = () => {
    return (
      <div className="relative h-40 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
        {/* Simple car representation */}
        <div className="relative">
          <div 
            className="w-24 h-16 rounded-lg shadow-lg transform rotate-45"
            style={{ backgroundColor: previewCar.baseColor }}
          >
            {/* Wheels */}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-600"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-600"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-600"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-600"></div>
          </div>
        </div>
        
        {/* Effects for stickers */}
        {previewCar.stickers && previewCar.stickers.includes("lightning") && (
          <div className="absolute top-2 right-2 text-yellow-400 text-2xl">⚡</div>
        )}
        {previewCar.stickers && previewCar.stickers.includes("flame") && (
          <div className="absolute bottom-2 left-2 text-red-400 text-2xl">🔥</div>
        )}
      </div>
    );
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
          <h1 className="text-3xl font-bold text-white">Garagem</h1>
        </div>
        
        <div className="flex items-center gap-2 text-yellow-400">
          <Coins className="w-5 h-5" />
          <span className="font-bold text-xl">{player.coins}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Car Preview */}
        <Card className="bg-black/30 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white text-center">{previewCar.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderCarPreview()}
            {renderCarStats(previewCar)}
            <Button 
              onClick={saveCustomization}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              Salvar Customização
            </Button>
          </CardContent>
        </Card>

        {/* Customization Tabs */}
        <div className="lg:col-span-2">
          <div className="flex gap-2 mb-4">
            {["cars", "colors", "wheels", "engines", "stickers"].map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                variant={activeTab === tab ? "default" : "outline"}
                className={activeTab === tab ? "bg-blue-600" : "border-gray-600 text-white hover:bg-gray-700"}
              >
                {tab === "cars" && "Carros"}
                {tab === "colors" && "Cores"}
                {tab === "wheels" && "Rodas"}
                {tab === "engines" && "Motores"}
                {tab === "stickers" && "Adesivos"}
              </Button>
            ))}
          </div>

          <Card className="bg-black/30 border-gray-600">
            <CardContent className="p-4">
              {activeTab === "cars" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockCars.map((car) => (
                    <div
                      key={car.id}
                      onClick={() => {
                        setSelectedCar(car);
                        setPreviewCar({ ...car });
                      }}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedCar.id === car.id
                          ? "bg-blue-500/30 border-2 border-blue-400"
                          : "bg-gray-700/30 border-2 border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      <h3 className="text-white font-bold mb-2">{car.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">
                          {car.unlocked ? "Desbloqueado" : `${car.price} moedas`}
                        </span>
                        {!car.unlocked && player.coins >= car.price && (
                          <Button size="sm" onClick={(e) => {
                            e.stopPropagation();
                            handlePurchase(car, car.price, "car");
                          }}>
                            Comprar
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "colors" && (
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {mockCustomization.colors.map((color) => (
                    <div
                      key={color.value}
                      onClick={() => handlePurchase(color, color.price, "color")}
                      className="aspect-square rounded-lg cursor-pointer border-2 border-gray-600 hover:border-white transition-all duration-200 flex flex-col items-center justify-center relative"
                      style={{ backgroundColor: color.value }}
                    >
                      {color.price > 0 && (
                        <div className="absolute bottom-1 left-1 right-1 bg-black/70 rounded text-white text-xs text-center">
                          {color.price}💰
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "wheels" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockCustomization.wheels.map((wheel) => (
                    <div
                      key={wheel.value}
                      onClick={() => handlePurchase(wheel, wheel.price, "wheels")}
                      className="p-4 bg-gray-700/30 rounded-lg cursor-pointer border-2 border-gray-600 hover:border-white transition-all duration-200"
                    >
                      <h4 className="text-white font-bold">{wheel.name}</h4>
                      <p className="text-gray-300 text-sm mb-2">
                        Velocidade: +{wheel.speed} | Manuseio: +{wheel.handling}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-400">{wheel.price} moedas</span>
                        {player.coins >= wheel.price && (
                          <Button size="sm">Equipar</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "engines" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockCustomization.engines.map((engine) => (
                    <div
                      key={engine.value}
                      onClick={() => handlePurchase(engine, engine.price, "engine")}
                      className="p-4 bg-gray-700/30 rounded-lg cursor-pointer border-2 border-gray-600 hover:border-white transition-all duration-200"
                    >
                      <h4 className="text-white font-bold">{engine.name}</h4>
                      <p className="text-gray-300 text-sm mb-2">
                        Velocidade: +{engine.speed} | Aceleração: +{engine.acceleration}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-400">{engine.price} moedas</span>
                        {player.coins >= engine.price && (
                          <Button size="sm">Equipar</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "stickers" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockCustomization.stickers.map((sticker) => (
                    <div
                      key={sticker.value}
                      onClick={() => handlePurchase(sticker, sticker.price, "sticker")}
                      className="p-4 bg-gray-700/30 rounded-lg cursor-pointer border-2 border-gray-600 hover:border-white transition-all duration-200 text-center"
                    >
                      <div className="text-3xl mb-2">
                        {sticker.value === "lightning" && "⚡"}
                        {sticker.value === "flame" && "🔥"}
                        {sticker.value === "star" && "⭐"}
                        {sticker.value === "skull" && "💀"}
                        {sticker.value === "heart" && "❤️"}
                      </div>
                      <h4 className="text-white font-bold text-sm">{sticker.name}</h4>
                      <p className="text-yellow-400 text-sm">{sticker.price} moedas</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Garage;