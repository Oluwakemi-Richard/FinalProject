class Users::SessionsController < Devise::SessionsController
    respond_to :json
  
    private
  
    def respond_with(resource, _opts = {})
      render json: resource
    end
  
    def respond_to_on_destroy
      head :no_content
    end
  end
# class Users::SessionsController < Devise::SessionsController
#     respond_to :json
  
#     private
  
#     def respond_with(resource, _opts = {})
#       if resource && resource.active_for_authentication?
#         # Send a successful response with the JWT token
#         render json: { message: 'Logged in successfully.', token: current_token }, status: :ok
#       else
#         render json: { message: "Invalid email or password." }, status: :unauthorized
#       end
#     end
  
#     def respond_to_on_destroy
#       if current_user
#         render json: { message: 'Signed out successfully.' }, status: :ok
#       else
#         render json: { message: 'Already signed out.' }, status: :unprocessable_entity
#       end
#     end
  
#     def current_token
#       # Generate or retrieve the current JWT token
#       JWT.encode({ user_id: current_user.id }, Rails.application.credentials[:jwt_secret_key])
#     end
#   end
  