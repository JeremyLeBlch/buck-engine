import Scene from "../../framework/core/models/Scene.ts";
import GameObject from "../../framework/core/models/GameObject.ts";
import RectangleRenderer from "../../framework/core/components/renderer/RectangleRenderer.ts";
import Vector2 from "../../framework/core/models/Vector2.ts";
import BoxCollider from "../../framework/core/components/collider/BoxCollider.ts";
import BallScript from "../script/BallScript.ts";
import WallScript from "../script/WallScript.ts";

export default class GameScene extends Scene {

  public async loadScene(): Promise<void> {
    const wallLeft = new GameObject("Wall")
      .addComponent(new BoxCollider(new Vector2(10, 200)))
      .addComponent(new RectangleRenderer(new Vector2(10, 200), "#3f2323"))
      .addComponent(new WallScript());

    wallLeft.transform.position = new Vector2(100, 50);

    const wallRight = new GameObject("WallRight")
      .addComponent(new BoxCollider(new Vector2(10, 200)))
      .addComponent(new RectangleRenderer(new Vector2(10, 200), "#3f2323"))
      .addComponent(new WallScript());

    const ball = new GameObject("Ball")
      .addComponent(new BoxCollider(new Vector2(10, 10)))
      .addComponent(new RectangleRenderer(new Vector2(10, 10), "#3f2323"))
      .addComponent(new BallScript());

    ball.transform.position = new Vector2(50, 50);

    this.addGameObject(wallLeft);
    this.addGameObject(wallRight);
    this.addGameObject(ball);
  }
}
