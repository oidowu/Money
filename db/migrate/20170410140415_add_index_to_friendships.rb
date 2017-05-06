class AddIndexToFriendships < ActiveRecord::Migration
  def change
    add_index :friendships, [:friender_id, :friendee_id], unique: true
  end
end
