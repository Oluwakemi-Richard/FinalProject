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
# Rails.application.routes.draw do
#   namespace :api do
#     resources :employees
#     resources :appraisals, except: [:new, :edit] do
#       collection do
#         get 'check', to: 'appraisals#check'
#       end
#     end
#     resources :details, only: [:show, :update]
#     resources :attendances, only: [:index, :show, :update, :update] do
#       member do
#         put :check_in
#         put :check_out
#       end
#     end
#     # resources :shifts, only: [:index, :create]
#     resources :shifts, only: [:index, :create] do
#       collection do
#         get :upcoming_shifts
#         get :ongoing_shifts
#         get :past_shifts
#       end
#     end
#     resources :payrolls, only: [] do
#       collection do
#         get :calculate
#       end
#     end
#   end
# end

# Rails.application.routes.draw do
#   namespace :api do
#     resources :employees, only: [:index, :show] do
#       member do
#         get 'available_months', to: 'employees#available_months'
#       end
#     end

#     resources :appraisals, except: [:new, :edit] do
#       collection do
#         get 'check', to: 'appraisals#check'
#         get 'years', to: 'appraisals#years'
#         get ':employee_id/:year', to: 'appraisals#by_employee_and_year'
#       end
#     end

#     resources :details, only: [:show, :update]
#     resources :attendances, only: [:index, :show, :update] do
#       member do
#         put :check_in
#         put :check_out
#       end
#     end

#     resources :shifts, only: [:index, :create] do
#       collection do
#         get :upcoming_shifts
#         get :ongoing_shifts
#         get :past_shifts
#       end
#     end

#     resources :payrolls, only: [] do
#       collection do
#         get :calculate
#       end
#     end
#   end
# end

# Rails.application.routes.draw do
#   namespace :api do
#     resources :employees, only: [:index, :show] do
#       member do
#         get 'available_months', to: 'employees#available_months'
#       end

#       resources :leaves, only: [:index, :create] do
#         collection do
#           get 'total_leave_days'
#         end
#       end
#     end

#     resources :appraisals, except: [:new, :edit] do
#       collection do
#         get 'check', to: 'appraisals#check'
#         get 'years', to: 'appraisals#years'
#         get ':employee_id/:year', to: 'appraisals#by_employee_and_year'
#       end
#     end

#     resources :details, only: [:show, :update]
#     resources :attendances, only: [:index, :show, :update] do
#       member do
#         put :check_in
#         put :check_out
#       end
#     end

#     resources :shifts, only: [:index, :create] do
#       collection do
#         get :upcoming_shifts
#         get :ongoing_shifts
#         get :past_shifts
#       end
#     end

#     resources :payrolls, only: [] do
#       collection do
#         get :calculate
#       end
#     end
#   end
# end

Rails.application.routes.draw do
  namespace :api do
    resources :employees, only: [:index, :show] do
      member do
        get 'available_months', to: 'employees#available_months'
      end

      resources :leaves, only: [:index, :create, :destroy, :update] do
        collection do
          get 'total_leave_days'
        end
      end
    end
    # get 'leaves/pending', to: 'leaves#pending_all'  # Route for fetching pending leaves for all employees
    # resources :leaves, only: [:index, :create, :update, :destroy]
    #resources :pending_leaves, only: [:index]  # Route for fetching all pending leaves
    resources :pending_leaves, only: [:index] do
      member do
        put 'approve'
        put 'disapprove'
      end
    end

    resources :appraisals, except: [:new, :edit] do
      collection do
        get 'check', to: 'appraisals#check'
        get 'years', to: 'appraisals#years'
        get ':employee_id/:year', to: 'appraisals#by_employee_and_year'
      end
    end

    resources :details, only: [:show, :update]
    resources :attendances, only: [:index, :show, :update] do
      member do
        put :check_in
        put :check_out
      end
    end

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
