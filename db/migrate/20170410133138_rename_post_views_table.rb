class RenamePostViewsTable < ActiveRecord::Migration
  def change
    rename_table :post_views, :article_views
  end
end
