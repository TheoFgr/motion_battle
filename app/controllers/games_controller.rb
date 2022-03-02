class GamesController < ApplicationController
  def show
    @game = Game.find(params[:id])
  end

  def create
    @game = Game.find_or_create_by(status: :waiting)
    redirect_to game_path(@game)
  end
end
