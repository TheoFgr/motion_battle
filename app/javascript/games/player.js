import player1 from "../images/player1.png";
import { MovingDirection } from "./moving_direction";
import Rails from '@rails/ujs';

export default class Player {
  constructor(x, y, tileSize, velocity, tileMap){
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;
    this.score = 0;
    this.kill = 0;

    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;

    document.addEventListener("keydown", this.#keydown)

    this.#loadPlayerImages();
  }


  draw(ctx, enemies) {
    this.#move();
    ctx.drawImage(this.playerImages[this.playerImageIndex], this.x, this.y, this.tileSize, this.tileSize)
    this.#eatEnemy(enemies);
  }

  #eatEnemy(enemies){
    const collideEnemies = enemies.filter((enemy)=>enemy.collideWith(this));
    collideEnemies.forEach((enemy) =>{
      enemies.splice(enemies.indexOf(enemy),1);
      this.score += 100;
      this.kill += 1;
      if (this.score == 100) {
        Rails.ajax({
          type: "PATCH",
          url: window.location.href
        })
      }
    });
  }

  #loadPlayerImages() {
    const playerImage1 = new Image();
    playerImage1.src = player1;

    this.playerImages = [playerImage1];
    this.playerImageIndex = 0;
  }

  #keydown = (event) => {
    //up
    if (event.keyCode == 38) {
      console.log('up')
      if (this.currentMovingDirection == MovingDirection.down)
          this.currentMovingDirection = MovingDirection.up;
          this.requestedMovingDirection = MovingDirection.up;
    }

    //down
    if (event.keyCode == 40) {
      console.log('down')
      if (this.currentMovingDirection == MovingDirection.up)
          this.currentMovingDirection = MovingDirection.down;
          this.requestedMovingDirection = MovingDirection.down;
    }

    //left
    if (event.keyCode == 37) {
      console.log('left')
      if (this.currentMovingDirection == MovingDirection.right)
          this.currentMovingDirection = MovingDirection.left;
          this.requestedMovingDirection = MovingDirection.left;
    }

    //right
    if (event.keyCode == 39) {
      console.log('right')
      if (this.currentMovingDirection == MovingDirection.left)
          this.currentMovingDirection = MovingDirection.right;
          this.requestedMovingDirection = MovingDirection.right;
    }
  }

#move() {
  if (this.currentMovingDirection !== this.requestedMovingDirection){
    if(
      Number.isInteger(this.x / this.tileSize) &&
      Number.isInteger(this.y / this.tileSize)
    ){
      if (
        !this.tileMap.didCollideWithEnvironment(
          this.x,
          this.y,
          this.requestedMovingDirection,
          )
        )

      this.currentMovingDirection = this.requestedMovingDirection;
    }

  }
  if (
    this.tileMap.didCollideWithEnvironment(
      this.x,
      this.y,
      this.currentMovingDirection,
      )
    ) {
      return
    }
  switch (this.currentMovingDirection) {
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
