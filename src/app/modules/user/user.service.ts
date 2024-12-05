import config from '../../config';
import { TStudent } from '../students/student.iterface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};
  //if password is not given! use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  //set manually generate id
  userData.id = '2030100001';
  //create user
  const newUser = await User.create(userData); // build in static method

  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
