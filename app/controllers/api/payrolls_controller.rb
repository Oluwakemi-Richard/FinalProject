module Api
  class PayrollsController < ApplicationController
    def calculate
      payment_month = params[:month].to_i
      payment_year = params[:year].to_i
      bonuses = params[:bonuses] || {}
      other_deductions = params[:other_deductions] || {}
      attendances = Attendance.includes(:employee)
                              .where("extract(month from shift_date) = ? AND extract(year from shift_date) = ?", payment_month, payment_year)

      payroll_data = attendances.group_by(&:employee_number).map do |employee_number, records|
        employee = records.first.employee
        total_hours_worked = records.sum { |record| record.time_worked.to_f }
        gross_pay = total_hours_worked * 15
        tax = gross_pay * 0.10
        pension = gross_pay * 0.05
        bonus = bonuses[employee_number.to_s].to_f
        other_deduction = other_deductions[employee_number.to_s].to_f
        net_pay = gross_pay + bonus - tax - pension - other_deduction

        {
          employee_number: employee_number,
          employee_name: employee.name,
          total_hours_worked: total_hours_worked,
          pay_rate: 15, # £15 per hour
          gross_pay: gross_pay,
          tax: tax,
          pension: pension,
          bonus: bonus,
          other_deductions: other_deduction,
          net_pay: net_pay
        }
      end

      render json: payroll_data
    end
  end
end

