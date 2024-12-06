import catchAsync from '../../utils/catchAcync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  // const {} = req.body;
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'create Semester Academic successfully',
    data: result,
  });
});
//get all academic semester
const getAllAcaDemicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'academic semester retrieved successfully',
    data: result,
  });
});
//get single academic semester data
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semester is retrieved successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcaDemicSemester,
  getSingleAcademicSemester,
};
