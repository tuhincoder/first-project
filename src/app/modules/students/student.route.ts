import express from 'express';
import { StudentController } from './student.controller';
import validationRequest from '../../middlewares/validationRequest';
import { studentValidations } from './student.zod.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudent);

router.patch(
  ':/studentId',
  validationRequest(studentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
);

router.delete('/:studentId', StudentController.deleteStudent);

// router.get('/:studentId',studentController.getStudentSingleData)
router.get('/:studentId', StudentController.getStudentSingleData);

export const studentRoutes = router;
