class AddShiftIdToAttendances < ActiveRecord::Migration[7.1]
  def change
    add_column :attendances, :shift_id, :integer
    add_foreign_key :attendances, :shifts, column: :shift_id
  end
end
