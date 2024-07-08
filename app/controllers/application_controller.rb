# class ApplicationController < ActionController::API
# end
class ApplicationController < ActionController::API
    include ActionController::MimeResponds
    respond_to :json
  
    # protect_from_forgery with: :null_session
  end
  
