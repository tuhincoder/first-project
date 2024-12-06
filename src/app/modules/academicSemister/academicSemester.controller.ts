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

export const academicSemesterController = {
  createAcademicSemester,
};
