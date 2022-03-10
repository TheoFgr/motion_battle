class Game < ApplicationRecord
  has_many :participations, dependent: :destroy
  enum status: [:waiting, :start, :end]

  MAX_PLAYERS_COUNT = 6

  def winner
    participations.find do |participation|
      participation.score == 400
    end
  end

  def elapsed_time
    return 0 if ended_at == nil || started_at == nil
    (ended_at - started_at).round(2)
  end

  def self.winners_with_times
    Game.played_games.map do |game|
      { winner: game.winner, time: game.elapsed_time }
    end.sort_by { |hash| hash[:time] }
  end

  def self.played_games
    all.select { |game| game.status == "end" }
  end

  def start_if_needed
    return false unless participations.count == MAX_PLAYERS_COUNT
    if self.start!
      GameChannel.broadcast_to(
        self,{
          action: "game_starting",
          content: ActionController::Base.new.render_to_string(partial: "games/gameplay", locals: { game: self })
        }
      )
    end
  end
end
