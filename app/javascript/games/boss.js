import { MovingDirection } from "./moving_direction";
import boss1 from "../images/boss1.png";
import boss2 from "../images/boss2.png";
import boss3 from "../images/boss3.png";
import boss4 from "../images/boss4.png";
import boss5 from "../images/bossN5.png";
import tour1 from "../images/tour1.jpg"

VELOCITY = 2;

export default class Boss {
  constructor(x, y, tileSize, velocity, tileMap){
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = VELOCITY;
    this.tileMap = tileMap;

    this.#loadImages();

    this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);

    this.directionTimerDefault = this.#random(10, 20);
    this.directionTimer = this.directionTimerDefault;

  }

  draw(ctx) {
    this.#move();
    this.#changeDirection();
    ctx.drawImage(this.images, this.x, this.y, this.tileSize, this.tileSize);
  }

  collideWith(player){
    const size = this.tileSize / 2;
    if(this.x < player.x + size &&
      this.x + 1 > player.x &&
      this.y + size > player.y &&
      this.y < player.y + size
      ){
        return true;
      }
    else{
      return false;
    }
  }

  #move() {
    if(!this.tileMap.didCollideWithEnvironment(this.x, this.y, this.movingDirection)){
      switch (this.movingDirection) {
        case MovingDirection.up:
          this.y -= this.velocity
          break;

        case MovingDirection.down:
          this.y += this.velocity
          break;

        case MovingDirection.left:
          this.x -= this.velocity
          break;

        case MovingDirection.right:
          this.x += this.velocity
          break;
      }
    }
  }

  #changeDirection(){
    this.directionTimer--;
    let newMoveDirection = null;
    if(this.directionTimer == 0){
      this.directionTimer = this.directionTimerDefault;
      newMoveDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length)
    }
    if(newMoveDirection != null && this.movingDirection != newMoveDirection) {
      if(
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
        ) {
          if(
            !this.tileMap.didCollideWithEnvironment(
              this.x,
              this.y,
              newMoveDirection
            )
          ){
            this.movingDirection = newMoveDirection;
          }
        }
    }
  }

  #random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  #loadImages(){

    this.bossN1 = new Image();
    this.bossN1.src = bossN1;

    this.bossN2 = new Image();
    this.bossN2.src = bossN2;

    this.bossN3 = new Image();
    this.bossN3.src = bossN3;

    this.bossN4 = new Image();
    this.bossN4.src = bossN4;

    this.bossN5 = new Image()
    this.bossN5.src = bossN5

    this.tour1 = new Image()
    this.tour1 = tour1

    this.images =
    this.bossN4;

  }

}
