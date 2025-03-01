import GameObject from "../models/GameObject.ts";

export default abstract class Component {
  public name: string;
  // @ts-ignore
  public gameObject: GameObject;

  constructor() {
    this.name = this.constructor.name;
  }

  public setParent(go: GameObject){
    this.gameObject = go;
  }
}
