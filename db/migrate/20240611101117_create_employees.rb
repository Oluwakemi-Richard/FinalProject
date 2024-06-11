class CreateEmployees < ActiveRecord::Migration[7.1]
  def change
    create_table :employees do |t|
      t.string :employee_number
      t.string :name
      t.string :position
      t.string :department
      t.string :branch
      t.string :address
      t.string :phone_number
      t.string :email
      t.date :start_date
      t.string :gender
      t.date :date_of_birth
      t.decimal :salary

      t.timestamps
    end
  end
end
