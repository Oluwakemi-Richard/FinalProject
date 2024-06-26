# module Api
#     class ShiftsController < ApplicationController
#       def index
#         shifts = Shift.all
#         render json: shifts, include: :employee
#       end
  
#       def create
#         shift = Shift.new(shift_params)
#         shift.checked_in = false
#         shift.checked_out = false
#         if shift.save
#           render json: shift, status: :created
#         else
#           render json: shift.errors, status: :unprocessable_entity
#         end
#       end
  
#       private
  
#       def shift_params
#         params.require(:shift).permit(:employee_number, :shift_date, :start_time, :end_time)
#       end
#     end
#   end  
module Api
    class ShiftsController < ApplicationController
      def index
        shifts = Shift.all
        render json: shifts, include: :employee
      end
      def upcoming_shifts
        shifts = Shift.where('start_time >= ?', Time.now)
                      .where(checked_in: false)
                      .order(start_time: :asc)
        render json: shifts, include: :employee
      end
  
      def ongoing_shifts
        shifts = Shift.where('end_time >= ?', Time.now)
                      .where.not(checked_in: false)
                      .where(checked_out: false)
                      .order(start_time: :asc)
        render json: shifts, include: :employee
      end
  
      def past_shifts
        shifts = Shift.where('end_time < ?', Time.now)
                      .or(Shift.where.not(checked_out: false))
                      .order(start_time: :asc)
        render json: shifts, include: :employee
      end
  
    #   def upcoming_shifts
    #     now = Time.current
    #     shifts = Shift.where("shift_date >= ? AND checked_out = ?", now.to_date, false).order(:shift_date, :start_time)
    #     render json: shifts, include: :employee
    #   end
  
    #   def past_shifts
    #     now = Time.current
    #     shifts = Shift.where("shift_date < ? OR checked_out = ?", now.to_date, true).order(shift_date: :desc, start_time: :desc)
    #     render json: shifts, include: :employee
    #   end
  
      def create
        shift = Shift.new(shift_params)
        shift.checked_in = false
        shift.checked_out = false
        if shift.save
          render json: shift, status: :created
        else
          render json: shift.errors, status: :unprocessable_entity
        end
      end
  
      private
  
      def shift_params
        params.require(:shift).permit(:employee_number, :shift_date, :start_time, :end_time)
      end
    end
  end