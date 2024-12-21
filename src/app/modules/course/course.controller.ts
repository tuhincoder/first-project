import catchAsync from '../../utils/catchAcync';
import sendResponse from '../../utils/sendResponse';
import { CourseService } from './course.service';

//create course
const createCourse = catchAsync(async (req, res) => {
  const result = await CourseService.createCourseIntoDb(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is create successfully',
    data: result,
  });
});

//get All course
const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseService.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course are retrieved successfully',
    data: result,
  });
});

//get single course
const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.getSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'get is single course retrieved successfully',
    data: result,
  });
});

//get updated
const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.updateCourseIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'course is update successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.deleteCourseFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is delete successfully',
    data: result,
  });
});
export const CourseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
