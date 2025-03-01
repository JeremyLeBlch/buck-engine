import Component from "./Component.ts";
import Collider from "./collider/Collider.ts";

export default abstract class MonoBehaviour extends Component {

  abstract update?(deltaTime: number): void;

  /**
   * Implement this method to receive a callback when this component is touching another collider

  abstract onTriggerEnter?(collider: Collider, other: Collider, contactInfo: any): void;

  /**
   * Implement this function to receive a callback when another collider has stopped touching this collider.

  abstract onTriggerExit?(collider: Collider, other: Collider): void;

   /**
   * Implement this method to receive a callback when this collider/rigidbody has stopped touching another rigidbody/collider.
  abstract onCollisionExit?(collider: Collider, other: Collider): void;
    */

  /**
   * Implement this method to receive collision events.
   */
  abstract onCollisionEnter?(collider: Collider, other: Collider, contactInfo: any): void;
}
