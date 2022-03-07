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

  def update
    @game = Game.find(params[:id])
    @game.update(ended_at: DateTime.now, status: :end)
    @participations = @game.participations
    GameChannel.broadcast_to(
      @game,{
        action: "game_end",
        content: render_to_string(partial: "results", locals: { participations: @participations })
      }
    )
  end
end
