import { Controller } from "@hotwired/stimulus"
import consumer from "../channels/consumer"
import Game from "../games/game.js"

export default class extends Controller {
  static values = { gameId: Number }
  static targets = ["gameContainer"]

  start() {
    this.channel = consumer.subscriptions.create(
      { channel: "GameChannel", id: this.gameIdValue },
      {received: data => this.routeAction(data)}
    )
  }

  disconnect () {
    this.channel.unsubscribe()
  }

  routeAction(data){
    switch(data.action){
      case "game_starting":
        this.gameContainerTarget.innerHTML = data.content
        break;
      case "new_participation":
        this.gameContainerTarget.innerHTML = data.content;
        break;
      case "game_end":
        const event = new CustomEvent("game-end")
        window.dispatchEvent(event)
        this.gameContainerTarget.innerHTML = data.content;
        break;
    }
  }
}
