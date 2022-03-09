import grass from "../images/carreMauve.jpg"
import wall from "../images/rsz-carreViolet.png"
import rock from "../images/tour1.jpg"
import obH from "../images/obH.jpg"
import obB from "../images/obB.jpg"
import obG from "../images/obG.jpg"
import obD from "../images/obD.jpg"
import obGD from "../images/obGD.jpg"
import obHB from "../images/obHB.jpg"
import Player from './player.js'
import { MovingDirection } from "./moving_direction"
import Enemy from "./enemy.js"


export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize

    this.wall = new Image();
    this.wall.src = wall

    this.grass = new Image();
    this.grass.src = grass

    this.rock = new Image();
    this.rock.src = rock

    this.obH = new Image();
    this.obH.src = obH

    this.obB = new Image();
    this.obB.src = obB

    this.obD = new Image();
    this.obD.src = obD

    this.obG = new Image();
    this.obG.src = obG

    this.obGD = new Image();
    this.obGD.src = obGD

    this.obHB = new Image();
    this.obHB.src = obHB
  };

  map = [
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 4],
    [4, 1, 8, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 8, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
    [4, 1, 7, 12, 12, 12, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 9, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 12, 12, 12, 10, 1, 4],
    [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
    [4, 1, 7, 12, 12, 12, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 12, 12, 12, 10, 1, 4],
    [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 8, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 8, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
  ]




  setCanvasSize(canvas){
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }

  getPlayer(velocity) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++){
        let tile = this.map[row][column];
        if (tile === 9) {
          this.map[row][column] = 0;
          return new Player(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this);
        }
      }
    }
  }

  getEnemies(velocity) {
    const enemies = [];
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++){
        const tile = this.map[row][column];
        if (tile === 8) {
          this.map[row][column] = 0;
          enemies.push(new Enemy(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this));
        }
      }
    }
    return enemies
  }

  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++){
        let tile = this.map[row][column];

        if (tile === 1) {
          this.#drawGrass(ctx, column, row, this.tileSize)
        }
        else if (tile === 4) {
          this.#drawWall(ctx, column, row, this.tileSize)
        }
        else if (tile === 3) {
          this.#drawRock(ctx, column, row, this.tileSize)
        }
        else if (tile === 5) {
          this.#drawobH(ctx, column, row, this.tileSize)
        }
        else if (tile === 6) {
          this.#drawobB(ctx, column, row, this.tileSize)
        }
        else if (tile === 7) {
          this.#drawobG(ctx, column, row, this.tileSize)
        }
        else if (tile === 10) {
          this.#drawobD(ctx, column, row, this.tileSize)
        }
        else if (tile === 11) {
          this.#drawobGD(ctx, column, row, this.tileSize)
        }
        else if (tile === 12) {
          this.#drawobHB(ctx, column, row, this.tileSize)
        }

      }
    }
  };


  didCollideWithEnvironment(x, y, direction) {

    if (direction == null){
      return;
    }
    if (
      Number.isInteger(x / this.tileSize) &&
      Number.isInteger(y / this.tileSize)
    ) {
      let column = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;

      switch (direction) {
        case MovingDirection.right:
          nextColumn = x + this.tileSize
          column = nextColumn / this.tileSize
          row = y / this.tileSize
          break;

        case MovingDirection.left:
          nextColumn = x - this.tileSize
          column = nextColumn / this.tileSize
          row = y / this.tileSize
          break;

        case MovingDirection.up:
          nextRow = y - this.tileSize
          row = nextRow / this.tileSize
          column = x / this.tileSize
          break;

        case MovingDirection.down:
          nextRow = y + this.tileSize
          row = nextRow / this.tileSize
          column = x / this.tileSize
          break;
      }
      const tile = this.map[row][column];
      if (tile == 4 ||
          tile == 2 ||
          tile == 3 ||
          tile == 5 ||
          tile == 6 ||
          tile == 7 ||
          tile == 10 ||
          tile == 11 ||
          tile == 12){
        return true;
      }

    }
    return false;
  }


  #drawWall(ctx, column, row, size) {
    ctx.drawImage(this.wall, column * size, row * size);
  }

  #drawGrass(ctx, column, row, size) {
    ctx.drawImage(this.grass, column * size, row * size);
  }

  #drawRock(ctx, column, row, size) {
    ctx.drawImage(this.rock, column * size, row * size);
  }
  #drawobH(ctx, column, row, size) {
    ctx.drawImage(this.obH, column * size, row * size);
  }

  #drawobB(ctx, column, row, size) {
    ctx.drawImage(this.obB, column * size, row * size);
  }

  #drawobD(ctx, column, row, size) {
    ctx.drawImage(this.obD, column * size, row * size);
  }

  #drawobG(ctx, column, row, size) {
    ctx.drawImage(this.obG, column * size, row * size);
  }

  #drawobGD(ctx, column, row, size) {
    ctx.drawImage(this.obGD, column * size, row * size);
  }

  #drawobHB(ctx, column, row, size) {
    ctx.drawImage(this.obHB, column * size, row * size);
  }

}
