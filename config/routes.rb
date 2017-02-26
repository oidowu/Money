Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    get "users/feed", to: "users#feed"
    resources :users, only: [:create, :show]
    resources :posts, only: [:create, :show]
  end

  get "*path", to: "static_pages#root"
end
