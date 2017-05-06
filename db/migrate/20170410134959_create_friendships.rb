class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :friender_id, null: false
      t.integer :friendee_id, null: false
      t.string :status

      t.timestamps
    end
  end
end
