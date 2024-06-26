class Attendance < ApplicationRecord
    belongs_to :employee, primary_key: 'employee_number', foreign_key: 'employee_number'
end
