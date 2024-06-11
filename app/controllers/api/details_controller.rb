# # class Api::DetailsController < ApplicationController
# # end
# module Api
#     class DetailsController < ApplicationController
#       def index
#         @details = Detail.all
#         render json: @details
#       end
  
#       def show
#         @detail = Detail.find(params[:id])
#         render json: @detail
#       end
#     end
#   end
  
module Api
    class DetailsController < ApplicationController
      def index
        @details = Detail.all
        render json: @details
      end
  
      def show
        @detail = Detail.find(params[:id])
        render json: @detail
      end
  
      def create
        @detail = Detail.new(detail_params)
        if @detail.save
          render json: @detail, status: :created
        else
          render json: @detail.errors, status: :unprocessable_entity
        end
      end
  
      private
  
      def detail_params
        params.require(:detail).permit(:created_at, :updated_at)
      end
    end
  end
  