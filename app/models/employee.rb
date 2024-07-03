class Employee < ApplicationRecord
    has_many :attendances, primary_key: 'employee_number', foreign_key: 'employee_number'
    has_many :leaves, class_name: 'Leave', dependent: :destroy
    scope :search_by_name, ->(query) { where('name ILIKE ?', "%#{query}%") }
end
