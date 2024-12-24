import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
//CREATE OFFERED COURSE
const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const result = await OfferedCourse.create();
  return result;
};

//GET ALL OFFERED COURSE
const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const result = await OfferedCourse.find();
  return result;
};

//GET SINGLE OFFERED COURSE
const getSingleOfferedCourse = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

//UPDATE OFFERED COURSE
const updateOfferedCourse = async (id: string) => {
  const result = await OfferedCourse.findByIdAndUpdate(id);
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourse,
  updateOfferedCourse,
};
