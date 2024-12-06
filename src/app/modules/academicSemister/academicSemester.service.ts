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

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
