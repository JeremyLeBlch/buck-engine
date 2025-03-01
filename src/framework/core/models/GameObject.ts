import Component from "../components/Component.ts";
import Transform from "../components/Transform.ts";
import Renderer from "../components/renderer/Renderer.ts";

export default class GameObject {
  public readonly name: string;
  public components: Component[] = [];

  private readonly _transform: Transform;
  private _renderer?: Renderer;

  constructor(name: string) {
    this.name = name;

    this._transform = new Transform();
    this.addComponent(this._transform);
  }

  public get transform() {
    return this._transform;
  }

  public get renderer() {
    return this._renderer;
  }

  public update(deltaTime: number) {
    for (const component of this.components) {
      // @ts-ignore
      component["update"]?.(deltaTime);
    }
  }

  public addComponent(component: Component) {
    if (component instanceof Renderer) {
      if (this._renderer != null) {
        throw new Error("This GameObject already has a renderer");
      }
      this._renderer = component;
    }

    this.components.push(component);
    component.setParent(this);
    return this;
  }

  public removeComponent(component: Component) {
    this.components = this.components.filter(c => c !== component);
    return this;
  }

  public getComponents<T extends Component>(type: any): T[] {
    return this.components.filter((c) => c instanceof type) as T[];
  }
}
