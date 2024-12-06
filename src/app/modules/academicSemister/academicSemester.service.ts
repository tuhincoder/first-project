import { AcademicSemester } from './academicSemester.model';
import { TAcademicSemester } from './academicSemister.iterface';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
