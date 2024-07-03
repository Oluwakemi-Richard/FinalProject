# class Appraisal < ApplicationRecord
#   belongs_to :employee, primary_key: 'employee_number', foreign_key: 'employee_number'

#   serialize :questions, ActiveRecord::Coders::JSON

#   validates :employee_number, :appraised_by, :appraisal_date, presence: true
# end
class Appraisal < ApplicationRecord
  validates :employee_id, uniqueness: { scope: [:appraisal_month, :appraisal_year], message: "already exists for this employee and month/year" }
  # belongs_to :employee, primary_key: 'employee_number', foreign_key: 'employee_number'

  # validates :employee_number, :appraised_by, :appraisal_date, presence: true
end



