Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'

  resources :rankings, only: [:index]

  resources :games, except: [:destroy, :edit, :update, :index] do
      resources :participations, only: [:index]
    end

    resources :participations, only: [:create]
end
