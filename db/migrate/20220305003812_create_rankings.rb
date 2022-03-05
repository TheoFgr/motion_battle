class CreateRankings < ActiveRecord::Migration[6.1]
  def change
    create_table :rankings do |t|
      t.integer :total_kills
      t.integer :total_wins
      t.integer :total_scores
      t.time :ingame_times

      t.timestamps
    end
  end
end
