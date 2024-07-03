class ChangeQuestionsToJsonbInAppraisals < ActiveRecord::Migration[7.1]
  def change
    change_column :appraisals, :questions, :jsonb, using: 'questions::jsonb'
  end
end
