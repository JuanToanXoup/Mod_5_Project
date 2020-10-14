class User < ApplicationRecord
    has_secure_password
    
    has_many :schedules
    has_many :class_periods, through: :schedules
    has_many :emergency_contacts
    has_many :prescriptions
    has_many :pre_existing_conditions
    has_many :allergies
    has_many :notes
    

    validates :username, uniqueness: { case_sensitive: false }
end
