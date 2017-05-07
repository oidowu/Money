class Article < ActiveRecord::Base
  belongs_to :feed

  has_attached_file :pic, styles: { feed: "500x300", thumb: "100x100" }, default_url: "https://img.washingtonpost.com/rf/image_90w/2010-2019/WashingtonPost/2017/04/08/National-Politics/Images/APTOPIX_Trump_US_Syria_05774-45ee6.jpg"
  validates_attachment_content_type :pic, content_type: /\Aimage\/.*\Z/

  has_many :views,
    class_name: "ArticleView"

  has_many :viewers,
    through: :views,
    source: :viewer
end
