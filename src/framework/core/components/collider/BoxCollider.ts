import Collider from "./Collider.ts";
import Vector2 from "../../models/Vector2.ts";

export default class BoxCollider extends Collider {
  private _offset: Vector2 = Vector2.zero;
  private _size: Vector2 = Vector2.one;

  constructor(size?: Vector2, offset?: Vector2) {
    super();
    this._size = size ?? this._size;
    this._offset = offset ?? this._offset;
  }

  public get size() {
    return this._size;
  }

  public set size(value: Vector2) {
    this._size = value;
  }

  public get offset() {
    return this.offset;
  }

  public set offset(value: Vector2) {
    this.offset = value;
  }

}