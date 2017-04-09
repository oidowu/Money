class ChangeColumnNameFromContentToSummary < ActiveRecord::Migration
  def change
    rename_column :articles, :content, :summary
  end
end
