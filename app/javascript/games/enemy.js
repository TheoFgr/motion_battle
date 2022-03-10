import { MovingDirection } from "./moving_direction";
// img enemy right
import dragN1 from "../images/dragN1.png";
import dragN2 from "../images/dragN2.png";
import dragN3 from "../images/dragN3.png";
import dragN4 from "../images/dragN4.png";
import dragN5 from "../images/dragN5.png";
// img enemy left
import dragN1v from "../images/dragN1v.png";
import dragN2v from "../images/dragN2v.png";
import dragN3v from "../images/dragN3v.png";
import dragN4v from "../images/dragN4v.png";
import dragN5v from "../images/dragN5v.png";

export default class Enemy {
  constructor(x, y, tileSize, velocity, tileMap){
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;
    this.enemyImageIndex = 0;

    this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);

    this.directionTimerDefault = this.#random(10, 40);
    this.directionTimer = this.directionTimerDefault;

    this.enemyAnimationTimerDefault = 10;
    this.enemyAnimationTimer = null;

    this.#loadImages();
  }

  draw(ctx) {
    this.#move();
    this.#loadImages();
    this.#animate();
    this.#changeDirection();
    ctx.drawImage(this.images[this.enemyImageIndex], this.x, this.y, this.tileSize, this.tileSize);
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
    }if(
      this.movingDirection != null &&
      this.enemyAnimationTimer == null
      ){
        this.enemyImageIndex = 1;
        this.enemyAnimationTimer = this.enemyAnimationTimerDefault;
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
    if(this.movingDirection === 3){

      this.dragN1 = new Image();
      this.dragN1.src = dragN1;

      this.dragN2 = new Image();
      this.dragN2.src = dragN2;

      this.dragN3 = new Image();
      this.dragN3.src = dragN3;

      this.dragN4 = new Image();
      this.dragN4.src = dragN4;

      this.dragN5 = new Image()
      this.dragN5.src = dragN5

   }else if(this.movingDirection === 2){
      this.dragN1 = new Image();
      this.dragN1.src = dragN1v;

      this.dragN2 = new Image();
      this.dragN2.src = dragN2v;

      this.dragN3 = new Image();
      this.dragN3.src = dragN3v;

      this.dragN4 = new Image();
      this.dragN4.src = dragN4v;

      this.dragN5 = new Image()
      this.dragN5.src = dragN5v;
   }

    this.images = [
      this.dragN1,
      this.dragN2,
      this.dragN3,
      this.dragN4,
      this.dragN5
    ]

}

#animate() {
  if(this.enemyAnimationTimer == null){
    return;
  }
  this.enemyAnimationTimer--;
  if(this.enemyAnimationTimer ==0){
    this.enemyAnimationTimer = this.enemyAnimationTimerDefault;
    this.enemyImageIndex++;
    if(this.enemyImageIndex == this.images.length)
      this.enemyImageIndex = 0;
  }
}

}
