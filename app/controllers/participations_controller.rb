class ParticipationsController < ApplicationController
  def index

    @participations = Participation.last(2)
  end

  def create
    @participation = Participation.new
    @participation.user = current_user
    @game = Game.last
    @participation.game = @game
    if @participation.save
      GameChannel.broadcast_to(
        @game,{
          action: "new_participation",
          content: render_to_string(partial: "participation", locals: { participation: @participation })
        }
        )
    else
      redirect_to root_path
    end
  end
end
