# app/controllers/api/authentication_controller.rb
class Api::AuthenticationController < ApplicationController
    def validate_token
      if current_user
        render json: { status: 'Token is valid' }, status: :ok
      else
        render json: { status: 'Token is invalid' }, status: :unauthorized
      end
    end
  end
  