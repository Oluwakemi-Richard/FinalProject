# class HomeController < ApplicationController
#   def index
#   end
# end
class HomeController < ApplicationController

  def index
    render json: { message: 'Testing!' }
  end
end