import poutine from "../images/poutine2.jpg";
import poupou from "../images/poutine1.jpeg";

export default class Enemy {
  constructor(x, y, tileSize, velocity, tileMap){
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.#loadImages();
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize)
  }

  #loadImages(){
    this.poutine1 = new Image()
    this.poutine1.src = poupou

    this.poutine2 = new Image()
    this.poutine2.src = poutine

    this.image = this.poutine2;
  }
}
