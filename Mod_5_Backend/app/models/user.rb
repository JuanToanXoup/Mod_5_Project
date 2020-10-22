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


    def self.search(search)
        student_array = User.all.select{|user| user.user_type == 'student'}
        search_first_name = student_array.select{|student| student.first_name == search[:first_name]}
        search_last_name = student_array.select{|student| student.last_name == search[:last_name]}
        search_id = student_array.select{|student| student.id == search[:id].to_i}
        search_bus_number = student_array.select{|student| student.bus_number == search[:bus_number].to_i}
        search_array = (search_first_name + search_last_name + search_id + search_bus_number).uniq
        return search_array
    end
end
