import express from 'express';
import { userController } from './user.controller';
import validationRequest from '../../middlewares/validationRequest';
import { studentValidations } from '../students/student.zod.validation';

const router = express.Router();

//
router.post(
  '/create-student',
  validationRequest(studentValidations.createStudentValidationSchema),
  userController.createStudent,
);

export const UserRoutes = router;
