@posts.each do |post|
  json.set! post.id do
    json.(post, :title, :body, :id)
  end
end
