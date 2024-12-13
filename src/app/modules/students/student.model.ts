// /* eslint-disable @typescript-eslint/no-this-alias */
// import { model, Schema } from 'mongoose';
// import validator from 'validator';
// // import { TUserName } from './student.iterface';

// import {
//   TGuardian,
//   TLocalGuardian,
//   TStudent,
//   StudentModel,
//   TUserName as TUserName,
// } from './student.iterface';

// // import config from './config';

// const nameSchema = new Schema<TUserName>({
//   firstName: {
//     type: String,
//     required: [true, 'first name is required'],
//     trim: true,
//     maxlength: [20, 'first name can not be more than 20 characters'],
//     // validate: {
//     //   validator: function (value) {
//     //     const firstNameStr = value.charAt(0).toUppercase() + value.slice(1);
//     //     return firstNameStr === value;
//     //   },
//     //   message: '{VALUE} is not in capitalize formate',
//     // },
//   },
//   middleName: {
//     type: String,
//     trim: true,
//     required: [true, 'middle name is required'],
//     // validate: {
//     //     validator: (value: string) =>validator.isAlpha(value),
//     //     message: '{VALUE} is not valid'
//     // }
//     validate: {
//       validator: (value: string) => validator.isAlpha(value),
//       message: '{VALUE} is not valid',
//     },
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
// });

// const guardian = new Schema<TGuardian>({
//   fatherName: {
//     type: String,
//     required: true,
//   },
//   fatherOccupation: {
//     type: String,
//     required: true,
//   },
//   fatherContact: {
//     type: String,
//     required: true,
//   },
//   motherName: {
//     type: String,
//     required: true,
//   },
//   motherOccupation: {
//     type: String,
//     required: true,
//   },
//   motherContact: {
//     type: String,
//     required: true,
//   },
// });

// const localGuardian = new Schema<TLocalGuardian>({
//   name: {
//     type: String,
//     required: true,
//   },
//   occupation: {
//     type: String,
//     required: true,
//   },
//   contactNo: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
// });

// //------------------------
// //main schema
// const studentSchema = new Schema<TStudent, StudentModel>(
//   {
//     id: { type: String, required: [true, 'Id is required'], unique: true },
//     user: {
//       type: Schema.Types.ObjectId,
//       required: [true, 'user Id is required'],
//       unique: true,
//       ref: 'User',
//     },
//     // password: {
//     //   type: String,
//     //   required: [true, 'password is required'],
//     //   maxlength: [20, 'password is more than 20 letters'],
//     // },
//     name: {
//       type: nameSchema,
//       required: true,
//     },
//     gender: {
//       type: String,
//       enum: {
//         values: ['male', 'female', 'other'],
//         message: '{value} is not valid gender',
//       },
//       required: [true, 'gender is required'],
//     },
//     dateOfBirth: { type: Date },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     contactNo: { type: String, required: true },
//     emergencyContactNO: { type: String, required: true },
//     bloodGroup: {
//       type: String,
//       enum: {
//         values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//         message:
//           "The gender field can only be one of the following: 'male, 'female' or 'other' ",
//       },
//     },
//     presentAddress: { type: String, required: true },
//     permanentAddress: { type: String, required: true },
//     guardian: {
//       type: guardian,
//       required: true,
//     },
//     localGuardian: {
//       type: localGuardian,
//       required: true,
//     },
//     admissionSemester: {
//       type: Schema.Types.ObjectId,
//       ref: 'AcademicSemester',
//     },
//     profileImg: { type: String },
//     academicDepartment: {
//       //
//       type: Schema.Types.ObjectId,
//       ref: 'AcademicDepartment',
//     },
//     isDeleted: { type: Boolean, default: false },
//   },
//   {
//     toJSON: {
//       virtuals: true,
//     },
//   },
// );

// //

// //for creating an custom static method
// studentSchema.statics.isUserExists = async function (id: string) {
//   const existsUser = await Student.findOne({ id });
//   return existsUser;
// };

// //for creating an instance method
// // studentSchema.methods.isUserExits = async function (id: string) {
// //   const exitsUser = await Student.findOne({ id });
// //   return exitsUser;
// // };

// // //for creating an instance
// // studentSchema.methods.isUserExists = async function (id: string) {
// //   const exitsUser = await Student.findOne({ id });
// //   return exitsUser;
// // };

// export const Student = model<TStudent, StudentModel>('Student', studentSchema);
import { Schema, model } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father Name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact No is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact No is required'],
  },
});

const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuradianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImg: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    // isDeleted: {
    //   type: Boolean,
    //   default: false,
    // },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
// studentSchema.virtual('fullName').get(function () {
//   return this.name.firstName + this.name.middleName + this.name.lastName;
// });

// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// studentSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
