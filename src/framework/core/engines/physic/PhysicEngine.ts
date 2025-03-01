import GameObject from "../../models/GameObject.ts";
import Collider from "../../components/collider/Collider.ts";
import BoxCollider from "../../components/collider/BoxCollider.ts";
import MonoBehaviour from "../../components/MonoBehaviour.ts";

export class PhysicEngine {
  public checkCollisions(gameObjects: GameObject[]): void {
    for (const gameObject of gameObjects) {
      const goColliders = gameObject.getComponents(Collider);

      for (const otherGameObject of gameObjects) {
        if (gameObject === otherGameObject) {
          continue;
        }

        const otherGoColliders = otherGameObject.getComponents(Collider);
        let isColliding = false;

        for (const collider of goColliders) {
          for (const otherCollider of otherGoColliders) {
            if (collider instanceof BoxCollider && otherCollider instanceof BoxCollider) {
              isColliding = this.checkBoxesCollision(collider, otherCollider);

              if (isColliding) {
                gameObject.getComponents<MonoBehaviour>(MonoBehaviour).forEach(mb => {
                  if (mb.onCollisionEnter) {
                    mb.onCollisionEnter(collider, otherCollider, {});
                  }
                });
                otherGameObject.getComponents<MonoBehaviour>(MonoBehaviour).forEach(mb => {
                  if (mb.onCollisionEnter) {
                    mb.onCollisionEnter(otherCollider, collider, {});
                  }
                });
              }

              break;
            }
          }
          if (isColliding) {
            break;
          }
        }
      }
    }
  }

  private checkBoxesCollision(a: BoxCollider, b: BoxCollider): boolean {
    const posA = a.gameObject.transform.position;
    const posB = b.gameObject.transform.position;

    const aLeft = posA.x;
    const aRight = posA.x + a.size.x;
    const aTop = posA.y;
    const aBottom = posA.y + a.size.y;

    const bLeft = posB.x;
    const bRight = posB.x + b.size.x;
    const bTop = posB.y;
    const bBottom = posB.y + b.size.y;

    return (
      aRight > bLeft &&
      aLeft < bRight &&
      aBottom > bTop &&
      aTop < bBottom
    );
  }

}