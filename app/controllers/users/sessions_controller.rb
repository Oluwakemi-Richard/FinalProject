# class Users::SessionsController < Devise::SessionsController
#     respond_to :json
  
#     private
  
#     def respond_with(resource, _opts = {})
#       render json: resource
#     end
  
#     def respond_to_on_destroy
#       head :no_content
#     end
#   end
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
  # app/controllers/users/sessions_controller.rb
# class Users::SessionsController < Devise::SessionsController
#   respond_to :json

#   # Override the create method to return a JWT token
#   def create
#     self.resource = warden.authenticate!(auth_options)
#     sign_in(resource_name, resource)
#     token = Warden::JWTAuth::UserEncoder.new.call(resource, :user, nil).first
#     render json: { token: token }, status: :ok
#   end

#   # Override the destroy method to handle logout
#   def destroy
#     current_user.update(jti: SecureRandom.uuid) if current_user
#     super
#   end
# end
# app/controllers/users/sessions_controller.rb
# class Users::SessionsController < Devise::SessionsController
#   respond_to :json

#   # POST /users/sign_in
#   def create
#     self.resource = warden.authenticate!(auth_options)
#     if resource
#       sign_in(resource_name, resource)
#       token = generate_jwt(resource) # Generate JWT token for the user
#       render json: { message: 'Logged in successfully.', user: resource, token: token }, status: :ok
#     else
#       render json: { message: 'Invalid email or password.' }, status: :unauthorized
#     end
#   rescue ActiveRecord::RecordNotFound => e
#     render json: { message: 'Invalid email or password.' }, status: :unauthorized
#   end

#   # DELETE /users/sign_out
#   def destroy
#     if current_user
#       sign_out(resource_name)
#       # Implement token revocation logic here if needed
#       if revoke_token(current_token)
#         render json: { message: 'Logged out successfully.' }, status: :ok
#       else
#         render json: { message: 'Failed to revoke token.' }, status: :unprocessable_entity
#       end
#     else
#       render json: { message: 'No user signed in.' }, status: :unauthorized
#     end
#   end
  
#   protected
  
#   def respond_to_on_destroy
#     head :no_content
#   end

#   def current_token
#     request.headers['Authorization']&.split(' ')&.last
#   end

#   def generate_jwt(resource)
#     payload = { user_id: resource.id, jti: resource.jti }
#     JWT.encode(payload, Rails.application.secrets.secret_key_base)
#   end

#   def revoke_token(token)
#     # Implement your token revocation logic here
#     # Example: Token.where(value: token).destroy_all
#     # This is just an example; modify as needed to fit your token management strategy
#     true
#   end
# end
# class Users::SessionsController < Devise::SessionsController
#   respond_to :json

#   before_action :authenticate_user!, only: [:destroy]

#   # POST /users/sign_in
#   def create
#     self.resource = warden.authenticate!(auth_options)
#     if resource
#       sign_in(resource_name, resource)
#       token = generate_jwt(resource) # Generate JWT token for the user
#       render json: { message: 'Logged in successfully.', user: resource, token: token }, status: :ok
#     else
#       render json: { message: 'Invalid email or password.' }, status: :unauthorized
#     end
#   rescue ActiveRecord::RecordNotFound => e
#     render json: { message: 'Invalid email or password.' }, status: :unauthorized
#   end

#   # DELETE /logout
#   def destroy
#     if revoke_token(current_token)
#       render json: { message: 'Logged out successfully.' }, status: :ok
#     else
#       render json: { message: 'Failed to revoke token.' }, status: :unprocessable_entity
#     end
#   end
  
#   protected

#   def authenticate_user!
#     render json: { error: 'Not Authorized' }, status: :unauthorized unless current_user
#   end

#   def respond_to_on_destroy
#     head :no_content
#   end

#   def current_token
#     request.headers['Authorization']&.split(' ')&.last
#   end

#   def generate_jwt(resource)
#     payload = { user_id: resource.id, jti: resource.jti }
#     JWT.encode(payload, Rails.application.secrets.secret_key_base)
#   end

#   def revoke_token(token)
#     JsonWebToken.revoke(token) # Call the `revoke` method from `JsonWebToken`
#   end
# end
# class Users::SessionsController < Devise::SessionsController
#   skip_before_action :authenticate_user!, only: [:create]
#   respond_to :json

#   # POST /users/sign_in
#   def create
#     self.resource = warden.authenticate!(auth_options)
#     if resource
#       sign_in(resource_name, resource)
#       token = generate_jwt(resource) # Generate JWT token for the user
#       render json: { message: 'Logged in successfully.', user: resource, token: token }, status: :ok
#     else
#       render json: { message: 'Invalid email or password.' }, status: :unauthorized
#     end
#   rescue ActiveRecord::RecordNotFound => e
#     render json: { message: 'Invalid email or password.' }, status: :unauthorized
#   end

#   # DELETE /users/sign_out
#   def destroy
#     if current_user
#       # Use Warden to logout the user
#       warden.logout
#       revoke_token(current_token) # Perform token revocation logic
#       render json: { message: 'Logged out successfully.' }, status: :ok
#     else
#       render json: { message: 'No user signed in.' }, status: :unauthorized
#     end
#   end
  
#   protected
  
#   def respond_to_on_destroy
#     head :no_content
#   end

#   def current_token
#     request.headers['Authorization']&.split(' ')&.last
#   end

#   def generate_jwt(resource)
#     payload = { user_id: resource.id, jti: resource.jti }
#     JWT.encode(payload, Rails.application.secrets.secret_key_base)
#   end

#   def revoke_token(token)
#     # Implement your token revocation logic here
#     Token.where(value: token).destroy_all
#     # For simplicity, we'll just return true as a placeholder
#   end
# end
class Users::SessionsController < Devise::SessionsController
  skip_before_action :authenticate_user!, only: [:create]
  respond_to :json

  def create
    self.resource = warden.authenticate!(auth_options)
    if resource
      sign_in(resource_name, resource)
      token = generate_jwt(resource)
      render json: { message: 'Logged in successfully.', user: resource, token: token }, status: :ok
    else
      render json: { message: 'Invalid email or password.' }, status: :unauthorized
    end
  rescue ActiveRecord::RecordNotFound
    render json: { message: 'Invalid email or password.' }, status: :unauthorized
  end

  def destroy
    if current_user
      warden.logout
      revoke_token(current_token)
      render json: { message: 'Logged out successfully.' }, status: :ok
    else
      render json: { message: 'No user signed in.' }, status: :unauthorized
    end
  end

  protected

  def respond_to_on_destroy
    head :no_content
  end

  def current_token
    request.headers['Authorization']&.split(' ')&.last
  end

  def generate_jwt(resource)
    payload = { user_id: resource.id, jti: resource.jti }
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def revoke_token(token)
    Token.where(value: token).destroy_all
  end
end





