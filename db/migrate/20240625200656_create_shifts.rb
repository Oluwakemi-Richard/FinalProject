# class CreateShifts < ActiveRecord::Migration[7.1]
#   def change
#     create_table :shifts do |t|
#       t.string :employee_number
#       t.date :shift_date
#       t.time :start_time
#       t.time :end_time
#       t.decimal :shift_duration

#       t.timestamps
#     end
#   end
# end
class CreateShifts < ActiveRecord::Migration[7.1]
  def change
    create_table :shifts do |t|
      t.string :employee_number, null: false
      t.date :shift_date, null: false
      t.time :start_time, null: false
      t.time :end_time, null: false
      t.decimal :shift_duration, null: false, precision: 5, scale: 2

      t.timestamps
    end

    add_foreign_key :shifts, :employees, column: :employee_number, primary_key: :employee_number
    add_index :shifts, :employee_number
  end
end
