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
          content: render_to_string(partial: "participations", locals: { participations: @participations, hide_button: true })}
      )
      @game.start_if_needed
    else
      redirect_to root_path
    end
  end

  def update
    @participation = Participation.where(user_id: params['user_id'], game_id: params['game_id']).first
    # TODO METTRE UNE VALEUR PAR DEFAUT ET INCREMENTER
    @participation.update(score: @participation.score += 100, kill_count: @participation.kill_count += 1)

    if @participation.score == 500
      @game = Game.find(params['game_id'])
      @game.update(ended_at: DateTime.now, status: :end)
      @participations = @game.participations.order(score: :desc)
      GameChannel.broadcast_to(
        @game,{
          action: "game_end",
          content: render_to_string(partial: "games/results", locals: { participations: @participations })
        }
      )
    end
  end
end
