class AuthenticationController < ApplicationController
    before_action :authenticate_user!, except: [:login]
  
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
      current_user.update(jti: SecureRandom.uuid)
      render json: { message: 'Logged out successfully' }, status: :ok
    end
  end
  