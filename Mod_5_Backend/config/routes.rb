Rails.application.routes.draw do
  resources :users
  resources :class_periods
  resources :notes
  get '/class_esl/:id', to: 'class_periods#class_esl'
  get '/getclass/:id', to: 'class_periods#getclass'
  get '/class_allergies/:id', to: 'class_periods#class_allergies'
  get '/class_gender/:id', to: 'class_periods#class_gender'
  get '/setuser', to: 'users#setuser'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  post '/search', to: 'users#search'

end