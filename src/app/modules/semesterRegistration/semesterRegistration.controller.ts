import catchAsync from '../../utils/catchAcync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.createSemesterRegistrationIntoDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Create Semester registration successfully',
    data: result,
  });
});

//get All semester registration
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.getAllSemesterRegistrationFromDB(
      req.query,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Semester registration retrieved successfully',
    data: result,
  });
});

//get single semester registration
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationService.getSingleSemesterRegistrationFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'single semester registration successfully',
    data: result,
  });
});

//update into db
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result =
    await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
      id,
      req.body,
    );
  console.log(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'update semester registration successfully',
    data: result,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
