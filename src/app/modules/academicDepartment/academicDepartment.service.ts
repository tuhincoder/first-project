import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

//create academic department in to db
const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  // const isDepartmentExists = await AcademicDepartment.findOne({
  //   name: payload.name,
  // });
  // if (isDepartmentExists) {
  //   throw new Error('Academic department is already exists');
  // }
  const result = await AcademicDepartment.create(payload);
  return result;
};

//get All academic department
const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculties');
  return result;
};

//get single academic department from db
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

//update academic department
const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
