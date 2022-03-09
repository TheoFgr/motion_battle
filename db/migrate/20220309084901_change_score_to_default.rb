class ChangeScoreToDefault < ActiveRecord::Migration[6.1]
  def change
    change_column_default :participations, :score, 0
  end
end
