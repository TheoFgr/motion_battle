import { Controller } from "@hotwired/stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  static values = { gameId: Number }
  static targets = ["gameContainer"]

  connect() {
    this.channel = consumer.subscriptions.create(
      { channel: "GameChannel", id: this.gameIdValue },
      {received: data => this.routeAction(data)}
    )
    }

  routeAction(data){
    console.log(data)
    switch(data.action){
      case "game_starting":
        this.gameContainerTarget.innerHTML = data.content
        break;
      case "new_participation":
        this.gameContainerTarget.innerHTML = data.content;
        break;
    }
  }
}
