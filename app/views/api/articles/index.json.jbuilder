@articles.each do |article|
  json.set! article.id do
    json.(article, :title, :id, :url, :image_url)
    json.viewers do
      json.array! article.viewers do |viewer|
        json.(viewer, :username, :id)
        json.image_url viewer.avi.url
      end
    end
  end
end
