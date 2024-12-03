import { Student } from './student.model';

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
  getStudentIntoDB,
  getSingleStudentIntoDB,
};
