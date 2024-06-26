class Employee < ApplicationRecord
    has_many :attendances, primary_key: 'employee_number', foreign_key: 'employee_number'
end
