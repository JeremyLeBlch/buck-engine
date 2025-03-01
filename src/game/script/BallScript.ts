import Collider from "../../framework/core/components/collider/Collider.ts";
import MonoBehaviour from "../../framework/core/components/MonoBehaviour.ts";
import Vector2 from "../../framework/core/models/Vector2.ts";
import RectangleRenderer from "../../framework/core/components/renderer/RectangleRenderer.ts";

export default class BallScript extends MonoBehaviour {
  public speed: Vector2 = new Vector2(40,40);
  public maxSpeed: number = 40;
  public speedIncrement: number = 0.2;

  public update(deltaTime: number) {
    this.gameObject.transform.position = new Vector2(
      this.gameObject.transform.position.x + this.speed.x * deltaTime,
      this.gameObject.transform.position.y + this.speed.y * deltaTime
    );
  }

  public onCollisionEnter(collider: Collider, other: Collider, contactInfo: any): void {
    const paddle = other.gameObject;
    const paddlePosition = paddle.transform.position;
    const position = this.gameObject.transform.position;
    const renderer = paddle.renderer as RectangleRenderer;

    this.speed = new Vector2(this.speed.x, this.speed.y * -1);

    const relativeIntersectY = (paddlePosition.y + (renderer.height / 2)) - position.y;
    const normalizedRelativeIntersectionY = relativeIntersectY / (renderer.height / 2);
    const bounceAngle = normalizedRelativeIntersectionY * (Math.PI / 3);
    const direction = this.speed.x < 0 ? 1 : -1;
    const currentSpeed = Math.sqrt(this.speed.x * this.speed.x + this.speed.y * this.speed.y);
    const newSpeed = Math.min(currentSpeed * (1 + this.speedIncrement), this.maxSpeed);

    this.speed = new Vector2(
      direction * Math.cos(bounceAngle) * newSpeed,
      Math.sin(bounceAngle) * newSpeed
    );

    if (direction > 0) {
      this.gameObject.transform.position = new Vector2(
        paddlePosition.x + (this.gameObject.renderer as RectangleRenderer).width,
        position.y
      );
    } else {
      this.gameObject.transform.position = new Vector2(
        paddlePosition.x - (this.gameObject.renderer as RectangleRenderer).width,
        position.y
      );
    }
  }
}
