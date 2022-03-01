class ParticipationsController < ApplicationController
  def index
    @participations = Participation.all
  end

  def create
    @participation = Participation.new
    @participation.user = current_user
    @game = Game.find_or_create_by(status: :waiting)
    @participation.game = @game
    if @participation.save
      GameChannel.broadcast_to(
        @game,{
          action: "new_participation",
          content: render_to_string(partial: "participation", locals: { participation: @participation })
        }
        )
        redirect_to game_path(@participation.game)
    else
      redirect_to root_path
    end
  end
end
