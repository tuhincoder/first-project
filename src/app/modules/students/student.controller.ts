import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAcync';
import sendResponse from '../../utils/sendResponse';
import { StudentService } from './student.service';

//
const getAllStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'get Student data successfully',
    data: result,
  });
});

// single data
const getStudentSingleData = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.getSingleStudentIntoDB(studentId);
  res.status(200).json({
    success: true,
    message: 'get single data successfully',
    data: result,
  });
});
//student update
const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  console.log(student);
  const result = await StudentService.updateStudentIntoDB(id, student);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'student updated successfully',
    data: result,
  });
});

//delete operation
const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.deleteStudentFromDB(id);

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
  updateStudent,
};
