import express from 'express';
import validationRequest from '../validationRequest';

import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';

const router = express.Router();
//create semester registration
router.post(
  '/create-semester-registration',
  validationRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

//get all semester registration route
router.get('/', SemesterRegistrationController.getAllSemesterRegistration);

//get single semester route
router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

//update semester registration route
router.patch(
  '/',
  validationRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
