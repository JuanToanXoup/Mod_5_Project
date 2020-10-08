class CreateSchedules < ActiveRecord::Migration[6.0]
    def change
        create_table :schedules do |t|
        t.integer :user_id
        t.integer :class_period_id
        t.timestamps
        end
    end
end