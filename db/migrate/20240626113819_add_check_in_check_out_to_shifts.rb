class AddCheckInCheckOutToShifts < ActiveRecord::Migration[7.1]
  def change
    add_column :shifts, :checked_in, :boolean, default: false
    add_column :shifts, :checked_out, :boolean, default: false
  end
end
