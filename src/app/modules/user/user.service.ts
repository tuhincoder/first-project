import config from '../../config';
import { AcademicSemester } from '../academicSemister/academicSemester.model';
import { TAcademicSemester } from '../academicSemister/academicSemister.iterface';
import { TStudent } from '../students/student.iterface';
import { Student } from '../students/student.model';
// import { TAcademicSemester } from './academicSemister.iterface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  //if password is not given! use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

 
  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )
    //set manually generate id
    userData.id = generateStudentId(admissionSemester),
  
  //create user
  const newUser = await User.create(userData); // build in static method

  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    payload.id = newUser.id;
    payload.user = newUser._id;
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
