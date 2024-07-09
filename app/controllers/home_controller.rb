# class HomeController < ApplicationController
#   def index
#   end
# end
class HomeController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    render json: { message: 'Testing!' }
  end
end