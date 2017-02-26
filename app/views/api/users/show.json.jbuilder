json.partial! "api/users/user", user: @user
json.posts do
  @user.posts.each do |post|
    json.set! post.id do
      json.(post, :author_id, :title, :body, :id)
    end
  end
end
