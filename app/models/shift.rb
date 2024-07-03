class Shift < ApplicationRecord
    belongs_to :employee, foreign_key: :employee_number, primary_key: :employee_number
  
    before_save :calculate_shift_duration
  
    private
  
    def calculate_shift_duration
      self.shift_duration = ((end_time - start_time) / 1.hour).round(2)
    end
  end
  