class Api::LeavesController < ApplicationController
    before_action :set_employee
    before_action :set_leave, only: [:destroy]
  
    def index
      leaves = @employee.leaves
      render json: leaves
    end
  
    def create
      leave = @employee.leaves.new(leave_params)
      leave.status = 'pending'
      if leave.save
        render json: leave, status: :created
      else
        render json: leave.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      if @leave.status == 'pending'
        @leave.destroy
        head :no_content
      else
        render json: { error: 'Cannot delete approved or rejected leave' }, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_employee
      @employee = Employee.find(params[:employee_id])
    end
  
    def set_leave
      @leave = @employee.leaves.find(params[:id])
    end
  
    def leave_params
      params.require(:leave).permit(:start_date, :end_date, :reason)
    end
  end