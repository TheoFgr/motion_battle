class Game < ApplicationRecord
  has_many :participations
  enum status:  [:waiting, :start, :end]

  MAX_PLAYERS_COUNT = 3

  def start_if_needed
    return false unless participations.count == MAX_PLAYERS_COUNT
    if self.start!
      GameChannel.broadcast_to(
        self,{
          action: "game_starting",
          content: ActionController::Base.new.render_to_string(partial: "games/gameplay", locals: { game: self })
        }
      )
    else

    end
  end
end
