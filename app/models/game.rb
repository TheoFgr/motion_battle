class Game < ApplicationRecord
  has_many :participations
  enum status:  [:waiting, :start, :end]
end
