class Api::ArticleViewsController < ApplicationController

  before_action :user_already_viewed

  def create
    article_view = current_user.article_views.new(article_view_params)
    if article_view.save
      head :no_content
    else
      render json: ["It didn't work"], status: 422
    end
  end

  private

  def user_already_viewed
    head :no_content if current_user.article_views.exists?(article_view_params)
  end

  def article_view_params
    params.require(:article_view).permit(:article_id)
  end
end
