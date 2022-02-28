class GamesController < ApplicationController
  def show
    @game = Game.find(params[:id])
  end

  def new
    @game = Game.new
  end

  def create
    @game = Game.new
    @game.save
    redirect_to user_game_path(@game)
  end
end
