import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
//CREATE OFFERED COURSE
const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const { semesterRegistration, academicFaculty, academicDepartment, course } =
    payload;
  // if the semester registration id is exists
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  const academicSemester = isSemesterRegistrationExists?.academicSemester;
  //----------------
  if (!isSemesterRegistrationExists) {
    throw new Error('semester registration not found');
  }
  // is the academic faculty isExists
  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new Error('Academic faculty not found');
  }
  // is the academic Department is exists
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new Error('Academic Department is not found');
  }
  //is the Course is Exists
  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new Error('Course is not found');
  }

  //check if the department is belong  to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new Error(
      `This ${isAcademicDepartmentExists.name} is not belong to ${isAcademicFacultyExists.name}`,
    );
  }
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

//GET ALL OFFERED COURSE
const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const result = await OfferedCourse.find();
  return result;
};

//GET SINGLE OFFERED COURSE
const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

//UPDATE OFFERED COURSE
const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {
  const result = await OfferedCourse.findByIdAndUpdate(id);
  return result;
};

//DELETE OFFERED COURSE
const deleteOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findByIdAndUpdate(id);
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
};
