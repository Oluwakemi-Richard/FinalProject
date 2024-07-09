# Rails.application.routes.draw do
#   devise_for :users, controllers: {
#     sessions: 'users/sessions',
#     registrations: 'users/registrations'
#   }
#   namespace :api do
#     resources :employees do
#       member do
#         get 'available_months', to: 'employees#available_months'
#       end

#       resources :leaves, only: [:index, :create, :destroy, :update] do
#         collection do
#           get 'total_leave_days'
#         end
#       end
#     end
#     # get 'leaves/pending', to: 'leaves#pending_all'  # Route for fetching pending leaves for all employees
#     # resources :leaves, only: [:index, :create, :update, :destroy]
#     #resources :pending_leaves, only: [:index]  # Route for fetching all pending leaves
#     resources :pending_leaves, only: [:index] do
#       member do
#         put 'approve'
#         put 'disapprove'
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
#   devise_for :users, controllers: {
#     sessions: 'users/sessions',
#     registrations: 'users/registrations'
#   }

#   namespace :api do
#     # Add route for authentication status outside of the authenticated block
#     get 'auth/status', to: 'auth#status'

#     authenticated :user do
#       resources :employees do
#         member do
#           get 'available_months', to: 'employees#available_months'
#         end

#         resources :leaves, only: [:index, :create, :destroy, :update] do
#           collection do
#             get 'total_leave_days'
#           end
#         end
#       end

#       resources :pending_leaves, only: [:index] do
#         member do
#           put 'approve'
#           put 'disapprove'
#         end
#       end

#       resources :appraisals, except: [:new, :edit] do
#         collection do
#           get 'check', to: 'appraisals#check'
#           get 'years', to: 'appraisals#years'
#           get ':employee_id/:year', to: 'appraisals#by_employee_and_year'
#         end
#       end

#       resources :details, only: [:show, :update]
#       resources :attendances, only: [:index, :show, :update] do
#         member do
#           put :check_in
#           put :check_out
#         end
#       end

#       resources :shifts, only: [:index, :create] do
#         collection do
#           get :upcoming_shifts
#           get :ongoing_shifts
#           get :past_shifts
#         end
#       end

#       resources :payrolls, only: [] do
#         collection do
#           get :calculate
#         end
#       end
#     end
#   end
#   # Root route
#   # root to: 'home#index'

#   # If unauthenticated, redirect to login
#   unauthenticated do
#     root to: 'devise/sessions#new'
#   end
# end

# Rails.application.routes.draw do
#   root 'home#index'

#   devise_for :users, controllers: {
#     sessions: 'users/sessions',
#     registrations: 'users/registrations'
#   }

#   devise_scope :user do
#     # Custom routes for Devise controllers
#     get 'signup', to: 'devise/registrations#new'
#     get 'login', to: 'devise/sessions#new'
#     get 'logout', to: 'devise/sessions#destroy'

#     unauthenticated do
#       # Redirect to login page for unauthenticated users
#       match '*path', to: 'devise/sessions#new', via: :all
#     end
#   end

#   namespace :api do
#     # Add route for authentication status outside of the authenticated block
#     get 'auth/status', to: 'auth#status'

#     authenticated :user do
#       resources :employees do
#         member do
#           get 'available_months', to: 'employees#available_months'
#         end

#         resources :leaves, only: [:index, :create, :destroy, :update] do
#           collection do
#             get 'total_leave_days'
#           end
#         end
#       end

#       resources :pending_leaves, only: [:index] do
#         member do
#           put 'approve'
#           put 'disapprove'
#         end
#       end

#       resources :appraisals, except: [:new, :edit] do
#         collection do
#           get 'check', to: 'appraisals#check'
#           get 'years', to: 'appraisals#years'
#           get ':employee_id/:year', to: 'appraisals#by_employee_and_year'
#         end
#       end

#       resources :details, only: [:show, :update]
#       resources :attendances, only: [:index, :show, :update] do
#         member do
#           put :check_in
#           put :check_out
#         end
#       end

#       resources :shifts, only: [:index, :create] do
#         collection do
#           get :upcoming_shifts
#           get :ongoing_shifts
#           get :past_shifts
#         end
#       end

#       resources :payrolls, only: [] do
#         collection do
#           get :calculate
#         end
#       end
#     end
#   end
# end

Rails.application.routes.draw do
  root 'home#index'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  devise_scope :user do
    get 'signup', to: 'devise/registrations#new'
    get 'login', to: 'devise/sessions#new'
    get 'logout', to: 'devise/sessions#destroy'

    unauthenticated do
      match '*path', to: 'devise/sessions#new', via: :all
    end
  end

  namespace :api do
    get 'auth/status', to: 'auth#status'

    authenticated :user do
      resources :employees do
        member do
          get 'available_months', to: 'employees#available_months'
        end

        resources :leaves, only: [:index, :create, :destroy, :update] do
          collection do
            get 'total_leave_days'
          end
        end
      end

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
end
