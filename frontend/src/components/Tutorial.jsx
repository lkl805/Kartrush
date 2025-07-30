import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { CheckCircle, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { mockTutorialSteps } from "../mock";

const Tutorial = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(mockTutorialSteps);
  const [keysPressed, setKeysPressed] = useState({});
  const [tutorialComplete, setTutorialComplete] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toLowerCase();
      setKeysPressed(prev => ({ ...prev, [key]: true }));
      
      // Check current step completion
      const step = steps[currentStep];
      let completed = false;
      
      switch (step.action) {
        case "move":
          completed = key === "arrowup" || key === "arrowdown";
          break;
        case "turn":
          completed = key === "arrowleft" || key === "arrowright";
          break;
        case "power":
          completed = key === " ";
          break;
        case "nitro":
          completed = key === "shift";
          break;
        case "customize":
          completed = true; // Auto complete for demo
          break;
      }
      
      if (completed && !step.completed) {
        const newSteps = [...steps];
        newSteps[currentStep].completed = true;
        setSteps(newSteps);
        
        setTimeout(() => {
          if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
          } else {
            setTutorialComplete(true);
          }
        }, 1000);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentStep, steps]);

  const progress = ((currentStep + (steps[currentStep]?.completed ? 1 : 0)) / steps.length) * 100;

  const renderKeyIcon = (action) => {
    switch (action) {
      case "move":
        return (
          <div className="flex gap-2">
            <ArrowUp className="w-6 h-6" />
            <ArrowDown className="w-6 h-6" />
          </div>
        );
      case "turn":
        return (
          <div className="flex gap-2">
            <ArrowLeft className="w-6 h-6" />
            <ArrowRight className="w-6 h-6" />
          </div>
        );
      case "power":
        return <div className="px-4 py-2 bg-gray-700 rounded text-white">ESPAÇO</div>;
      case "nitro":
        return <div className="px-4 py-2 bg-gray-700 rounded text-white">SHIFT</div>;
      default:
        return null;
    }
  };

  if (tutorialComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-black/30 border-green-400/50">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-4" />
            <CardTitle className="text-2xl text-white">Tutorial Completo!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-300 mb-6">
              Parabéns! Você aprendeu todos os controles básicos. Agora está pronto para as corridas!
            </p>
            <Button 
              onClick={onComplete}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              Começar a Jogar!
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-black/30 border-blue-400/50">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl text-white">Tutorial</CardTitle>
            <span className="text-gray-300">
              {currentStep + 1} / {steps.length}
            </span>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Step */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
            <p className="text-xl text-gray-300 mb-6">{step.description}</p>
            
            {/* Key Visual */}
            <div className="flex justify-center mb-6">
              {renderKeyIcon(step.action)}
            </div>
            
            {/* Status */}
            <div className="flex items-center justify-center gap-2">
              {step.completed ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-green-400 font-bold">Completo!</span>
                </>
              ) : (
                <span className="text-yellow-400 font-bold animate-pulse">
                  Pressione a tecla indicada...
                </span>
              )}
            </div>
          </div>
          
          {/* Step List */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {steps.map((s, index) => (
              <div
                key={s.id}
                className={`p-3 rounded-lg text-center transition-all duration-200 ${
                  index === currentStep
                    ? "bg-blue-500/30 border-2 border-blue-400"
                    : s.completed
                    ? "bg-green-500/30 border-2 border-green-400"
                    : "bg-gray-500/30 border-2 border-gray-400"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {s.completed && <CheckCircle className="w-4 h-4 text-green-400" />}
                  <span className={`text-sm ${
                    index === currentStep ? "text-blue-300" : 
                    s.completed ? "text-green-300" : "text-gray-400"
                  }`}>
                    {s.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tutorial;