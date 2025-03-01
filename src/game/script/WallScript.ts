import MonoBehaviour from "../../framework/core/components/MonoBehaviour.ts";
import Vector2 from "../../framework/core/models/Vector2.ts";

export default class WallScript extends MonoBehaviour {

  public update(deltaTime: number) {
    this.gameObject.transform.position = new Vector2(
      this.gameObject.transform.position.x,
      this.gameObject.transform.position.y - 10  * deltaTime
    );
  }

}