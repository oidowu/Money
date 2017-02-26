class AddAttachmentAviToUsers < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.attachment :avi
    end
  end

  def self.down
    remove_attachment :users, :avi
  end
end
