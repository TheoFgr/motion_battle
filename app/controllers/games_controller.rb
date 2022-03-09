class GamesController < ApplicationController
  def show
    @game = Game.find(params[:id])
    @participations = @game.participations
  end

  def create
    @game = Game.find_by(status: :waiting)
    @game ||= Game.create(status: :waiting, started_at: DateTime.now)
    redirect_to game_path(@game)
  end
end
