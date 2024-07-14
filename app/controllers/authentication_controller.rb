# class AuthenticationController < ApplicationController
#     before_action :authenticate_user!, except: [:login]
  
#     def login
#       user = User.find_for_database_authentication(email: params[:email])
#       if user&.valid_password?(params[:password])
#         token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
#         render json: { token: token }, status: :ok
#       else
#         render json: { error: 'Invalid Email or Password' }, status: :unauthorized
#       end
#     end
  
#     def logout
#       current_user.update(jti: SecureRandom.uuid)
#       render json: { message: 'Logged out successfully' }, status: :ok
#     end
#   end
  
class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request, only: [:login]

  def login
    user = User.find_for_database_authentication(email: params[:email])
    if user&.valid_password?(params[:password])
      token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
      render json: { token: token }, status: :ok
    else
      render json: { error: 'Invalid Email or Password' }, status: :unauthorized
    end
  end

  def logout
    @current_user.update(jti: SecureRandom.uuid)
    render json: { message: 'Logged out successfully' }, status: :ok
  end

  def validate
    render json: { valid: true }, status: :ok
  end
end
