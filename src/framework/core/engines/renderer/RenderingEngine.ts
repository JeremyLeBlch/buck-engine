import GameObject from "../../models/GameObject.ts";

export default interface RenderingEngine {
  render(gameObjects: GameObject[]): void;
}