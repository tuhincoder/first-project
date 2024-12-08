// import config from '../../config';
// import { AcademicSemester } from '../academicSemister/academicSemester.model';

import config from '../../config';
import { AcademicSemester } from '../academicSemister/academicSemester.model';
import { TStudent } from '../students/student.iterface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

// import { TStudent } from '../students/student.iterface';
// import { Student } from '../students/student.model';
// // import { TAcademicSemester } from './academicSemister.iterface';
// import { TUser } from './user.interface';
// import { User } from './user.model';
// import { generateStudentId } from './user.utils';

// const createStudentIntoDB = async (password: string, payload: TStudent) => {
//   const userData: Partial<TUser> = {};
//   //if password is not given! use default password
//   userData.password = password || (config.default_password as string);

//   //set student role
//   userData.role = 'student';

//   //find academic semester info
//   const admissionSemester = await AcademicSemester.findById(
//     payload.admissionSemester
//   )
//     //set generate id
//     userData.id = generateStudentId(admissionSemester),

//   //create a user
//   const newUser = await User.create(userData);

//   //create a student
//   if (Object.keys(newUser).length) {
//     //set id, _id as user
//     payload.id = newUser.id;
//     payload.user = newUser._id;
//     const newStudent = await Student.create(payload);
//     return newStudent;
//   }
// };

// export const UserServices = {
//   createStudentIntoDB,
// };

// import config from '../../config';
// import { TStudent } from '../student/student.interface';
// import { Student } from '../student/student.model';
// import { AcademicSemester } from './../academicSemester/academicSemester.model';
// import { TUser } from './user.interface';
// import { User } from './user.model';
// import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  //set  generated id
  userData.id = await generateStudentId(admissionSemester);

  // create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
