import GameEngine from "../framework/core/GameEngine.ts";
import FixedUpdateTicker from "../framework/web/engines/ticker/FixedUpdateTicker.ts";
import CanvasRenderingEngine from "../framework/web/engines/renderer/CanvasRenderingEngine.ts";
import GameScene from "./scenes/GameScene.ts";

console.log("Starting game");
const game: GameEngine = new GameEngine({
  renderTicker: new FixedUpdateTicker(60),
  updateTicker: new FixedUpdateTicker(30),
  renderingEngine: new CanvasRenderingEngine("app"),
  scenes: [
    new GameScene("GameScene"),
  ]
});

await game.setActiveScene("GameScene");

game.start();