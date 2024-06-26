class AddEmployeeNumberToAttendances < ActiveRecord::Migration[7.1]
  def change
    add_column :attendances, :employee_number, :string
    add_foreign_key :attendances, :employees, column: :employee_number, primary_key: :employee_number
  end
end
