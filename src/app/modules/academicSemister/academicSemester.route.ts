import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validationRequest from '../../middlewares/validationRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validationRequest(
    AcademicSemesterValidation.createAcademicSemesterValidation,
  ),
  academicSemesterController.createAcademicSemester,
);

export const academicSemester = router;
