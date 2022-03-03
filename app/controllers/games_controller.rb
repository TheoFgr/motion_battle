class GamesController < ApplicationController
  def show
    @game = Game.find(params[:id])
  end

  def create
    @game = Game.find_by(status: :waiting)
    @game = Game.create(status: :waiting) unless @game
    redirect_to game_path(@game)
  end
end
