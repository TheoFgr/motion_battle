import { Controller } from "@hotwired/stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  static values = { gameId: Number }
  static targets = ["participations"]

  connect() {
    this.channel = consumer.subscriptions.create(
      { channel: "GameChannel", id: this.gameIdValue },
      {received: data => this.routeAction(data)}

    )
    console.log(`Subscribe to the game with the id ${this.gameIdValue}.`)
    }
  routeAction(data){
    switch(data.action){
      case "new_participation":
        this.participationsTarget.insertAdjacentHTML("beforeend", data.content)
        break;
    }
  }
}
