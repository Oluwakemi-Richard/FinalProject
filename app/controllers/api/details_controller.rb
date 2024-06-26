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
  
#       def create
#         @detail = Detail.new(detail_params)
#         if @detail.save
#           render json: @detail, status: :created
#         else
#           render json: @detail.errors, status: :unprocessable_entity
#         end
#       end
  
#       private
  
#       def detail_params
#         params.require(:detail).permit(:created_at, :updated_at)
#       end
#     end
#   end
# app/controllers/api/details_controller.rb
module Api
  class DetailsController < ApplicationController
    def show
      employee = Employee.find_by(employee_number: params[:id])
      if employee
        render json: employee
      else
        render json: { error: 'Employee not found' }, status: :not_found
      end
    end

    def update
      employee = Employee.find_by(employee_number: params[:id])
      if employee.update(employee_params)
        render json: employee
      else
        render json: { error: 'Failed to update employee' }, status: :unprocessable_entity
      end
    end

    private

    def employee_params
      params.permit(:address, :phone_number)
    end
  end
end
