import { AcademicSemester } from '../../modules/academicSemister/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

//create semester registration
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  //check if the semester is exists
  const academicSemester = payload?.academicSemester;
  const isAcademicSemester = await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemester) {
    throw new Error('This academic semester not found');
  }
  // if the semester already exists
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new Error('This semester is already registered');
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

//get all semester registration
const getAllSemesterRegistrationFromDB = async () => {};

//get single semester registration
const getSingleSemesterRegistrationFromDB = async () => {};

//update semester registration
const updateSemesterRegistrationIntoDB = async () => {};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
