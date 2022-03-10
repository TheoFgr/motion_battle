import { MovingDirection } from "./moving_direction";
// import master1 from "../images/master1.png";
// import master2 from "../images/master2.png";
// import master3 from "../images/master3.png";
// import master4 from "../images/master4.png";
// import master5 from "../images/masterN5.png";
import tour1 from "../images/tour1.jpg"

export default class Master {
  constructor(x, y, tileSize, velocity, tileMap){
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.#loadImages();

    this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);

    this.directionTimerDefault = this.#random(1, 10);
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

    // this.masterN1 = new Image();
    // this.masterN1.src = masterN1;

    // this.masterN2 = new Image();
    // this.masterN2.src = masterN2;

    // this.masterN3 = new Image();
    // this.masterN3.src = masterN3;

    // this.masterN4 = new Image();
    // this.masterN4.src = masterN4;

    // this.masterN5 = new Image()
    // this.masterN5.src = masterN5

    this.tour1 = new Image();
    this.tour1.src = tour1;

    this.images =
    this.tour1;

  }

}
