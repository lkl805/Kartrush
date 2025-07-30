# 🏁 KartRush - Jogo de Corrida Offline

Um jogo de corrida estilo Mario Kart desenvolvido em React, funcionando 100% offline com localStorage para persistência de dados.

## 🎮 Funcionalidades

### ✅ Sistema Completo Implementado:
- **Tutorial Obrigatório**: 5 etapas interativas (acelerar, frear, virar, poderes, nitro)
- **Customização de Carros**: Cores, rodas, motores, adesivos com efeitos nas estatísticas
- **Loja de Poderes**: Sistema de compra e equipamento (máximo 3 por corrida)
- **4 Pistas Temáticas**: Cidade, Floresta, Deserto, Espaço com dificuldades crescentes
- **Motor de Corrida**: Canvas HTML5 com física realista
- **Multiplayer Local**: Split-screen para 2 jogadores no mesmo navegador
- **Sistema de Progresso**: Moedas, desbloqueios, melhores tempos

## 🕹️ Controles do Jogo

### Player 1 (Solo):
- **↑ / ↓**: Acelerar / Frear
- **← / →**: Virar esquerda / direita
- **ESPAÇO**: Usar poderes
- **SHIFT**: Nitro
- **ESC**: Pausar

### Player 2 (Multiplayer Local):
- **W / S**: Acelerar / Frear
- **A / D**: Virar esquerda / direita
- **ESPAÇO**: Usar poderes
- **SHIFT**: Nitro

## 🎯 Como Jogar

1. **Primeiro Acesso**: Complete o tutorial obrigatório
2. **Garagem**: Customize seu carro (cores, rodas, motores)
3. **Loja**: Compre poderes com moedas ganhas nas corridas
4. **Pistas**: Escolha uma pista e modo (Solo ou 2 Jogadores)
5. **Corrida**: Use poderes estrategicamente e procure atalhos

## 💾 Sistema Offline

- **Persistência Local**: Todos os dados salvos no localStorage do navegador
- **Sem Internet**: Funciona completamente offline
- **Reset**: Botão para limpar todos os dados salvos
- **Auto-Save**: Progresso salvo automaticamente

## 🏆 Sistema de Recompensas

- **1º Lugar**: 100 moedas
- **2º Lugar**: 50 moedas  
- **3º Lugar**: 25 moedas
- **Desbloqueios**: Novas pistas com vitórias consecutivas

## 🛠️ Tecnologias

- **Frontend**: React 19 + Vite
- **UI**: Shadcn/ui + Tailwind CSS
- **Ícones**: Lucide React
- **Persistência**: localStorage
- **Canvas**: HTML5 para renderização do jogo

## 🚀 Como Executar

```bash
cd frontend
yarn start
```

Acesse: http://localhost:3000

## 🎨 Design

- **Tema**: Gradientes modernos purple/blue
- **Responsivo**: Funciona em desktop e mobile
- **Animações**: Transições suaves e efeitos hover
- **Acessibilidade**: Contraste adequado e navegação por teclado

---

**🎮 Divirta-se correndo no KartRush!**