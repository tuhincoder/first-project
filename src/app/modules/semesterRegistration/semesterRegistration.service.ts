import QueryBuilder from '../../builder/QueryBuilder';
import { AcademicSemester } from '../academicSemister/academicSemester.model';
import { RegistrationStatus } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

//create semester registration
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  console.log(payload);
  //check if the semester is exists
  const academicSemester = payload?.academicSemester;
  // check if there any registered semester that is already 'UPCOMING'| 'ONGOING
  const isThereAnyUpcomingOnGoingSemester = await SemesterRegistration.findOne({
    $or: [
      { status: RegistrationStatus.UPCOMING },
      { status: RegistrationStatus.ONGOING },
    ],
  });

  if (isThereAnyUpcomingOnGoingSemester) {
    throw new Error(
      `There is already an ${isThereAnyUpcomingOnGoingSemester.status} registered semester !`,
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

// -------------------------------------

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
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //check if semester is exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new Error('This Semester is not found!');
  }
  //IF ANY STATUS THERE IS NO ALLOW THIS

  //if there registered semester registration is ended, we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists.status;
  const requestSemesterStatus = payload?.status;
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new Error(`This Semester is already ${currentSemesterStatus}`);
  }

  //UPCOMING -> ONGOING -> ENDED
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestSemesterStatus === RegistrationStatus.ENDED
  ) {
    throw new Error(
      `you can not directly change status ${currentSemesterStatus} to ${requestSemesterStatus}`,
    );
  }
  // THERE IS NO GOING -> ONGOING TO UPCOMING
  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestSemesterStatus === RegistrationStatus.UPCOMING
  ) {
    throw new Error(
      `There is not directly change status ${currentSemesterStatus} to ${requestSemesterStatus}`,
    );
  }

  //FINALLY UPDATED DATA
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
