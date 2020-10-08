Rails.application.routes.draw do
  # resources :users
  resources :books
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
end