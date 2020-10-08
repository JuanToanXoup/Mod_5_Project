class CreatePrescriptions < ActiveRecord::Migration[6.0]
    def change
      create_table :prescriptions do |t|
        t.integer :user_id
        t.string :name
        t.string :daily_dose
        t.string :expiration
      end
    end
  end