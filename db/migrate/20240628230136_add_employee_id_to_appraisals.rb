class AddEmployeeIdToAppraisals < ActiveRecord::Migration[7.1]
  def change
    unless column_exists?(:appraisals, :employee_id)
      add_column :appraisals, :employee_id, :bigint
      add_foreign_key :appraisals, :employees, column: :employee_id
    end
    remove_column :appraisals, :employee_number
  end
end
