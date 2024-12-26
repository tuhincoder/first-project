import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedCourseController } from './offeredCourse.controller';

const router = express.Router();
//CREATE COURSE
router.post(
  '/create-offered-course',
  validationRequest(OfferedCourseValidations.createOfferedCourseValidation),
  OfferedCourseController.createOfferedCourse,
);
//GET ALL COURSE
router.get('/id:', OfferedCourseController.getSingleOfferedCourse);

//GET SINGLE COURSE
router.get('/', OfferedCourseController.getAllOfferedCourse);

//DELETE COURSE
router.delete('/:id', OfferedCourseController.deleteOfferedCourse);

//UPDATE COURSE
router.patch(
  '/:id',
  validationRequest(OfferedCourseValidations.updateOfferedCourseValidation),
  OfferedCourseController.updateOfferedCourse,
);

export const OfferedCourseRoutes = router;
