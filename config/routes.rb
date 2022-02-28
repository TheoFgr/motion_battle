Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'

  resources :users, only: [:show]

  resources :games, except: [:destroy, :edit, :update, :index] do
      resources :waiting_rooms, only: [:index]
    end
end
