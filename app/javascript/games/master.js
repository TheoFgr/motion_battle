import { MovingDirection } from "./moving_direction";
// img boss right
import master1 from "../images/mas1.png";
import master2 from "../images/mas2.png";
import master3 from "../images/mas3.png";
import master4 from "../images/mas4.png";
import master5 from "../images/mas5.png";
import master6 from "../images/mas6.png";
import master7 from "../images/mas7.png";
import master8 from "../images/mas8.png";
import master9 from "../images/mas9.png";
import master10 from "../images/mas10.png";
//im boss left
import master1v from "../images/mas1v.png";
import master2v from "../images/mas2v.png";
import master3v from "../images/mas3v.png";
import master4v from "../images/mas4v.png";
import master5v from "../images/mas5v.png";
import master6v from "../images/mas6v.png";
import master7v from "../images/mas7v.png";
import master8v from "../images/mas8v.png";
import master9v from "../images/mas9v.png";
import master10v from "../images/mas10v.png";
import { left } from "@popperjs/core";

export default class Master {
  constructor(x, y, tileSize, velocity, tileMap){
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity ;
    this.tileMap = tileMap;
    this.masterImageIndex = 0;

    this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);

    this.directionTimerDefault = this.#random(5, 20);
    this.directionTimer = this.directionTimerDefault;

    this.masterAnimationTimerDefault = 10;
    this.masterAnimationTimer = null;

    this.#loadImages();
  }

  draw(ctx) {
    this.#move();
    this.#loadImages();
    this.#animate();
    this.#changeDirection();
    ctx.drawImage(this.images[this.masterImageIndex], this.x, this.y, this.tileSize, this.tileSize);
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
        this.masterAnimationTimer == null
        ){
          this.masterImageIndex = 1;
          this.masterAnimationTimer = this.masterAnimationTimerDefault;
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

      this.master1 = new Image();
      this.master1.src = master1;

      this.master2 = new Image();
      this.master2.src = master2;

      this.master3 = new Image();
      this.master3.src = master3;

      this.master4 = new Image();
      this.master4.src = master4;

      this.master5 = new Image()
      this.master5.src = master5

      this.master6 = new Image()
      this.master6.src = master6

      this.master7 = new Image()
      this.master7.src = master7

      this.master8 = new Image()
      this.master8.src = master8

      this.master9 = new Image()
      this.master9.src = master9

      this.master10 = new Image()
      this.master10.src = master10

    }else if(this.movingDirection === 2){
      this.master1 = new Image();
      this.master1.src = master1v;

      this.master2 = new Image();
      this.master2.src = master2v;

      this.master3 = new Image();
      this.master3.src = master3v;

      this.master4 = new Image();
      this.master4.src = master4v;

      this.master5 = new Image()
      this.master5.src = master5v;

      this.master6 = new Image()
      this.master6.src = master6v;

      this.master7 = new Image()
      this.master7.src = master7v;

      this.master8 = new Image()
      this.master8.src = master8v;

      this.master9 = new Image()
      this.master9.src = master9v;

      this.master10 = new Image()
      this.master10.src = master10v;
    }

    this.images = [
      this.master1,
      this.master2,
      this.master3,
      this.master4,
      this.master5,
      this.master6,
      this.master7,
      this.master8,
      this.master9,
      this.master10
    ]

  }

  #animate() {
    if(this.masterAnimationTimer == null){
      return;
    }
    this.masterAnimationTimer--;
    if(this.masterAnimationTimer ==0){
      this.masterAnimationTimer = this.masterAnimationTimerDefault;
      this.masterImageIndex++;
      if(this.masterImageIndex == this.images.length)
        this.masterImageIndex = 0;
    }
  }

}
