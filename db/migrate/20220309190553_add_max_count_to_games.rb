class AddMaxCountToGames < ActiveRecord::Migration[6.1]
  def change
    add_column :games, :max_count, :integer, default: 2
  end
end
