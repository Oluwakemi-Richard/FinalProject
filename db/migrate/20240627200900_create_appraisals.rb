class CreateAppraisals < ActiveRecord::Migration[7.1]
  def change
    create_table :appraisals do |t|
      t.references :employee, null: false, foreign_key: true
      t.string :appraised_by
      t.date :appraisal_date
      t.json :questions
      t.text :notes

      t.timestamps
    end
  end
end
