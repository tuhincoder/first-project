import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemister/academicSemester.model';
import { TStudent } from '../students/student.iterface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
// import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { TFaculty } from '../Faculty/faculty.interface';
import { User } from './user.model';

// const createStudentIntoDB = async (password: string, payload: TStudent) => {
//   // create a user object
//   const userData: Partial<TUser> = {};

//   //if password is not given , use deafult password
//   userData.password = password || (config.default_password as string);

//   // set student role
//   userData.role = 'student';

//   // find academic semester info
//   const admissionSemester = await AcademicSemester.findById(
//     payload.admissionSemester,
//   );

//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     //set  generated id
//     userData.id = await generateStudentId(admissionSemester);

//     // create a user data (transaction-1)
//     const newUser = await User.create([userData], { session });

//     //create a student
//     if (!newUser.length) {
//       throw new Error('failed to create user');
//     }
//     // set id , _id as user
//     payload.id = newUser[0].id;
//     payload.user = newUser[0]._id; //reference _id

//     // create a user data (transaction-2)
//     const newStudent = await Student.create([payload], { session });
//     if (!newStudent.length) {
//       //
//       throw new Error('failed to create Student');
//     }

//     await session.commitTransaction();
//     await session.endSession();
//     return newStudent;
//   } catch (err) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error(err);
//   }
// };

// const createStudentIntoDB = async();

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create user object

  const userData: Partial<TUser> = {};
  //if password is not given, use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';
  //set manually generated id
  // user.id = '2030100001';
  userData.id = '2030100001';

  //create a user
  const newUser = await User.create(userData);
  // create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id; //embedding id
    payload.user = newUser._id; //reference _id

    //create student
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};
export const UserServices = {
  createStudentIntoDB,
};
