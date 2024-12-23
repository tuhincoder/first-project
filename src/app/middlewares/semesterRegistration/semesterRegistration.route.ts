import express from 'express';
import validationRequest from '../validationRequest';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();
//create semester registration
router.post(
  '/',
  validationRequest(
    SemesterRegistrationValidation.createRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

//get all semester registration route
router.get('', SemesterRegistrationController.getAllSemesterRegistration);

//get single semester route
router.get('/', SemesterRegistrationController.getSingleSemesterRegistration);

//update semester registration route
router.patch('/', SemesterRegistrationController.updateSemesterRegistration);
