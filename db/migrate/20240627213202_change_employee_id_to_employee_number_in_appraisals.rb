class ChangeEmployeeIdToEmployeeNumberInAppraisals < ActiveRecord::Migration[7.1]
  def change
    rename_column :appraisals, :employee_id, :employee_number
  end
end
