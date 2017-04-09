class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :title
      t.string :content
      t.string :url
      t.string :author
      t.integer :feed_id
      t.datetime :published
    end
  end
end
