class Api::AttendancesController < ApplicationController
  def index
    employee_number = params[:employee_number]
    staff_name = params[:staff_name]
    shift_date = params[:shift_date]

    if staff_name.present?
      employee = Employee.find_by(name: staff_name)
      employee_number = employee.employee_number if employee
    end

    if employee_number.present? && shift_date.present?
      @attendances = Attendance.where(employee_number: employee_number, shift_date: shift_date)
    elsif employee_number.present?
      @attendances = Attendance.where(employee_number: employee_number)
    elsif shift_date.present?
      @attendances = Attendance.where(shift_date: shift_date)
    else
      @attendances = Attendance.all
    end

    render json: @attendances
  end
  # def check_in
  #   shift = Shift.find(params[:id])
  #   attendance = Attendance.new(
  #     employee_number: shift.employee_number,
  #     staff_name: shift.employee.name,
  #     shift_date: shift.shift_date,
  #     assigned_shift: "#{shift.start_time} - #{shift.end_time}",
  #     check_in: Time.now,
  #     shift_id: shift.id
  #   )

  #   if attendance.save
  #     render json: attendance, status: :created
  #   else
  #     render json: attendance.errors, status: :unprocessable_entity
  #   end
  # end

  # def check_out
  #   attendance = Attendance.find_by(shift_id: params[:id], employee_number: params[:employee_number])

  #   if attendance.update(check_out: Time.now)
  #     render json: attendance
  #   else
  #     render json: attendance.errors, status: :unprocessable_entity
  #   end
  # end
  def check_in
    shift = Shift.find(params[:id])
    attendance = Attendance.new(
      employee_number: shift.employee_number,
      staff_name: shift.employee.name,
      shift_date: shift.shift_date,
      assigned_shift: "#{shift.start_time} - #{shift.end_time}",
      check_in: Time.now,
      shift_id: shift.id
    )

    if attendance.save && shift.update(checked_in: true)
      render json: attendance, status: :created
    else
      render json: attendance.errors, status: :unprocessable_entity
    end
  end

  def check_out
    attendance = Attendance.find_by(shift_id: params[:id], employee_number: params[:employee_number])

    if attendance.update(check_out: Time.now) && Shift.find(params[:id]).update(checked_out: true)
      render json: attendance
    else
      render json: attendance.errors, status: :unprocessable_entity
    end
  end
  def show
    @attendance = Attendance.find(params[:id])
    render json: @attendance
  end

  def create
    @attendance = Attendance.new(attendance_params)
    if @attendance.save
      render json: @attendance, status: :created
    else
      render json: @attendance.errors, status: :unprocessable_entity
    end
  end

  def update
    @attendance = Attendance.find(params[:id])
    if @attendance.update(attendance_params)
      render json: @attendance
    else
      render json: @attendance.errors, status: :unprocessable_entity
    end
  end

  private

  def attendance_params
    params.require(:attendance).permit(:employee_number, :shift_date, :check_in, :check_out)
  end
end
