class AddFeedRefToArticles < ActiveRecord::Migration
  def change
    add_reference :articles, :feed, index: true, foreign_key:true
  end
end
