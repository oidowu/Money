class Api::PostsController < ApplicationController
  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      render json: @post
    else
      render json: @post.errors
    end
  end

  def show
    @post = Post.find(params[:id])
    @post.handle_visit(current_user.id)
    render json: @post
  end

  private
  def post_params
    params.require(:post).permit(:title, :body)
  end
end
