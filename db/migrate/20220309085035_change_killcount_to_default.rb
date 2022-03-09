class ChangeKillcountToDefault < ActiveRecord::Migration[6.1]
  def change
    change_column_default :participations, :kill_count, 0
  end
end
