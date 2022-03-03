class GamesController < ApplicationController
  def show
    @game = Game.find(params[:id])
  end

  def create
    @game = Game.create(status: :waiting)
    redirect_to game_path(@game)
  end
end
