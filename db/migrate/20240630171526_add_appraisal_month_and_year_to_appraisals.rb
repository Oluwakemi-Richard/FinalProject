class AddAppraisalMonthAndYearToAppraisals < ActiveRecord::Migration[7.1]
  def change
    add_column :appraisals, :appraisal_month, :string
    add_column :appraisals, :appraisal_year, :integer
  end
end
