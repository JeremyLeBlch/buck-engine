import Component from "./Component.ts";
import Vector2 from "../models/Vector2.ts";

export default class Transform extends Component {
  private _position: Vector2 = Vector2.zero;
  private _scale: Vector2 = Vector2.one;

  constructor() {
    super();
  }

  public get position() {
    return this._position;
  }

  public set position(value: Vector2) {
    this._position = value;
  }

  public get scale() {
    return this._scale;
  }

  public set scale(value: Vector2) {
    this._scale = value;
  }
}