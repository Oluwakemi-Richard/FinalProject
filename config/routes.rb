# Rails.application.routes.draw do
#   namespace :api do
#     resources :attendances
#     #, only: [:index, :show, :create, :update, :destroy]
#     resources :employees
#     get 'payrolls/calculate', to: 'payrolls#calculate'
#     resources :shifts, only: [:index, :create]
#     resources :details, only: [:show, :update]
#     #post 'attendances/check_in', to: 'attendances#check_in'
#     #post 'attendances/check_out', to: 'attendances#check_out'
#   end
# end
# config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    resources :employees
    resources :details, only: [:show, :update]
    resources :attendances, only: [:index, :show, :update, :update] do
      member do
        put :check_in
        put :check_out
      end
    end
    # resources :shifts, only: [:index, :create]
    resources :shifts, only: [:index, :create] do
      collection do
        get :upcoming_shifts
        get :ongoing_shifts
        get :past_shifts
      end
    end
    resources :payrolls, only: [] do
      collection do
        get :calculate
      end
    end
  end
end


