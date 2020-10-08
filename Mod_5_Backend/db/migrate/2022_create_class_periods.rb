class CreateClassPeriods < ActiveRecord::Migration[[6.0]
    def change
        create_table :class_periods do |t|
        t.integer :user_id
        t.integer :time
        t.integer :room_number
        t.string :subject
        end
    end
end