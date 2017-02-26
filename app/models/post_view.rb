class PostView < ActiveRecord::Base
  validates :viewer_id, :post_id, presence: true
  validates :viewer_id, uniqueness: { scope: :post_id }
  validate :user_cant_view_own_post

  belongs_to :viewer,
    class_name: "User"

  belongs_to :post


  private
  
  def user_cant_view_own_post
    if viewer_id == post.author_id
      errors[:viewer_id] << "Author can't view own post"
    end
  end
end
