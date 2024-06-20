# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# db/seeds.rb
# db/seeds.rb

attendances = [
  {
    staff_name: "John Doe",
    shift_date: Date.new(2023, 6, 1),
    assigned_shift: "Morning",
    check_in: DateTime.new(2023, 6, 1, 8, 0, 0),
    check_out: DateTime.new(2023, 6, 1, 16, 0, 0),
    time_worked: "8 hours"
  },
  {
    staff_name: "Jane Smith",
    shift_date: Date.new(2023, 6, 2),
    assigned_shift: "Afternoon",
    check_in: DateTime.new(2023, 6, 2, 12, 0, 0),
    check_out: DateTime.new(2023, 6, 2, 20, 0, 0),
    time_worked: "8 hours"
  },
  {
    staff_name: "Alice Johnson",
    shift_date: Date.new(2023, 6, 3),
    assigned_shift: "Night",
    check_in: DateTime.new(2023, 6, 3, 22, 0, 0),
    check_out: DateTime.new(2023, 6, 4, 6, 0, 0),
    time_worked: "8 hours"
  }
]

attendances.each do |attendance|
  Attendance.create!(attendance)
end
