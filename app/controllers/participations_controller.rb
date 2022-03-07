class ParticipationsController < ApplicationController
  def index
    @participations = Participation.last(2)
  end

  def create
    @participation = Participation.new
    @participation.user = current_user
    @game = Game.last
    @participation.game = @game
    return if @game.participations.where(user: current_user).any?

    if @participation.save
      @participations = @game.participations
      GameChannel.broadcast_to(
        @game,{
          action: "new_participation",
          content: render_to_string(partial: "participations", locals: { participations: @participations })}
      )
      @game.start_if_needed
    else
      redirect_to root_path
    end
  end

  def update
    @participation = Participation.where(user_id: params['user_id'], game_id: params['game_id']).first
    # TODO METTRE UNE VALEUR PAR DEFAUT ET INCREMENTER
    @participation.update(score: 100, kill_count: 1)
  end
end
