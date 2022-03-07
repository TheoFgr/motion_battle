class RankingsController < ApplicationController
  def index
    @rankings = Ranking.all
  end

  def rules
  end
end
