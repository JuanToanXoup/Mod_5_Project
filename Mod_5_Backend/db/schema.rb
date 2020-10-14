# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2027) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "allergies", force: :cascade do |t|
    t.integer "user_id"
    t.string "name"
    t.string "symptoms"
    t.string "treatment"
  end

  create_table "class_periods", force: :cascade do |t|
    t.integer "time"
    t.integer "room_number"
    t.string "subject"
  end

  create_table "emergency_contacts", force: :cascade do |t|
    t.integer "user_id"
    t.string "contact_name"
    t.string "contact_relationship"
    t.string "phone_number"
  end

  create_table "notes", force: :cascade do |t|
    t.integer "user_id"
    t.string "text"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "pre_existing_conditions", force: :cascade do |t|
    t.integer "user_id"
    t.string "name"
    t.string "symptoms"
    t.string "recommended_action"
  end

  create_table "prescriptions", force: :cascade do |t|
    t.integer "user_id"
    t.string "name"
    t.string "daily_dose"
    t.string "expiration"
  end

  create_table "schedules", force: :cascade do |t|
    t.integer "user_id"
    t.integer "class_period_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.string "age"
    t.string "gender"
    t.string "avatar"
    t.integer "bus_number"
    t.string "primary_language"
    t.string "user_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
