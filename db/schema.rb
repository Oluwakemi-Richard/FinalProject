# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_07_09_154258) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appraisals", force: :cascade do |t|
    t.string "appraised_by"
    t.date "appraisal_date"
    t.jsonb "questions"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "employee_id"
    t.string "appraisal_month"
    t.integer "appraisal_year"
  end

  create_table "attendances", force: :cascade do |t|
    t.string "staff_name"
    t.date "shift_date"
    t.string "assigned_shift"
    t.datetime "check_in"
    t.datetime "check_out"
    t.string "time_worked"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "employee_number"
    t.integer "shift_id"
  end

  create_table "details", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "employees", force: :cascade do |t|
    t.string "employee_number"
    t.string "name"
    t.string "position"
    t.string "department"
    t.string "branch"
    t.string "address"
    t.string "phone_number"
    t.string "email"
    t.date "start_date"
    t.string "gender"
    t.date "date_of_birth"
    t.decimal "salary"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.index ["email"], name: "index_employees_on_email", unique: true
    t.index ["employee_number"], name: "index_employees_on_employee_number", unique: true
    t.index ["reset_password_token"], name: "index_employees_on_reset_password_token", unique: true
  end

  create_table "leaves", force: :cascade do |t|
    t.bigint "employee_id", null: false
    t.date "start_date"
    t.date "end_date"
    t.string "reason"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_leaves_on_employee_id"
  end

  create_table "payrolls", force: :cascade do |t|
    t.bigint "employee_id", null: false
    t.date "payment_date"
    t.decimal "amount"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_payrolls_on_employee_id"
  end

  create_table "performances", force: :cascade do |t|
    t.bigint "employee_id", null: false
    t.date "review_date"
    t.integer "score"
    t.text "comments"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_performances_on_employee_id"
  end

  create_table "shifts", force: :cascade do |t|
    t.string "employee_number", null: false
    t.date "shift_date", null: false
    t.time "start_time", null: false
    t.time "end_time", null: false
    t.decimal "shift_duration", precision: 5, scale: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "checked_in", default: false
    t.boolean "checked_out", default: false
    t.index ["employee_number"], name: "index_shifts_on_employee_number"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "appraisals", "employees"
  add_foreign_key "attendances", "shifts"
  add_foreign_key "leaves", "employees"
  add_foreign_key "payrolls", "employees"
  add_foreign_key "performances", "employees"
  add_foreign_key "shifts", "employees", column: "employee_number", primary_key: "employee_number"
end
