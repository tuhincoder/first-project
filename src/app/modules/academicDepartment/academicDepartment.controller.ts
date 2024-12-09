import catchAsync from '../../utils/catchAcync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'create academic department ar successfully',
    data: result,
  });
});

//get all academic department
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentService.getAllAcademicDepartmentFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department ar retrieved successfully',
    data: result,
  });
});

//get single academic department from DB
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(
      departmentId,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic department is retrieved successfully',
    data: result,
  });
});

//update academic department from db
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result = await AcademicDepartmentService.updateAcademicDepartmentIntoDB(
    departmentId,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department update is successfully',
    data: result,
  });
});
export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
