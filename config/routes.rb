Rails.application.routes.draw do
  get 'users/show'
  devise_for :users
  root to: 'pages#home'

  resources :users, only: [:show]

  resources :rankings, only: [:index] do
    collection do
      get 'rules'
    end
  end

  resources :games, only: [:show, :create] do
    resources :participations, only: [:index]
  end

  resources :participations, only: [:create]
  resource :participations, only: [:update]
end
