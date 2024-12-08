import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { studentRoutes } from '../modules/students/student.route';
import { AcademicSemesterRoute } from '../modules/academicSemister/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';

const router = Router();
const moduleRoute = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
