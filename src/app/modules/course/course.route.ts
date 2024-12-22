import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { CourseValidations } from './course.validation';
import { CourseController } from './course.controller';

const router = express.Router();
//create course
router.post(
  '/create-course',
  validationRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);
//get single course
router.get('/:id', CourseController.getSingleCourse);
//update course
router.patch(
  '/:id',
  validationRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourse,
);
//delete course
router.delete('/:id', CourseController.deleteCourse);
router.put(
  '/:courseId/assign-faculties',
  validationRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  validationRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.removeFacultiesFromCourse,
);
router.get('/', CourseController.getAllCourse);

export const CourseRoutes = router;
