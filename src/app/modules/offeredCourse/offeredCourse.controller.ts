import catchAsync from '../../utils/catchAcync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './offeredCourse.service';

// CREATE OFFERED COURSE
const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Create offered course successfully',
    data: result,
  });
});

//GET ALL OFFERED COURSE
const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCourseFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get All Offered retrieved successfully',
    data: result,
  });
});

//GET SINGLE OFFERED COURSE
const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.getSingleOfferedCourse(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'single offered retrieved successfully',
    data: result,
  });
});

//UPDATE OFFERED
const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.updateOfferedCourse(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'update offered course',
    data: result,
  });
});
export const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
};
