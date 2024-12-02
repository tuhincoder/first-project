/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import validator from 'validator';

import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName as TUserName,
} from './students/student.iterface';
import bcrypt from 'bcrypt';
import config from '../config';

const nameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'first name is required'],
    trim: true,
    maxlength: [20, 'first name can not be more than 20 characters'],
    validate: {
      validator: function (value) {
        const firstNameStr = value.charAt(0).toUppercase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize formate',
    },
  },
  middleName: {
    type: String,
    trim: true,
    required: [true, 'middle name is required'],
    minlength: [5, 'middle name is les than 5 characters'],
    // validate: {
    //     validator: (value: string) =>validator.isAlpha(value),
    //     message: '{VALUE} is not valid'
    // }
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardian = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
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
    required: true,
  },
  motherContact: {
    type: String,
    required: true,
  },
});

const localGuardian = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: [true, 'password is required'],
    maxlength: [20, 'password is more than 20 letters'],
  },
  name: {
    type: nameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{value} is not valid gender',
    },
    required: [true, 'gender is required'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid email',
    },
  },
  contactNo: { type: String, required: true },
  emergencyContactNO: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message:
        "The gender field can only be one of the following: 'male, 'female' or 'other' ",
    },
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardian,
    required: true,
  },
  localGuardian: {
    type: localGuardian,
    required: true,
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'block'],
    default: 'active',
  },
});
// pre save middleWare/ hook : will work on create() save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'post hook : we saved our data');
  //hashing password and save into DB
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

studentSchema.post('save', function (doc, next) {
  doc.password = '';
  // console.log('post hook : we save our data');
  next();
});

//for creating an custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existsUser = await Student.findOne({ id });
  return existsUser;
};

//for creating an instance method
// studentSchema.methods.isUserExits = async function (id: string) {
//   const exitsUser = await Student.findOne({ id });
//   return exitsUser;
// };

// //for creating an instance
// studentSchema.methods.isUserExists = async function (id: string) {
//   const exitsUser = await Student.findOne({ id });
//   return exitsUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
