// Mock data para o jogo Mario Kart
export const mockPlayer = {
  id: 1,
  name: "Player 1",
  coins: 500,
  level: 1,
  completedTutorial: false,
  unlockedTracks: [1, 2],
  unlockedCars: [1, 2],
  selectedCar: 1
};

export const mockCars = [
  {
    id: 1,
    name: "Speedster",
    baseColor: "#FF6B6B",
    wheels: "racing",
    engine: "basic",
    stickers: [],
    speed: 80,
    acceleration: 70,
    handling: 60,
    unlocked: true,
    price: 0
  },
  {
    id: 2, 
    name: "Thunder Bolt",
    baseColor: "#4ECDC4",
    wheels: "sport",
    engine: "turbo",
    stickers: ["lightning"],
    speed: 90,
    acceleration: 85,
    handling: 75,
    unlocked: true,
    price: 200
  },
  {
    id: 3,
    name: "Night Rider",
    baseColor: "#2C3E50",
    wheels: "premium",
    engine: "racing",
    stickers: ["flame", "star"],
    speed: 95,
    acceleration: 80,
    handling: 85,
    unlocked: false,
    price: 500
  }
];

export const mockPowers = [
  {
    id: 1,
    name: "Míssil",
    description: "Dispara um míssil teleguiado",
    icon: "🚀",
    price: 50,
    cooldown: 3000,
    owned: true
  },
  {
    id: 2,
    name: "Escudo",
    description: "Proteção contra ataques",
    icon: "🛡️",
    price: 75,
    cooldown: 5000,
    owned: true
  },
  {
    id: 3,
    name: "Turbo",
    description: "Aumento temporário de velocidade",
    icon: "⚡",
    price: 60,
    cooldown: 4000,
    owned: false
  },
  {
    id: 4,
    name: "Armadilha de Óleo",
    description: "Deixa poças de óleo na pista",
    icon: "🛢️",
    price: 40,
    cooldown: 2500,
    owned: false
  },
  {
    id: 5,
    name: "Teleporte",
    description: "Teleporta para frente na pista",
    icon: "⭐",
    price: 100,
    cooldown: 6000,
    owned: false
  }
];

export const mockTracks = [
  {
    id: 1,
    name: "Cidade Neon",
    theme: "city",
    difficulty: "easy",
    bestTime: null,
    unlocked: true,
    preview: "https://images.unsplash.com/photo-1514905552197-0610a4d8fd73?w=400",
    obstacles: ["traffic", "ramps"],
    shortcuts: 2
  },
  {
    id: 2,
    name: "Floresta Mágica",
    theme: "forest",
    difficulty: "medium", 
    bestTime: null,
    unlocked: true,
    preview: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
    obstacles: ["trees", "logs", "mushrooms"],
    shortcuts: 3
  },
  {
    id: 3,
    name: "Deserto Ardente",
    theme: "desert",
    difficulty: "hard",
    bestTime: null,
    unlocked: false,
    preview: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400",
    obstacles: ["cacti", "sand_storms", "rocks"],
    shortcuts: 1
  },
  {
    id: 4,
    name: "Estação Espacial",
    theme: "space",
    difficulty: "expert",
    bestTime: null,
    unlocked: false,
    preview: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400",
    obstacles: ["asteroids", "zero_gravity", "lasers"],
    shortcuts: 4
  }
];

export const mockTutorialSteps = [
  {
    id: 1,
    title: "Acelerar e Frear",
    description: "Use as setas ↑ e ↓ para acelerar e frear",
    action: "move",
    completed: false
  },
  {
    id: 2,
    title: "Virar",
    description: "Use as setas ← e → para virar esquerda e direita",
    action: "turn",
    completed: false
  },
  {
    id: 3,
    title: "Usar Poderes",
    description: "Pressione ESPAÇO para usar poderes coletados",
    action: "power",
    completed: false
  },
  {
    id: 4,
    title: "Nitro",
    description: "Pressione SHIFT para usar nitro",
    action: "nitro",
    completed: false
  },
  {
    id: 5,
    title: "Customização",
    description: "Visite a garagem para personalizar seu carro",
    action: "customize",
    completed: false
  }
];

export const mockCustomization = {
  colors: [
    { name: "Vermelho", value: "#FF6B6B", price: 0 },
    { name: "Azul", value: "#4ECDC4", price: 25 },
    { name: "Verde", value: "#45B7D1", price: 25 },
    { name: "Amarelo", value: "#FFA07A", price: 30 },
    { name: "Roxo", value: "#9B59B6", price: 50 },
    { name: "Preto", value: "#2C3E50", price: 75 }
  ],
  wheels: [
    { name: "Básica", value: "basic", price: 0, speed: 0, handling: 0 },
    { name: "Esportiva", value: "sport", price: 100, speed: 5, handling: 10 },
    { name: "Racing", value: "racing", price: 200, speed: 15, handling: 5 },
    { name: "Premium", value: "premium", price: 300, speed: 10, handling: 15 }
  ],
  engines: [
    { name: "Básico", value: "basic", price: 0, speed: 0, acceleration: 0 },
    { name: "Turbo", value: "turbo", price: 150, speed: 10, acceleration: 15 },
    { name: "Racing", value: "racing", price: 250, speed: 20, acceleration: 10 },
    { name: "Nitro", value: "nitro", price: 400, speed: 15, acceleration: 25 }
  ],
  stickers: [
    { name: "Raio", value: "lightning", price: 20 },
    { name: "Chama", value: "flame", price: 30 },
    { name: "Estrela", value: "star", price: 25 },
    { name: "Caveira", value: "skull", price: 40 },
    { name: "Coração", value: "heart", price: 15 }
  ]
};

// Função para simular compra
export const mockPurchase = (item, cost) => {
  return mockPlayer.coins >= cost;
};

// Função para simular save de progresso
export const mockSaveProgress = (data) => {
  console.log("Salvando progresso:", data);
  return Promise.resolve(true);
};