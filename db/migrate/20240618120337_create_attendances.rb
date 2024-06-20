class CreateAttendances < ActiveRecord::Migration[7.1]
  def change
    create_table :attendances do |t|
      t.string :staff_name
      t.date :shift_date
      t.string :assigned_shift
      t.datetime :check_in
      t.datetime :check_out
      t.string :time_worked

      t.timestamps
    end
  end
end
