import player1 from "../images/player_1.png"

export default class Player {
  constructor(x, y, tileSize, velocity, tileMap){
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.#loadPlayerImages();
  }


  draw(ctx) {
    // this.#move();
    ctx.drawImage(this.playerImages[this.playerImageIndex], this.x, this.y, this.tileSize, this.tileSize)
  }

  #loadPlayerImages() {
    const playerImage1 = new Image();
    playerImage1.src = player1;

    this.playerImages = [playerImage1];
    this.playerImageIndex = 0;
  }










}
