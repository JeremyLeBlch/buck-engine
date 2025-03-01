import Renderer from "./Renderer.ts";
import Vector2 from "../../models/Vector2.ts";

export default class RectangleRenderer extends Renderer{
  private _size: Vector2 = Vector2.one;
  private _color: string = "#000000";

  constructor(size?: Vector2, color?: string) {
    super();
    this._size = size ?? this._size;
    this._color = color ?? this._color;
  }

  public get size(){
    return this._size;
  }

  public set size(value: Vector2){
    this._size = value;
  }

  public get color(){
    return this._color;
  }

  public set color(value: string){
    this._color = value;
  }

  public get height(){
    return this._size.y;
  }

  public get width(){
    return this._size.x;
  }
}