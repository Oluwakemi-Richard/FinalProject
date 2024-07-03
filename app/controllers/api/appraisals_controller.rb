# class Api::AppraisalsController < ApplicationController
#   before_action :set_employee, only: [:create]
#   def create
#     @appraisal = Appraisal.new(appraisal_params)
#     if @appraisal.save
#       render json: @appraisal, status: :created
#     else
#       render json: @appraisal.errors, status: :unprocessable_entity
#     end
#   end

#   private

#   def set_employee
#     @employee = Employee.find_by(id: params[:employee_id])
#     unless @employee
#       render json: { error: 'Employee not found' }, status: :not_found
#     end
#   end

#   def appraisal_params
#     params.require(:appraisal).permit(:employee_id, :appraised_by, :appraisal_date, :notes, questions: {})
#   end
# end
# app/controllers/api/appraisals_controller.rb
# app/controllers/api/appraisals_controller.rb
# class Api::AppraisalsController < ApplicationController
#   before_action :set_appraisal, only: [:show, :update, :destroy]
#   before_action :set_employee, only: [:create]

#   # GET /api/appraisals
#   def index
#     @appraisals = Appraisal.all
#     render json: @appraisals
#   end

#   # GET /api/appraisals/:id
#   def show
#     render json: @appraisal
#   end

#   # POST /api/appraisals
#   # def create
#   #   @appraisal = Appraisal.new(appraisal_params)

#   #   if appraisal_exists?
#   #     render json: { error: 'Appraisal for this month and year already exists' }, status: :unprocessable_entity
#   #   elsif @appraisal.save
#   #     render json: @appraisal, status: :created
#   #   else
#   #     render json: @appraisal.errors, status: :unprocessable_entity
#   #   end
#   # end
#    # POST /api/appraisals
#    def create
#     @appraisal = Appraisal.new(appraisal_params)
#     if @appraisal.save
#       render json: @appraisal, status: :created
#     else
#       render json: @appraisal.errors, status: :unprocessable_entity
#     end
#   end

#   # GET /api/year_options
#   def year_options
#     current_year = Date.today.year
#     previous_year = Date.today.year - 1
#     render json: { year_options: [current_year, previous_year], current_year: current_year }
#   end
#   # GET /api/years
#   def years
#     years = Appraisal.distinct.pluck(:appraisal_year)
#     render json: years
#   end
#   def by_employee_and_year
#     appraisals = Appraisal.where(employee_id: params[:employee_id], appraisal_year: params[:year])
#     render json: appraisals
#   end

#   # PUT /api/appraisals/:id
#   def update
#     if @appraisal.update(appraisal_params)
#       render json: @appraisal
#     else
#       render json: @appraisal.errors, status: :unprocessable_entity
#     end
#   end

#   # DELETE /api/appraisals/:id
#   def destroy
#     @appraisal.destroy
#   end

#   # GET /api/appraisals/check
#   def check
#     exists = appraisal_exists?
#     render json: { exists: exists }
#   end

#   # GET /api/employees/:employee_id/available_months
#   def available_months
#     employee = Employee.find_by(id: params[:employee_id])
#     return render json: { error: 'Employee not found' }, status: :not_found unless employee

#     year = params[:appraisal_year].to_i
#     evaluated_months = employee.appraisals.where(appraisal_year: year).pluck(:appraisal_month)
#     available_months = (1..12).to_a - evaluated_months.map(&:to_i)

#     render json: { months: available_months }
#   end

#   private

#   def set_appraisal
#     @appraisal = Appraisal.find(params[:id])
#   end

#   def set_employee
#     @employee = Employee.find_by(id: appraisal_params[:employee_id])
#     unless @employee
#       render json: { error: 'Employee not found' }, status: :not_found
#     end
#   end

#   def appraisal_params
#     params.require(:appraisal).permit(
#       :appraised_by, 
#       :appraisal_date, 
#       :notes, 
#       :employee_id,
#       :appraisal_month,
#       :appraisal_year,
#       questions: {}
#     )
#   end

#   def appraisal_exists?
#     Appraisal.exists?(
#       employee_id: params[:employee_id],
#       appraisal_month: params[:appraisal_month],
#       appraisal_year: params[:appraisal_year]
#     )
#   end
# end


class Api::AppraisalsController < ApplicationController
  before_action :set_appraisal, only: [:show, :update, :destroy]
  before_action :set_employee, only: [:create]

  # GET /api/appraisals
  def index
    @appraisals = Appraisal.all
    render json: @appraisals
  end

  # GET /api/appraisals/:id
  def show
    render json: @appraisal
  end

  # POST /api/appraisals
  def create
    @appraisal = Appraisal.new(appraisal_params)
    if @appraisal.save
      render json: @appraisal, status: :created
    else
      render json: @appraisal.errors, status: :unprocessable_entity
    end
  end

  # GET /api/appraisals/years
  def years
    years = Appraisal.distinct.pluck(:appraisal_year)
    render json: years
  end

  # GET /api/appraisals/:employee_id/:year
  def by_employee_and_year
    appraisals = Appraisal.where(employee_id: params[:employee_id], appraisal_year: params[:year])
    render json: appraisals
  end

  # PUT /api/appraisals/:id
  def update
    if @appraisal.update(appraisal_params)
      render json: @appraisal
    else
      render json: @appraisal.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/appraisals/:id
  def destroy
    @appraisal.destroy
  end

  # GET /api/appraisals/check
  def check
    exists = appraisal_exists?
    render json: { exists: exists }
  end

  # GET /api/employees/:employee_id/available_months
  def available_months
    employee = Employee.find_by(id: params[:employee_id])
    return render json: { error: 'Employee not found' }, status: :not_found unless employee

    year = params[:appraisal_year].to_i
    current_month = Date.today.month
    evaluated_months = employee.appraisals.where(appraisal_year: year).pluck(:appraisal_month).map(&:to_i)
    available_months = (1..current_month).to_a - evaluated_months

    render json: { months: available_months }
  end

  private

  def set_appraisal
    @appraisal = Appraisal.find(params[:id])
  end

  def set_employee
    @employee = Employee.find_by(id: appraisal_params[:employee_id])
    unless @employee
      render json: { error: 'Employee not found' }, status: :not_found
    end
  end

  def appraisal_params
    params.require(:appraisal).permit(
      :appraised_by, 
      :appraisal_date, 
      :notes, 
      :employee_id,
      :appraisal_month,
      :appraisal_year,
      questions: {}
    )
  end

  def appraisal_exists?
    Appraisal.exists?(
      employee_id: params[:employee_id],
      appraisal_month: params[:appraisal_month],
      appraisal_year: params[:appraisal_year]
    )
  end
end
