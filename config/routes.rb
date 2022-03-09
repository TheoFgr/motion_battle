Rails.application.routes.draw do
  get 'users/show'
  devise_for :users
  root to: 'pages#home'

  resources :users, only: [:show]

  resources :rankings, only: [:index] do
    collection do
      get 'rules'
      get 'synopsis'
    end
  end

  resources :games, except: [:destroy, :edit, :index] do
    resources :participations, only: [:index]
  end

  resources :participations, only: [:create]
  resource :participations, only: [:update]
end
