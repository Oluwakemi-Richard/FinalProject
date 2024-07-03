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

app/controllers/api/leaves_controller.rb
app/controllers/api/leaves_controller.rb
class Api::LeavesController < ApplicationController
    before_action :set_leave, only: [:destroy, :update]
  
    # def index
    #   leaves = Leave.pending.includes(:employee)
    #   render json: leaves
    # end
        # GET /api/leaves/pending
    def index
      pending_leaves = Leave.where(status: 'pending').includes(:employee)
      render json: pending_leaves, status: :ok
    end
  
    def create
      leave = Leave.new(leave_params)
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
  
    def update
      if @leave.update(status: params[:status])
        render json: @leave
      else
        render json: @leave.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_leave
      @leave = Leave.find(params[:id])
    end
  
    def leave_params
      params.require(:leave).permit(:employee_id, :start_date, :end_date, :reason)
    end
  end

# class Api::LeavesController < ApplicationController
#     #before_action :set_employee
#     before_action :set_leave, only: [:destroy, :update]
  
#     # GET /api/leaves/pending
#     def pending_all
#       pending_leaves = Leave.where(status: 'pending')
#       render json: pending_leaves, include: { employee: { only: [:name] } }
#     end
  
#     # Other existing methods...
  
#     private
  
#     def set_employee
#       @employee = Employee.find(params[:employee_id])
#     end
  
#     def set_leave
#       @leave = @employee.leaves.find(params[:id])
#     end
  
#     def leave_params
#       params.require(:leave).permit(:start_date, :end_date, :reason, :status)
#     end
#   end
  
  
  