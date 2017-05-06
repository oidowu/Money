class Article < ActiveRecord::Base
  belongs_to :feed

  has_many :views,
    class_name: "ArticleView"

  has_many :viewers,
    through: :views,
    source: :viewer
end
