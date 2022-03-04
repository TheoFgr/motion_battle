import { MovingDirection } from "./moving_direction";
import poutine from "../images/poutine2.png";
import poupou from "../images/poutine1.jpg";

export default class Enemy {
  constructor(x, y, tileSize, velocity, tileMap){
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.#loadImages();

    this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);

    this.directionTimerDefault = this.#random(10, 50);
    this.directionTimer = this.directionTimerDefault;
  }

  draw(ctx) {
    this.#move();
    this.#changeDirection();
    ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize)
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
    this.poutine1 = new Image()
    this.poutine1.src = poupou

    this.poutine2 = new Image()
    this.poutine2.src = poutine

    this.image = this.poutine2;
  }
}
