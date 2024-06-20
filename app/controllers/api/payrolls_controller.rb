# class Api::PayrollsController < ApplicationController
# end
module Api
    class PayrollsController < ApplicationController
      def calculate
        payment_month = params[:month].to_i
        payment_year = params[:year].to_i
  
        # Fetching all attendance records for the given month and year
        attendances = Attendance.where("extract(month from shift_date) = ? AND extract(year from shift_date) = ?", payment_month, payment_year)
  
        # Group by staff name and calculate total hours worked
        payroll_data = attendances.group_by(&:staff_name).map do |staff_name, records|
          total_hours_worked = records.sum { |record| calculate_hours_worked(record.check_in, record.check_out) }
          gross_pay = total_hours_worked * 15
          tax = gross_pay * 0.10
          pension = gross_pay * 0.05
          net_pay = gross_pay - tax - pension
  
          {
            staff_name: staff_name,
            total_hours_worked: total_hours_worked,
            pay_rate: 15, # Assuming £15 per hour
            gross_pay: gross_pay,
            tax: tax,
            pension: pension,
            net_pay: net_pay
          }
        end
  
        render json: payroll_data
      end
  
      private
  
      def calculate_hours_worked(check_in, check_out)
        ((check_out - check_in) / 1.hour).round(2) # Returns hours worked as a float
      end
    end
  end
  
