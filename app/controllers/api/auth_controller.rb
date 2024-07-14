class Api::AuthController < ApplicationController
    # For registration
    def register
      @user = User.new(user_params)
      if @user.save
        render json: { status: 'User created successfully' }, status: :created
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # For login
    def login
      user = User.find_for_database_authentication(email: params[:email])
      if user&.valid_password?(params[:password])
        token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
        render json: { token: token }, status: :ok
      else
        render json: { error: 'Invalid Email or Password' }, status: :unauthorized
      end
    end
  
    # For token validation
    def validate
      render json: { message: 'Token is valid' }, status: :ok
    end
  
    private
  
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
  end
  
  