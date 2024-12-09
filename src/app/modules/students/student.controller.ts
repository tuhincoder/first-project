import catchAsync from '../../utils/catchAcync';
import sendResponse from '../../utils/sendResponse';
import { StudentService } from './student.service';

//
const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentFromDB();
  res.status(200).json({
    success: true,
    message: 'get Student data successfully',
    data: result,
  });
});

// single data
const getStudentSingleData = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.getSingleStudentIntoDB(studentId);
  res.status(200).json({
    success: true,
    message: 'get single data successfully',
    data: result,
  });
});

//delete operation
const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'delete student',
    data: result,
  });
});

export const StudentController = {
  getAllStudent,
  getStudentSingleData,
  deleteStudent,
};
