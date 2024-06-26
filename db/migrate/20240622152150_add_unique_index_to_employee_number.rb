class AddUniqueIndexToEmployeeNumber < ActiveRecord::Migration[7.1]
  def change
    add_index :employees, :employee_number, unique: true
  end
end
