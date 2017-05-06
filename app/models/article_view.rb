class ArticleView < ActiveRecord::Base
  validates :viewer_id, :article_id, presence: true
  validates :viewer_id, uniqueness: { scope: :article_id }

  belongs_to :viewer,
    class_name: "User"

  belongs_to :article

end
