import catchAsync from '../../utils/catchAcync';
import { studentService } from './student.service';

//
const getStudent = catchAsync(async (req, res) => {
  const result = await studentService.getStudentIntoDB();
  res.status(200).json({
    success: true,
    message: 'get Student data successfully',
    data: result,
  });
});

// single data

const getStudentSingleData = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentService.getSingleStudentIntoDB(studentId);
  res.status(200).json({
    success: true,
    message: 'get single data successfully',
    data: result,
  });
});

export const studentController = {
  getStudent,
  getStudentSingleData,
};
