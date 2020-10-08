class CreateEmergencyContacts < ActiveRecord::Migration[6.0]
    def change
        create_table :emergency_contacts do |t|
        t.integer :user_id
        t.string :contact_name
        t.string :contact_relationship
        t.integer :phone_number
        end
    end
end