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

    this.playerAnimationTimerDefault = 10;
    this.playerAnimationTimer = null;


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
    ctx.drawImage(this.playerImages[this.playerImageIndex], this.x, this.y, this.tileSize, this.tileSize)
    this.#eatEnemy(enemies);
    this.#animate();
  }


  #eatEnemy(enemies){
    const collideEnemies = enemies.filter((enemy)=>enemy.collideWith(this));
    collideEnemies.forEach((enemy) =>{
      enemies.splice(enemies.indexOf(enemy),1);
      this.score += 100;
      this.kill += 1;

      // patch la participation
      this.#patchParticipation();


      if (this.score == 100) {
        Rails.ajax({
          type: "PATCH",
          url: window.location.href
        })
      }
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
    const playerImage1 = new Image();
    playerImage1.src = player1;

    const playerImage2 = new Image();
    playerImage2.src = player2;

    const playerImage3 = new Image();
    if (this.x >= 0) {
      playerImage3.src = player3;
    }else {
      playerImage3.src = player3.mirrorImage(ctx, image, 0, 0, true, false);
    }

    const playerImage4 = new Image();
    playerImage4.src = player4;

    const playerImage5 = new Image();
    playerImage5.src = player5;

    const playerImage6 = new Image();
    playerImage6.src = player6;

    const playerImage7 = new Image();
    playerImage7.src = player7;

    const playerImage8 = new Image();
    playerImage8.src = player8;

    const playerImage9 = new Image();
    playerImage9.src = player9;

    const playerImage10 = new Image();
    playerImage10.src = player10;

    this.playerImages = [
      playerImage1,
      playerImage2,
      playerImage3,
      playerImage4,
      playerImage5,
      playerImage6,
      playerImage7,
      playerImage8,
      playerImage9,
      playerImage10,
    ];
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
      this.y -= this.velocity
      this.playerRotation = this.Rotation.up;
      break;

    case MovingDirection.down:
      this.y += this.velocity
      this.playerRotation = this.Rotation.down;
      break;

    case MovingDirection.left:
      this.x -= this.velocity
      this.playerRotation = this.Rotation.left;
      break;

    case MovingDirection.right:
      this.x += this.velocity
      this.playerRotation = this.Rotation.right;
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
