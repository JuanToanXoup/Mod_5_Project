class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :first_name
      t.string :last_name
      t.string :age
      t.string :gender
      t.string :avatar
      t.integer :bus_number
      t.integer :room_number
      t.string :primary_language
      t.string :user_type

      t.timestamps
    end
  end
end
