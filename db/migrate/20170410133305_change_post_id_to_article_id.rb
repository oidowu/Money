class ChangePostIdToArticleId < ActiveRecord::Migration
  def change
    rename_column :article_views, :post_id, :article_id
  end
end
