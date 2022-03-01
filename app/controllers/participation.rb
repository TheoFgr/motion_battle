class WaitingRoomsController < ApplicationController
  def index
    @waiting_rooms = WaitingRoom.all
  end
end
