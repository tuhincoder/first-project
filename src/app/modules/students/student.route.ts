import express from 'express';
import { StudentController } from './student.controller';
import validationRequest from '../../middlewares/validationRequest';
import { studentValidations } from './student.zod.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudent);

router.patch(
  ':/id',
  validationRequest(studentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
);

router.delete('/:id', StudentController.deleteStudent);

// router.get('/:studentId',studentController.getStudentSingleData)
router.get('/:id', StudentController.getStudentSingleData);

export const studentRoutes = router;
