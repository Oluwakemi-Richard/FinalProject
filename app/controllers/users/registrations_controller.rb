# # app/controllers/users/registrations_controller.rb
# class Users::RegistrationsController < Devise::RegistrationsController
#     respond_to :json
  
#     private
  
#     def respond_with(resource, _opts = {})
#       if resource.persisted?
#         render json: { message: 'Signed up successfully.' }, status: :ok
#       else
#         render json: { message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" }, status: :unprocessable_entity
#       end
#     end
#   end
# class Users::RegistrationsController < Devise::RegistrationsController
#     respond_to :json
  
#     private
  
#     def respond_with(resource, _opts = {})
#       render json: resource
#     end
  
#     def respond_to_on_destroy
#       head :no_content
#     end
#   end
# app/controllers/users/registrations_controller.rb
# class Users::RegistrationsController < Devise::RegistrationsController
#   respond_to :json

#   # Override the create method for registration
#   def create
#     build_resource(sign_up_params)

#     if resource.save
#       render json: { status: 'User created successfully' }, status: :created
#     else
#       render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
#     end
#   end
# end
# class Users::RegistrationsController < Devise::RegistrationsController
#   respond_to :json

#   private

#   def respond_with(resource, _opts = {})
#     register_success && return if resource.persisted?

#     register_failed
#   end

#   def register_success
#     render json: { message: 'Sign up successful.' }
#   end

#   def register_failed
#     render json: { message: "Sign up failed.", errors: resource.errors.full_messages }
#   end
# end

class Users::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate_user!
  respond_to :json
  
  # Override the create method to handle JSON requests
  def create
    build_resource(sign_up_params)
    resource.save
    if resource.persisted?
      render json: { user: resource }, status: :created
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end