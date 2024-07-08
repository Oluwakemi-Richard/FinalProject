class Api::EmployeesController < ApplicationController
  before_action :set_employee, only: [:show, :update, :destroy]

  def index
    if params[:query].present?
      @employees = Employee.search(params[:query])
    else
      @employees = Employee.all
    end
    render json: @employees
  end

  def show
    render json: @employee
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Employee not found' }, status: :not_found
  end

  def create
    @employee = Employee.new(employee_params)
    if @employee.save
      render json: @employee, status: :created
    else
      render json: @employee.errors.full_messages.first, status: :unprocessable_entity
    end
  end

  def update
    if @employee.update(employee_params.except(:employee_number))
      render json: @employee
    else
      render json: @employee.errors.full_messages.first, status: :unprocessable_entity
    end
  end

  def destroy
    @employee.destroy
  end
  
    # GET /api/employees/:employee_id/available_months
    def available_months
      employee = Employee.find(params[:id])
      appraisal_year = params[:appraisal_year].to_i
      current_year = Time.now.year
      current_month = Time.now.month
    
      # Fetch months that already have appraisals for the given employee and year as strings and convert to integers
      taken_months = Appraisal.where(employee_id: employee.id, appraisal_year: appraisal_year).pluck(:appraisal_month).map(&:to_i)
    
      # Define all months from 1 to current month if it's the current year
      all_months = appraisal_year == current_year ? (1..current_month).to_a : (1..12).to_a
    
      # Get remaining months
      remaining_months = all_months - taken_months
      render json: remaining_months
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Employee not found' }, status: :not_found
    end

  private

  def set_employee
    @employee = Employee.find(params[:id])
  end

  def employee_params
    params.require(:employee).permit(
      :name, :position, :employee_number, :department, :branch, 
      :address, :phone_number, :email, :start_date, :gender, 
      :date_of_birth, :salary
    )
  end
end
