import RenderingEngine from "../../../core/engines/renderer/RenderingEngine.ts";
import GameObject from "../../../core/models/GameObject.ts";
import RectangleRenderer from "../../../core/components/renderer/RectangleRenderer.ts";

export default class CanvasRenderingEngine implements RenderingEngine {
  private ctx: any;

  constructor(id: string) {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    this.ctx = canvas.getContext("2d");

    window.addEventListener('load', () => this.resizeCanvas());
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  public render(gameObjects: GameObject[]): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    for (const gameObject of gameObjects) {
      if (!gameObject.renderer) {
        continue; // skip, no renderer
      }

      if (gameObject.renderer instanceof RectangleRenderer) {
        this.ctx.fillStyle = gameObject.renderer.color;
        this.ctx.fillRect(
          gameObject.transform.position.x,
          gameObject.transform.position.y,
          gameObject.renderer.size.x,
          gameObject.renderer.size.y
        );
      }
    }
  }

  private resizeCanvas() {
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    console.log(this.ctx.canvas.width);
  }
}
