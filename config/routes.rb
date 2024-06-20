# Rails.application.routes.draw do
  # namespace :api do
  #   get 'attendances/index'
  # end
#   namespace :api do
#     resources :details, only: [:index, :show]
#   end
#   # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

#   # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
#   # Can be used by load balancers and uptime monitors to verify that the app is live.
#   get "up" => "rails/health#show", as: :rails_health_check

#   # Defines the root path route ("/")
#   # root "posts#index"
# end
# config/routes.rb
# Rails.application.routes.draw do
  # namespace :api do
  #   get 'attendances/index'
  # end
#   namespace :api do
#     resources :details, only: [:index, :show, :create]
#   end
# end
# Rails.application.routes.draw do
#   namespace :api do
#     resources :employees
#   end
# end
# config/routes.rb

Rails.application.routes.draw do
  namespace :api do
    # Define routes for attendances controller
    resources :attendances
    #, only: [:index, :show, :create, :update, :destroy]

    # Define routes for employees controller
    resources :employees
    get 'payrolls/calculate', to: 'payrolls#calculate'
  end

  # Additional routes can be defined outside the namespace if needed
end

