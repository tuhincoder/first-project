import QueryBuilder from '../../builder/QueryBuilder';
import { AcademicSemester } from '../../modules/academicSemister/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

//create semester registration
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  console.log(payload);
  //check if the semester is exists
  const academicSemester = payload?.academicSemester;
  //check if there any registered semester that is already 'UPCOMING'| 'ONGOING
  const isThereAnyUpcomingOnGoingSemester = await SemesterRegistration.findOne({
    $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
  });
  if (isThereAnyUpcomingOnGoingSemester) {
    throw new Error(
      `There is already ${isThereAnyUpcomingOnGoingSemester.status} registered semester !`,
    );
  }
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
const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

//get single semester registration
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

//update semester registration
const updateSemesterRegistrationIntoDB = async (id: string) => {};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
