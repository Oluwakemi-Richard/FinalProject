# class ApplicationController < ActionController::API
# end
# class ApplicationController < ActionController::API
#     include ActionController::MimeResponds
#     respond_to :json
  
#     # protect_from_forgery with: :null_session
#   end
class ApplicationController < ActionController::API
    before_action :set_default_format
  
    private
  
    def set_default_format
      request.format = :json
    end
  end
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
  
  
