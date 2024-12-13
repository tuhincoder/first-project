// // import { Schema, model, connect } from 'mongoose';

// import { Model, Types } from 'mongoose';
// export type TUserName = {
//   firstName: string;
//   middleName: string;
//   lastName: string;
// };

// export type TGuardian = {
//   fatherName: string;
//   fatherOccupation: string;
//   fatherContact: string;
//   motherName: string;
//   motherOccupation: string;
//   motherContact: string;
// };

// export type TLocalGuardian = {
//   name: string;
//   occupation: string;
//   contactNo: string;
//   address: string;
// };

// //student interface
// export type TStudent = {
//   id: string;
//   user: Types.ObjectId;
//   password: string;
//   name: TUserName;
//   gender: 'male' | 'female' | 'other';
//   dateOfBirth?: Date;
//   email: string;
//   contactNo: string;
//   emergencyContactNO: string;
//   bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
//   presentAddress: string;
//   permanentAddress: string;
//   guardian: TGuardian;
//   localGuardian: TLocalGuardian;
//   admissionSemester: Types.ObjectId;
//   profileImg?: string;
//   academicDepartment: Types.ObjectId;
//   isDeleted: boolean;
// };
// // for creating an static method

// export interface StudentModel extends Model<TStudent> {
//   isUserExists(id: string): Promise<TStudent | null>;
// }

//for creating an instance method
// export type StudentMethods = {
//   isUserExits(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;

import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
  academicDepartment: Types.ObjectId;
};

//for creating static

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
