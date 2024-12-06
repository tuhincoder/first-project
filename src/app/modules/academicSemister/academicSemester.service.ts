import { academicSemesterCodeMapper } from './academicSemester.const';
import { AcademicSemester } from './academicSemester.model';
import { TAcademicSemester } from './academicSemister.iterface';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //

  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code');
  }
  //
  const result = await AcademicSemester.create(payload);
  return result;
};
//get all academic semester data
const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

//get single academic semester data
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById({ id });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
};
