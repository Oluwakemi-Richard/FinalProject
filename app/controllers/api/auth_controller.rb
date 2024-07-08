# class Api::AuthController < ApplicationController
# end
module Api
    class AuthController < ApplicationController
      before_action :authenticate_user!
  
      def status
        if user_signed_in?
          render json: { logged_in: true, user: current_user }
        else
          render json: { logged_in: false }
        end
      end
    end
  end
  
