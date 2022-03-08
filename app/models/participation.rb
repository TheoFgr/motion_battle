class Participation < ApplicationRecord
  belongs_to :user
  belongs_to :game

  def elapsed_time
    (game.ended_at - game.started_at).round(2)
  end
end
