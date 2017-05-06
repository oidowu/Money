Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    get "users/feed", to: "users#feed"
    resources :users, only: [:create, :show]
    resources :posts, only: [:create, :show]
    resources :article_views, only: [:create]
  end

  get "/auth/:provider/callback", to: "api/sessions#create"

  get "*path", to: "static_pages#root"
end
