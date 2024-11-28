import { Student } from '../student.model';
import { TStudent } from './student.iterface';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }
  const result = await Student.create(studentData); // build in static method

  // const student = new Student(studentData); //create an instance

  // if (await student.isUserExits(studentData.id)) {
  //   throw new Error('User already exists');
  // }

  // if (await student.isUserExits(studentData.id)) {
  //   throw new Error('user already exists');
  // }

  // const result = await student.save();
  // build in instance method

  return result;
};

const getStudentIntoDB = async () => {
  const result = await Student.find();
  return result;
};

//get single data
const getSingleStudentIntoDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const studentService = {
  createStudentIntoDB,
  getStudentIntoDB,
  getSingleStudentIntoDB,
};
