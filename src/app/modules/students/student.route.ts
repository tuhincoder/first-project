import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/', StudentController.getAllStudent);

router.delete('/:studentId', StudentController.deleteStudent);

// router.get('/:studentId',studentController.getStudentSingleData)
router.get('/:studentId', StudentController.getStudentSingleData);

export const studentRoutes = router;
