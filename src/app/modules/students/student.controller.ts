import { NextFunction, RequestHandler } from 'express';
import { studentService } from './student.service';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

//
const getStudent = catchAsync(async (req, res, next) => {
  const result = await studentService.getStudentIntoDB();
  res.status(200).json({
    success: true,
    message: 'get Student data successfully',
    data: result,
  });
});

// single data

const getStudentSingleData = catchAsync(async (req, res, next) => {
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
