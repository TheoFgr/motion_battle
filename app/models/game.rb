class Game < ApplicationRecord
  has_many :participations, dependent: :destroy
  enum status: [:waiting, :start, :end]
  MAX_PLAYERS_COUNT = 2
  def start_if_needed
    return false unless participations.count == MAX_PLAYERS_COUNT
    if self.start!
      GameChannel.broadcast_to(
        self,{
          action: “game_starting”,
          content: ActionController::Base.new.render_to_string(partial: “games/gameplay”, locals: { game: self })
        }
      )
    end
  end
end
