class CreateWaitingRooms < ActiveRecord::Migration[6.1]
  def change
    create_table :waiting_rooms do |t|
      t.integer :score
      t.references :user, null: false, foreign_key: true
      t.references :game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
