# class Employee < ApplicationRecord
#     has_many :attendances, primary_key: 'employee_number', foreign_key: 'employee_number'
#     has_many :leaves, class_name: 'Leave', dependent: :destroy
  
#     validates :employee_number, presence: true, uniqueness: true
#     validates :name, presence: true, format: { with: /\A[A-Za-z\s\-]+\z/, message: 'only allows letters, spaces, and hyphens' }
#     validates :position, :department, :branch, presence: true, format: { with: /\A[A-Za-z0-9\s]+\z/, message: 'only allows letters, digits, and spaces' }
#     validates :email, presence: true, uniqueness: true, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: 'is invalid' }
#     validates :phone_number, presence: true, numericality: { only_integer: true }
#     validates :start_date, :gender, :date_of_birth, :salary, presence: true
  
#     scope :search_by_name, ->(query) { where('name ILIKE ?', "%#{query}%") }
#   end

class Employee < ApplicationRecord
    has_many :attendances, primary_key: 'employee_number', foreign_key: 'employee_number'
    has_many :leaves, class_name: 'Leave', dependent: :destroy
  
    validates :employee_number, presence: true, uniqueness: true, format: { with: /\A[a-zA-Z0-9]+\z/, message: 'only allows letters and digits' }
    validates :name, presence: true, format: { with: /\A[a-zA-Z\s\-]+\z/, message: 'only allows letters, spaces, and hyphens' }
    validates :position, :department, :branch, presence: true, format: { with: /\A[a-zA-Z0-9\s]+\z/, message: 'only allows letters, digits, and spaces' }
    validates :email, presence: true, uniqueness: true, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: 'is invalid' }
    validates :phone_number, presence: true, numericality: { only_integer: true }
    validates :start_date, :gender, :date_of_birth, :salary, presence: true
  
    scope :search, ->(query) {
      where('employee_number ILIKE ? OR name ILIKE ? OR email ILIKE ?', "%#{query}%", "%#{query}%", "%#{query}%")
    }
  end
  