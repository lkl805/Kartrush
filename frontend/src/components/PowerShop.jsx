import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Coins, Shield, Zap, Target, Droplets, Star } from "lucide-react";
import { mockPowers, GameData } from "../mock";

const PowerShop = ({ player, onUpdatePlayer, onBack }) => {
  const [equippedPowers, setEquippedPowers] = useState(player.equippedPowers || [1, 2]);

  const handlePurchase = (power) => {
    if (player.coins >= power.price) {
      const newOwnedPowers = [...(player.ownedPowers || []), power.id];
      onUpdatePlayer({ 
        coins: player.coins - power.price,
        ownedPowers: newOwnedPowers
      });
      console.log(`Poder ${power.name} comprado e salvo offline!`);
    }
  };

  const handleEquip = (powerId) => {
    if (equippedPowers.length < 3) {
      const newEquipped = [...equippedPowers, powerId];
      setEquippedPowers(newEquipped);
      onUpdatePlayer({ equippedPowers: newEquipped });
    }
  };

  const handleUnequip = (powerId) => {
    const newEquipped = equippedPowers.filter(id => id !== powerId);
    setEquippedPowers(newEquipped);
    onUpdatePlayer({ equippedPowers: newEquipped });
  };

  const getPowerIcon = (powerName) => {
    switch (powerName.toLowerCase()) {
      case "míssil": return <Target className="w-8 h-8 text-red-400" />;
      case "escudo": return <Shield className="w-8 h-8 text-blue-400" />;
      case "turbo": return <Zap className="w-8 h-8 text-yellow-400" />;
      case "armadilha de óleo": return <Droplets className="w-8 h-8 text-black" />;
      case "teleporte": return <Star className="w-8 h-8 text-purple-400" />;
      default: return <Zap className="w-8 h-8 text-gray-400" />;
    }
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
          <h1 className="text-3xl font-bold text-white">Loja de Poderes</h1>
        </div>
        
        <div className="flex items-center gap-2 text-yellow-400">
          <Coins className="w-5 h-5" />
          <span className="font-bold text-xl">{player.coins}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Equipped Powers */}
        <Card className="bg-black/30 border-green-400/50">
          <CardHeader>
            <CardTitle className="text-white text-center">Poderes Equipados</CardTitle>
            <p className="text-gray-300 text-sm text-center">
              {equippedPowers.length}/3 slots usados
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => {
              const equippedPower = equippedPowers[index];
              const power = mockPowers.find(p => p.id === equippedPower);
              
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 border-dashed transition-all duration-200 ${
                    power 
                      ? "bg-green-500/20 border-green-400" 
                      : "bg-gray-500/20 border-gray-400"
                  }`}
                >
                  {power ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getPowerIcon(power.name)}
                        <div>
                          <h4 className="text-white font-bold text-sm">{power.name}</h4>
                          <p className="text-gray-300 text-xs">{power.cooldown/1000}s cooldown</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUnequip(power.id)}
                        className="border-red-400 text-red-400 hover:bg-red-400/20"
                      >
                        Remover
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400">
                      <div className="text-2xl mb-2">+</div>
                      <p className="text-xs">Slot vazio</p>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Available Powers */}
        <div className="lg:col-span-3">
          <Card className="bg-black/30 border-purple-400/50">
            <CardHeader>
              <CardTitle className="text-white">Poderes Disponíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {mockPowers.map((power) => {
                  const isOwned = (player.ownedPowers || []).includes(power.id);
                  const isEquipped = equippedPowers.includes(power.id);
                  const canAfford = player.coins >= power.price;
                  
                  return (
                    <div
                      key={power.id}
                      className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                        isOwned 
                          ? "bg-blue-500/20 border-blue-400" 
                          : canAfford
                          ? "bg-green-500/20 border-green-400 hover:border-green-300"
                          : "bg-red-500/20 border-red-400"
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        {getPowerIcon(power.name)}
                        <div>
                          <h3 className="text-white font-bold text-lg">{power.name}</h3>
                          <p className="text-gray-300 text-sm">{power.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">Cooldown:</span>
                          <span className="text-yellow-400">{power.cooldown/1000}s</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-yellow-400 font-bold">
                            {power.price} moedas
                          </span>
                          
                          {isOwned ? (
                            isEquipped ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUnequip(power.id)}
                                className="border-red-400 text-red-400 hover:bg-red-400/20"
                              >
                                Equipado
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => handleEquip(power.id)}
                                disabled={equippedPowers.length >= 3}
                                className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
                              >
                                Equipar
                              </Button>
                            )
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handlePurchase(power)}
                              disabled={!canAfford}
                              className={`${
                                canAfford 
                                  ? "bg-blue-600 hover:bg-blue-700" 
                                  : "bg-gray-600 cursor-not-allowed opacity-50"
                              }`}
                            >
                              {canAfford ? "Comprar" : "Sem moedas"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tips */}
      <Card className="mt-6 bg-yellow-500/10 border-yellow-400/50">
        <CardContent className="p-4">
          <h3 className="text-yellow-400 font-bold mb-2">💡 Dicas:</h3>
          <ul className="text-yellow-200 text-sm space-y-1">
            <li>• Você pode equipar até 3 poderes por corrida</li>
            <li>• Poderes têm cooldown - use estrategicamente!</li>
            <li>• Ganhe moedas vencendo corridas para comprar novos poderes</li>
            <li>• Combine poderes diferentes para estratégias únicas</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PowerShop;