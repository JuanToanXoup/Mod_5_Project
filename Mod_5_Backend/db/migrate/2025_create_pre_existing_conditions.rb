class CreatePreExistingConditions < ActiveRecord::Migration[6.0]
    def change
      create_table :pre_existing_conditions do |t|
        t.integer :user_id
        t.string :name
        t.string :symptoms
        t.string :reccomended_action
      end
    end
  end