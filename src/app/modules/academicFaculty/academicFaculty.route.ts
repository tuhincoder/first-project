import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();
//create academic faculty
router.post(
  '/create-academic-faculty',
  validationRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

//get all academic faculty
router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);

//update academic faculty
router.patch(
  '/:facultyId',
  validationRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

//get single Academic faculty
router.get('/', AcademicFacultyController.getAllAcademicFaculties);

export const AcademicFacultyRoutes = router;
