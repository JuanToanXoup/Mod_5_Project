class CreateAllergies < ActiveRecord::Migration[6.0]
    def change
      create_table :allergies do |t|
        t.integer :user_id
        t.string :name
        t.string :symptoms
        t.string :treatment
      end
    end
  end