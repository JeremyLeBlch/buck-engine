import {Ticker} from "./engines/ticker/Ticker.ts";
import RenderingEngine from "./engines/renderer/RenderingEngine.ts";
import Scene from "./models/Scene.ts";
import {PhysicEngine} from "./engines/physic/PhysicEngine.ts";

export interface GameEngineProps {
  renderTicker: Ticker;
  updateTicker: Ticker;
  renderingEngine: RenderingEngine;
  scenes: Scene[];
}

export default class GameEngine {
  private renderTicker: Ticker;
  private updateTicker: Ticker;
  private renderingEngine: RenderingEngine;
  private physicEngine: PhysicEngine = new PhysicEngine();

  private scenes: Scene[] = [];
  private activeScene?: Scene;

  constructor(props: GameEngineProps) {
    this.renderTicker = props.renderTicker;
    this.updateTicker = props.updateTicker;
    this.renderingEngine = props.renderingEngine;

    for (const scene of props.scenes) {
      this.addScene(scene);
    }
  }

  public async start(): Promise<void> {
    this.renderTicker.startLoop(() => this.render());
    this.updateTicker.startLoop((deltaTime) => this.update(deltaTime));
  }

  public async setActiveScene(name: string) {
    this.activeScene = this.scenes.find((scene) => scene.name === name);
    await this.activeScene?.loadScene();
  }

  private addScene(scene: Scene) {
    this.scenes.push(scene);
  }

  private render() {
    this.renderingEngine.render(this.activeScene?.preRender() ?? []);
  }

  private update(deltaTime: number) {
    this.activeScene?.update(deltaTime);
    this.physicEngine.checkCollisions(this.activeScene?.gameObjects ?? []);
  }

}