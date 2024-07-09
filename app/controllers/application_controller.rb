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
  
  
