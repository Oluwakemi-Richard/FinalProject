class RemoveAndAddEmployeeNumberInAppraisals < ActiveRecord::Migration[7.1]
  def change
    def change
      remove_column :appraisals, :employee_number, :bigint
      add_column :appraisals, :employee_number, :string
    end
  end
end
