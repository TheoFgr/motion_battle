class RankingsController < ApplicationController
  def index
    @rankings = Ranking.all
  end
end
