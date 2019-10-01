Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/', action: :hello, controller: 'home'
  post '/search', action: :search, controller: 'home'
  get '/detail/:id', action: :detail, controller: 'home'
end
