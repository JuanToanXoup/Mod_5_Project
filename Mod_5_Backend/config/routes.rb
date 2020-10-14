Rails.application.routes.draw do
  resources :users
  resources :class_periods
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
end