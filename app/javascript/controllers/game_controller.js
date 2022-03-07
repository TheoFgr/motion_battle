import { Controller } from "stimulus"
import { game } from "../games/game.js"

export default class extends Controller {

  connect() {
    game()
  }
}
