class RemoveFeedIdFromArticle < ActiveRecord::Migration
  def change
    remove_column :articles, :feed_id, :integer
  end
end
