class Participation < ApplicationRecord
  belongs_to :user
  belongs_to :game
  after_create :start_game_if_needed

  def start_game_if_needed
    game.start
  end
end
