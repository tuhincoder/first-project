import QueryBuilder from '../../builder/QueryBuilder';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../Faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { hasTimeConflict } from './offeredCourse.utils';
//CREATE OFFERED COURSE
const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    section,
    academicFaculty,
    academicDepartment,
    course,
    days,
    startTime,
    endTime,
  } = payload;
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

  //check if the same offered course same section is same registered semester exists
  const isSameOfferedCourseExistsWithSameRegisterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });
  if (isSameOfferedCourseExistsWithSameRegisterWithSameSection) {
    throw new Error('offered course with same section is already exists!');
  }
  //get the schedules of the faculties
  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,
    days: { $in: days },
  }).select('days startTime endTime');
  console.log(assignSchedules);

  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignSchedules, newSchedule)) {
    throw new Error(
      'this faculty is not available at the time ! choose other time and date',
    );
  }
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

//GET ALL OFFERED COURSE
const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await offeredCourseQuery.modelQuery;
  return result;
};

//GET SINGLE OFFERED COURSE
const getSingleOfferedCourseFromDB = async (id: string) => {
  const isSingleOfferedCourse = await OfferedCourse.findById(id);
  if (!isSingleOfferedCourse) {
    throw new Error('offered course not found');
  }
  return isSingleOfferedCourse;
};

//UPDATE OFFERED COURSE
const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'days' | 'startTime' | 'endTime'>,
) => {
  // const {faculty} = payload
  const { days, startTime, endTime } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new Error('offered course not found');
  }

  // const isFacultyExists = await Faculty.findById(faculty);
  // if (!isFacultyExists) {
  //   throw new Error('Faculty not found!');
  // }

  //get the schedules of the faculties
  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);
  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new Error(
      `you can not update this offered as it is ${semesterRegistrationStatus?.status}`,
    );
  }
  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,
    days: { $in: days },
  }).select('days startTime endTime');
  console.log(assignSchedules);

  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignSchedules, newSchedule)) {
    throw new Error(
      'this faculty is not available at the time ! choose other time and date',
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

//DELETE OFFERED COURSE
const deleteOfferedCourseFromDB = async (id: string) => {
  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new Error('offered course not found');
  }

  //check if the semester registration is upcoming
  // const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  // const semesterRegistrationStatus =
  //   await SemesterRegistration.findById(semesterRegistration).select('status');
  // if (semesterRegistrationStatus?.status !== 'UPCOMING') {
  //   throw new Error(
  //     `Offered course can not update! because the semester is ${semesterRegistrationStatus}`,
  //   );
  // }
  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration).select('status');
  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new Error(
      `Offered course can not update! because the semester is ${semesterRegistration}`,
    );
  }
  const result = await OfferedCourse.findByIdAndDelete(id);
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
};
