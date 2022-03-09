import { Controller } from "stimulus"
import Game from "../games/game.js"

let game;

export default class extends Controller {

  connect() {
    game = new Game();
    game.start();
  }

  stop() {
    game.stop();
  }
}
