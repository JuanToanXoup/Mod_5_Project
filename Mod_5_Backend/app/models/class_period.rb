class ClassPeriod < ApplicationRecord
    has_many :schedules
    has_many :users, through: :schedules

    def self.getAllergies(class_period)
        allergy_names = []
        class_period.users.map{|student| student.allergies.map{|allergy| allergy_names.push(allergy.name)}}
        allergy_array = []
        class_period.users.map{|student| student.allergies.map{|allergy| allergy_array.push({name: allergy.name, count: allergy_names.count(allergy.name)})}}
        return allergy_array.uniq
    end

    def self.getESL(class_period)
        language_names = class_period.users.map{|student| student.primary_language}
        esl_array = class_period.users.map{|student| {name: student.primary_language, data: language_names.count(student.primary_language)}}
        return esl_array.uniq
    end

    def self.getGender(class_period)
        genders = class_period.users.map{|student| student.gender}
        gender_array = class_period.users.map{|student| {name: student.gender, data: genders.count(student.gender)}}
        return gender_array.uniq
    end
end