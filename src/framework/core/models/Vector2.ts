export default class Vector2 {
  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static get zero(): Vector2 {
    return new Vector2(0, 0);
  }

  public static get one(): Vector2 {
    return new Vector2(1, 1);
  }
}