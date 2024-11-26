import { model, Schema } from "mongoose";
import validator from 'validator';
import { Guardian, LocalGuardian, Student, UserName } from "./students/student.iterface";


const nameSchema = new Schema<UserName>(
    {
        firstName: {
            type: String,
            required: [true,'first name is required'],
            trim: true,
            maxlength: [20, 'first name can not be more than 20 characters'],
           validate: {
            validator: function(value){
            const firstNameStr = value.charAt(0).toUppercase() + value.slice(1);
            return firstNameStr === value;
            },
            message: '{VALUE} is not in capitalize formate'
           } 
        },
        middleName: {
            type: String,
            trim: true,
            required: [true, 'middle name is required'],
            minlength: [5,'middle name is les than 5 characters'],
            // validate: {
            //     validator: (value: string) =>validator.isAlpha(value),
            //     message: '{VALUE} is not valid'
            // }
            validate: {
                validator: (value: string) => validator.isAlpha(value),
                message: '{VALUE} is not valid'
            }

        },
        lastName: {
            type: String,
            required: true,
        }
     }
)

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


const studentSchema = new Schema<Student>({
     id: {type: String, required: true, unique: true},
     name: {
        type: nameSchema,
        required: true
     },
     gender:{
        type: String,
        enum:{
           values:["male" ,"female","other"],
            message: '{value} is not valid gender'
        } ,
        required: [true, 'gender is required']
     },
     dateOfBirth: {type: String},
     email: {
        type: String, required: true, unique: true,
       validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "{VALUE} is not valid email"
       }

    },
     contactNo: {type: String, required: true},
     emergencyContactNO: {type:String, required: true},
     bloodGroup: {
        type: String,
        enum:{
             values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: "The gender field can only be one of the following: 'male, 'female' or 'other' ",
        }
     },
     presentAddress: {type: String,required: true },
     permanentAddress: {type: String, required: true},
     guardian: {
        type:guardian,
        required: true
     },
     localGuardian:{
        type:  localGuardian,
        required: true
     },
     profileImg: {type: String},
     isActive: {
        type: String,
        enum: ['active','block'],
        default: 'active'
     },
     
})

export const StudentModel = model<Student>('Student',studentSchema);


