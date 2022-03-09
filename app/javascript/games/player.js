// player image to right
import player1 from "../images/cher1.png";
import player2 from "../images/cher2.png";
import player3 from "../images/cher3.png";
import player4 from "../images/cher4.png";
import player5 from "../images/cher5.png";
import player6 from "../images/cher6.png";
import player7 from "../images/cher7.png";
import player8 from "../images/cher8.png";
import player9 from "../images/cher9.png";
import player10 from "../images/cher10.png";
// player image to left
import player1v from "../images/cher1v.png";
import player2v from "../images/cher2v.png";
import player3v from "../images/cher3v.png";
import player4v from "../images/cher4v.png";
import player5v from "../images/cher5v.png";
import player6v from "../images/cher6v.png";
import player7v from "../images/cher7v.png";
import player8v from "../images/cher8v.png";
import player9v from "../images/cher9v.png";
import player10v from "../images/cher10v.png";
// import sound
import test from "../sounds/pfou.m4a";
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
    this.angle = 0;
    this.playerImageIndex = 0;

    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;



    this.playerAnimationTimerDefault = 10;
    this.playerAnimationTimer = null;

    this.wakaSound = new Audio(test)


    document.addEventListener("keydown", this.#keydown)

    this.#loadPlayerImages();
  }

  Rotation =  {
    right:0,
    down:1,
    left:2,
    up:3,
  }

  draw(ctx, enemies) {
    this.#move();
    this.#loadPlayerImages();
    this.#animate();
    ctx.drawImage(this.playerImages[this.playerImageIndex], this.x, this.y, this.tileSize, this.tileSize)
    this.#eatEnemy(enemies);
  }


  #eatEnemy(enemies){
    const collideEnemies = enemies.filter((enemy)=>enemy.collideWith(this));
    collideEnemies.forEach((enemy) =>{
      enemies.splice(enemies.indexOf(enemy),1);
      this.wakaSound.play();
      this.score += 100;
      this.kill += 1;


      // patch la participation
      this.#patchParticipation();
    });
  }

  #patchParticipation() {
    let url = window.location.pathname;
    let gameId = url.substring(url.lastIndexOf('/') + 1);
    let userId = document.getElementById('canvas-container').dataset.userId

    let formData = new FormData()
    formData.append('game_id', gameId);
    formData.append('user_id', userId);

    Rails.ajax({
      url: '/participations',
      type: 'PATCH',
      data: formData
    })
  }

  #loadPlayerImages() {
    if (this.angle === 0) {
      this.playerImage1 = new Image();
      this.playerImage1.src = player1;

      this.playerImage2 = new Image();
      this.playerImage2.src = player2;

      this.playerImage3 = new Image();
      this.playerImage3.src = player3;

      this.playerImage4 = new Image();
      this.playerImage4.src = player4;

      this.playerImage5 = new Image();
      this.playerImage5.src = player5;

      this.playerImage6 = new Image();
      this.playerImage6.src = player6;

      this.playerImage7 = new Image();
      this.playerImage7.src = player7;

      this.playerImage8 = new Image();
      this.playerImage8.src = player8;

      this.playerImage9 = new Image();
      this.playerImage9.src = player9;

      this.playerImage10 = new Image();
      this.playerImage10.src = player10;
    } else if (this.angle === 2) {
      this.playerImage1 = new Image();
      this.playerImage1.src = player1v;

      this.playerImage2 = new Image();
      this.playerImage2.src = player2v;

      this.playerImage3 = new Image();
      this.playerImage3.src = player3v;

      this.playerImage4 = new Image();
      this.playerImage4.src = player4v;

      this.playerImage5 = new Image();
      this.playerImage5.src = player5v;

      this.playerImage6 = new Image();
      this.playerImage6.src = player6v;

      this.playerImage7 = new Image();
      this.playerImage7.src = player7v;

      this.playerImage8 = new Image();
      this.playerImage8.src = player8v;

      this.playerImage9 = new Image();
      this.playerImage9.src = player9v;

      this.playerImage10 = new Image();
      this.playerImage10.src = player10v;
  }

    this.playerImages = [
      this.playerImage1,
      this.playerImage2,
      this.playerImage3,
      this.playerImage4,
      this.playerImage5,
      this.playerImage6,
      this.playerImage7,
      this.playerImage8,
      this.playerImage9,
      this.playerImage10,
    ];
  }

  #keydown = (event) => {
    //up
    if (event.keyCode == 38) {
      if (this.currentMovingDirection == MovingDirection.down)
          this.currentMovingDirection = MovingDirection.up;
          this.requestedMovingDirection = MovingDirection.up;
    }

    //down
    if (event.keyCode == 40) {
      if (this.currentMovingDirection == MovingDirection.up)
          this.currentMovingDirection = MovingDirection.down;
          this.requestedMovingDirection = MovingDirection.down;
    }

    //left
    if (event.keyCode == 37) {
      if (this.currentMovingDirection == MovingDirection.right)
          this.currentMovingDirection = MovingDirection.left;
          this.requestedMovingDirection = MovingDirection.left;
    }

    //right
    if (event.keyCode == 39) {
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
        this.playerAnimationTimer = null;
        this.playerImageIndex = 1;
      return
    }else if(
            this.currentMovingDirection != null &&
            this.playerAnimationTimer == null
            ){
              this.playerAnimationTimer = this.playerAnimationTimerDefault;
            }


  switch (this.currentMovingDirection) {
    case MovingDirection.up:
      this.y -= this.velocity;
      this.angle = this.Rotation.up;
      break;

    case MovingDirection.down:
      this.y += this.velocity;
      this.angle = this.Rotation.down;
      break;

    case MovingDirection.left:
      this.x -= this.velocity;
      this.angle = this.Rotation.left;
      break;

    case MovingDirection.right:
      this.x += this.velocity;
      this.angle = this.Rotation.right;
      break;
  }

}

#animate() {
  if(this.playerAnimationTimer == null){
    return;
  }
  this.playerAnimationTimer--;
  if(this.playerAnimationTimer ==0){
    this.playerAnimationTimer = this.playerAnimationTimerDefault;
    this.playerImageIndex++;
    if(this.playerImageIndex == this.playerImages.length)
      this.playerImageIndex = 0;
  }
}





}
