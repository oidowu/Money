class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render partial: "user", locals: {user: @user}
    else
      render json: @user.errors, status: 422
    end
  end

  def feed
    @posts = current_user.feed_posts
    render "api/posts/index"
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :avi)
  end
end
