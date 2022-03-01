class GamesController < ApplicationController
  def show
    @game = Game.find(params[:id])
  end

  def new
    @game = Game.new
  end

  def create
    @game = Game.new(params_game)
    @game.save
    redirect_to user_game_path(@game)
  end

  private

  def params_game
    params.require(:game).permit(:status, :started_at, :ended_at)
  end
end
