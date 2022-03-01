class ChangeStatusToGame < ActiveRecord::Migration[6.1]
  def change
    change_column :games, :status, :integer, using: 'status::integer', default: 0
  end
end
