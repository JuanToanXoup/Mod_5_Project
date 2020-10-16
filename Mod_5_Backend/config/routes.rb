Rails.application.routes.draw do
  resources :users
  resources :class_periods
  get '/getclass/:id', to: 'class_periods#getclass'
  get '/setuser', to: 'users#setuser'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
end