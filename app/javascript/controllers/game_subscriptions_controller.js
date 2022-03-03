import { Controller } from "@hotwired/stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  static values = { gameId: Number }
  static targets = ["participations", "game"]

  connect() {
    this.channel = consumer.subscriptions.create(
      { channel: "GameChannel", id: this.gameIdValue },
      {received: data => this.routeAction(data)}
    )
    }

  routeAction(data){
    switch(data.action){
      case "new_participation":
        this.participationsTarget.insertAdjacentHTML("beforeend", data.content)
        break;
      case "game_starting":
        this.gameTarget.innerHTML = data.content
        break;
    }
  }
}
