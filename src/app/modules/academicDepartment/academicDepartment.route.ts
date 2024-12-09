import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validationRequest from '../../middlewares/validationRequest';
import { AcademicDepartmentValidationSchema } from './academicDepartment.validation';

const router = express.Router();

//create academic department
router.post(
  '/create-academic-department',
  validationRequest(
    AcademicDepartmentValidationSchema.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
);

//get single Academic department
router.get(
  '/:departmentId',
  AcademicDepartmentController.getSingleAcademicDepartment,
);

//update academic department
router.patch(
  '/:departmentId',
  validationRequest(
    AcademicDepartmentValidationSchema.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);

//get all academic department
router.get('/', AcademicDepartmentController.getAllAcademicDepartment);

export const AcademicDepartmentRoutes = router;
