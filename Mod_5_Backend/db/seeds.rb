
# Create Class Periods
set_room_number = 100
set_subject = ["Math","Science","English","Social Studies","Physical Education","Art","Choir","Orchestra","Spanish","French"]
set_time = 800
4.times do |index|
    10.times do |period_index|
        ClassPeriod.create({time: set_time, room_number: set_room_number+period_index, subject: set_subject[period_index]})
    end
    set_time += 100
    set_room_number += 10
end
set_time += 100
3.times do |index|
    10.times do |period_index|
        ClassPeriod.create({time: set_time, room_number: set_room_number+period_index, subject: set_subject[period_index]})
    end
    set_time += 100
    set_room_number += 10
end

# Create Students
50.times do |index|
    first = Faker::Name.first_name
    last = Faker::Name.last_name
    language = ["English","English","English","English","English","English","English","English","Spanish","Spanish","Spanish","Vietnamese","Chinese","Hindi"]
    student = User.create({
        username: "#{first}#{last}123",
        password: "password",
        first_name: first,
        last_name: last,
        age: rand(6..11),
        gender: Faker::Gender.binary_type,
        avatar: Faker::Avatar.image,
        bus_number: rand(20..40),
        primary_language: language[rand(0..13)],
        user_type: 'student'
    })

    3.times do |index|
        family_array = ['Father','Mother','Uncle']
        EmergencyContact.create({
            user_id: student.id,
            contact_name: "#{Faker::Name.first_name} #{last}",
            contact_relationship:  family_array[index],
            phone_number: Faker::PhoneNumber.cell_phone
        })
        drugs = ["Amoxicillin","Azithromycin","Albuterol","Cefdinir","Cephalexin","Fluticasone",
            "Ibuprofen","Singulair","Tylenol #3","Vicodin","Mupirocin","Nystatin","Methylphenidate",
            "Mometasone","Triamcinolone","Prednisone","Adderall","Hydrocortisone","Budesonide","Promethazine",
            "Prednisolone","Benzocaine","Lisdexamfetamine"]
        Prescription.create({
            user_id: student.id,
            name: drugs[rand(0..22)],
            daily_dose: "#{rand(1..10)} ml/mg",
            expiration: Faker::Date.between(Faker::Date.backward(120),Faker::Date.forward(120))
        })
        conditions = ["Diabetes","Asthma","Attention-deficit/hyperactivity disorder","","","","",""]
        condition = conditions[rand(0..7)]
        if condition != "" && !User.find(student.id).pre_existing_conditions.map{|conditionIndex| conditionIndex.name == condition}.include?(true)
            PreExistingCondition.create({
                user_id: student.id,
                name: condition,
                symptoms: "",
                recommended_action: ""
            })
        end
        allergies = ["Peanuts","Eggs","Milk","Soy","Wheat","Tree Nuts","Shellfish","Fish","Sesame Seeds","","","","","","","","","",""]
        allergy = allergies[rand(0..18)]
        if allergy != "" && !User.find(student.id).allergies.map{|allergiesIndex| allergiesIndex.name == allergy}.include?(true)
            Allergy.create({
                user_id: student.id,
                name: allergy,
                symptoms: "",
                treatment: ""
            })
        end
        Note.create({
            user_id: student.id,
            text: "notes about student"
        })
    end
end

User.all.each do |student|
    schedule_size = 0
    while schedule_size < 7
        new_period = ClassPeriod.find(rand(1..70))
        time_check = !student.class_periods.map{|period| period.time}.include?(new_period.time)
        subject_check = !student.class_periods.map{|period| period.subject}.include?(new_period.subject)
        if time_check && subject_check
            Schedule.create({user_id: student.id,class_period_id: new_period.id})
            schedule_size += 1
        end
    end
end

# User.all.each do |student|
#     schedule_size = 0
#     while schedule_size < 7
#         new_period = ClassPeriod.find(rand(1..70))
#         time_check = !student.class_periods.map{|period| period.time}.any?{|time| time == new_period.time}
#         subject_check = !student.class_periods.map{|period| period.subject}.any?{|subject| subject == new_period.subject}
        
#         if time_check==true && subject_check==true
#             Schedule.create({user_id: student.id,class_period_id: new_period.id})
#             schedule_size += 1
#         end
#     end
# end