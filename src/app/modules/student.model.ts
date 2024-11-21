import { model, Schema } from "mongoose";
import { Guardian, LocalGuardian, Student, UserName } from "./students/student.iterface";


const nameSchema = new Schema<UserName>(
    {
        firstName: {
            type: String,
            required: true
        },
        middleName: {
            type: String,

        },
        lastName: {
            type: String,
            required: true,
        }
     }
)

//guardian schema
const guardian  = new Schema<Guardian>(
    {
        fatherName: {
            type: String,
            required: true
        },
        fatherOccupation: {
            type: String,
            required: true,
        },
        fatherContact: {
            type: String,
            required: true,
        },
        motherName: {
            type: String,
            required: true,
            },
        motherOccupation: {
            type: String,
            required: true
        },
        motherContact: {
            type: String,
            required: true
        }
     }
)

//local guardian schema
const localGuardian = new Schema<LocalGuardian>(
    {
        name: {
            type: String,
            required: true
        },
        occupation: {
            type: String,
            required: true
        },
        contactNo: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
     }
)


// ----------------------------------
const studentSchema = new Schema<Student>({
     id: {type: String},
     name: nameSchema,
     gender: ["male" ,"female"],
     dateOfBirth: {type: String},
     email: {type: String, required: true},
     contactNo: {type: String, required: true},
     emergencyContactNO: {type:String, required: true},
     bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
     presentAddress: {type: String,required: true },
     permanentAddress: {type: String, required: true},
     guardian: guardian,
     localGuardian: localGuardian,
     profileImg: {type: String},
     isActive: ['active','block'],
     
})

// export const StudentModel  = model<Student>('Student',studentSchema);
export const StudentMOdel = model<Student>('Student',studentSchema)

