class RankingsController < ApplicationController
  def index
<<<<<<< HEAD
    @winners = Game.winners_with_times.first(10)
=======
    @winners = Game.winners_with_times.first(6)
>>>>>>> 6ea6c8f213b71786b8cc5d82f7e1e9baca6e1fcd
    # @datas = []
    # User.all.each do |user|
    #   data = { user: user }
    #   times = []
    #   user.participations.each do |participation|
    #     next if participation.game.started_at == nil
    #     next if participation.game.ended_at == nil
    #     next if participation.elapsed_time == nil
    #     times << participation.elapsed_time unless (participation.elapsed_time == nil) || (participation == nil)
    #   end
    #   data[:time] = times.min unless times.min == nil
    #   @datas << data
    # end
  end

  def rules
  end
end
