class Api::AttendancesController < ApplicationController
  def index
    if params[:staff_name].present? && params[:shift_date].present?
      @attendances = Attendance.where(staff_name: params[:staff_name], shift_date: params[:shift_date])
    elsif params[:staff_name].present?
      @attendances = Attendance.where(staff_name: params[:staff_name])
    elsif params[:shift_date].present?
      @attendances = Attendance.where(shift_date: params[:shift_date])
    else
      @attendances = Attendance.all
    end

    render json: @attendances
  end
end
