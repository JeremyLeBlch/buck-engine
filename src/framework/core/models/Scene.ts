import GameObject from "./GameObject.ts";

export default abstract class Scene {
  public readonly name: string;
  public gameObjects: GameObject[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public update(deltaTime: number) {
    for (const gameObject of this.gameObjects) {
      gameObject.update(deltaTime);
    }
  }

  public preRender(): GameObject[] {
    return this.gameObjects;
  }

  public addGameObject(gameObject: GameObject) {
    this.gameObjects.push(gameObject);
  }

  public removeGameObject(gameObject: GameObject) {
    this.gameObjects = this.gameObjects.filter((obj) => obj !== gameObject);
  }

  public abstract loadScene(): Promise<void>;
}