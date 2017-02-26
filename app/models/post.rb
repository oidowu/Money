class Post < ActiveRecord::Base
  validates :author_id, :title, :body, presence: true

  belongs_to :author,
    class_name: "User"

  has_many :post_views

  has_many :post_viewers,
    through: :post_views,
    source: :viewer

  def handle_visit(user_id)
    unless PostView.exists?(viewer_id: user_id, post_id: id)
      self.post_views.create!(viewer_id: user_id)
    end
  end
end
