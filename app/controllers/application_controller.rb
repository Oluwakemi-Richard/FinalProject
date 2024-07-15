# class ApplicationController < ActionController::API
# end
# class ApplicationController < ActionController::API
#     include ActionController::MimeResponds
#     respond_to :json
  
#     # protect_from_forgery with: :null_session
#   end
# class ApplicationController < ActionController::API
#     before_action :set_default_format
  
#     private
  
#     def set_default_format
#       request.format = :json
#     end
#   end
# class ApplicationController < ActionController::API
#     respond_to :json
#     def create
#       @user = User.new(user_params)
#       if @user.save
#         render json: { status: 'User created successfully' }, status: :created
#       else
#         render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
#       end
#     end
  
#     private
  
#     def user_params
#       params.require(:user).permit(:email, :password, :password_confirmation)
#     end
#   end

# class ApplicationController < ActionController::API
#   before_action :authenticate_request

#   respond_to :json
#   include ActionController::Helpers
#   include Devise::Controllers::Helpers
  
#   def current_user
#     @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
#   end

#   def create
#     @user = User.new(user_params)
#     if @user.save
#       render json: { status: 'User created successfully' }, status: :created
#     else
#       render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
#     end
#   end

#   private

#   def user_params
#     params.require(:user).permit(:email, :password, :password_confirmation)
#   end

#   def authenticate_request
#     token = request.headers['Authorization'].split(' ').last if request.headers['Authorization'].present?
#     decoded_token = decode_jwt(token)
#     if decoded_token
#       @current_user = User.find(decoded_token[:user_id])
#     else
#       render json: { error: 'Not Authorized' }, status: :unauthorized
#     end
#   end

#   def decode_jwt(token)
#     begin
#       decoded = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
#       HashWithIndifferentAccess.new(decoded)
#     rescue JWT::DecodeError
#       nil
#     end
#   end
# end

  
  
# app/controllers/application_controller.rb
# class ApplicationController < ActionController::API
#   include ActionController::Helpers
#   include Devise::Controllers::Helpers
  
#   # Get the JWT token from request headers
#   def current_user
#     token = request.headers['Authorization']&.split(' ')&.last
#     return nil unless token

#     begin
#       decoded_token = Warden::JWTAuth::TokenDecoder.new.call(token, :user, nil).first
#       @current_user ||= User.find(decoded_token['sub']) if decoded_token
#     rescue StandardError => e
#       Rails.logger.error "Error decoding token: #{e.message}"
#       nil
#     end
#   end

#   def authenticate_user!
#     render json: { error: 'Not Authorized' }, status: :unauthorized unless current_user
#   end
# end
# class ApplicationController < ActionController::API
#   include ActionController::Helpers
#   include Devise::Controllers::Helpers

#   def current_user
#     token = request.headers['Authorization']&.split(' ')&.last
#     return nil unless token

#     begin
#       decoded_token = JsonWebToken.decode(token)
#       @current_user ||= User.find(decoded_token[:user_id])
#     rescue JWT::DecodeError => e
#       Rails.logger.error "Error decoding token: #{e.message}"
#       nil
#     rescue ActiveRecord::RecordNotFound => e
#       Rails.logger.error "User not found: #{e.message}"
#       nil
#     end
#   end

#   def authenticate_user!
#     render json: { error: 'Not Authorized' }, status: :unauthorized unless current_user
#   end
# end
# class ApplicationController < ActionController::API
#   before_action :authenticate_user!

#   def current_user
#     @current_user ||= User.find(decoded_auth_token[:user_id]) if decoded_auth_token
#   rescue ActiveRecord::RecordNotFound
#     nil
#   end

#   private

#   def decoded_auth_token
#     @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
#   end

#   def http_auth_header
#     if request.headers['Authorization'].present?
#       return request.headers['Authorization'].split(' ').last
#     end
#     nil
#   end

#   def authenticate_user!
#     render json: { errors: ['Not Authenticated'] }, status: :unauthorized unless current_user
#   end
# end

class ApplicationController < ActionController::API
  before_action :set_current_user
  before_action :authenticate_user!

  private

  # Set the @current_user instance variable based on the decoded JWT token
  def set_current_user
    @current_user = User.find_by(id: decoded_auth_token[:user_id]) if decoded_auth_token
    Rails.logger.info "Current User: #{@current_user.inspect}"
    Rails.logger.info "Decoded Auth Token: #{decoded_auth_token.inspect}"
  rescue ActiveRecord::RecordNotFound
    @current_user = nil
  end

  # Check if the user is signed in; if not, log the failure
  def authenticate_user!
    unless user_signed_in?
      Rails.logger.info "User not authenticated - Request from: #{request.remote_ip}"
      # Just log the information; do not render or redirect
      head :unauthorized
    end
  end

  # Determine if the user is signed in
  def user_signed_in?
    @current_user.present?
  end

  # Provide the current user
  def current_user
    @current_user
  end

  # Decode the JWT token to extract user information
  def decoded_auth_token
    Rails.logger.info "Auth Header: #{http_auth_header.inspect}"
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
  end

  # Extract the authorization header from the request
  def http_auth_header
    if request.headers['Authorization'].present?
      return request.headers['Authorization'].split(' ').last
    end
    nil
  end
end
