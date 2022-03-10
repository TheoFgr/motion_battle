import TileMap from './tile_map.js'

export default class Game {
  constructor() {
    this.tileSize = 32;
    this.velocity = 2;
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.tileMap = new TileMap(this.tileSize);
    this.Player = this.tileMap.getPlayer(this.velocity);
    this.enemies = this.tileMap.getEnemies(this.velocity);
    this.masters = [];
    this.tileMap.setCanvasSize(this.canvas);
  }

  #gameLoop = () => {
    this.tileMap.draw(this.ctx);
    this.Player.draw(this.ctx, this.enemies, this.masters);
    this.enemies.forEach(enemy => enemy.draw(this.ctx));
    if(this.Player.score === 400){
      if (this.masters.length < 1) {
        this.masters = this.tileMap.getMaster(this.velocity);
      }
      this.masters.forEach(master => master.draw(this.ctx));
    }
    this.ctx.font = '24px Helvetica';
    this.ctx.fillText("Score: " + this.Player.score, 20, 40);
  }

  start() {
    this.intervalLoop = setInterval(this.#gameLoop, 1000 / 75);
  }

  stop() {
    clearInterval(this.intervalLoop)
  }
}
