import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validationRequest from '../../middlewares/validationRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validationRequest(
    AcademicSemesterValidation.createAcademicSemesterValidation,
  ),
  AcademicSemesterController.createAcademicSemester,
);

//get all Academic semester route
router.get('/', AcademicSemesterController.getAllAcaDemicSemester);

//get single data from mongodb
router.get(
  '/:semesterId',
  AcademicSemesterController.getSingleAcademicSemester,
);
export const AcademicSemesterRoute = router;
