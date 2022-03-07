Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'


  resources :rankings, only: [:index] do
    collection do
      get 'rules'
    end
  end

  resources :games, except: [:destroy, :edit, :index] do
    resources :participations, only: [:index]
  end

  resources :participations, only: [:create]
  resource :participations, only: [:update]
end
