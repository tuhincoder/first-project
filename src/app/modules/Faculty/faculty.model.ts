import { Schema } from 'mongoose';
import { TFaculty, TFacultyUserName } from './faculty.interface';
import { BloodGroup, Gender } from './faculty.const';

//type name
const facultyNameSchema = new Schema<TFacultyUserName>({
  firstName: {
    type: String,
    required: [true, 'first name is required'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'last name is required'],
    maxlength: [20, 'last name is more than 20 characters'],
  },
});

// main faculty schema
const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: [true, 'User id is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is Required'],
    },
    name: {
      type: facultyNameSchema,
      required: [true, 'name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not a valid gender',
      },
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact Number is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    profileImage: {
      type: String,
    },
    AcademicDepartMent: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Department is required'],
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);
