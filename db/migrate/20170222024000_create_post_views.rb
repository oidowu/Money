class CreatePostViews < ActiveRecord::Migration
  def change
    create_table :post_views do |t|
      t.integer :viewer_id, null: false
      t.integer :post_id, null: false
    end
    add_index :post_views, [:viewer_id, :post_id], unique: true
    add_index :post_views, :post_id
  end
end
