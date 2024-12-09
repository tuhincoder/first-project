import { Types } from 'mongoose';

export type TAcademicDepartment = {
  name: string;
  academicFaculties: Types.ObjectId;
};
