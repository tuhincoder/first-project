// import { TAcademicSemester } from '../academicSemister/academicSemister.iterface';

// //year semester 4 digit number
// export const generateStudentId = (payload: TAcademicSemester) => {
//   const currentId = (0).toString();
//   let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
//   incrementId = `${payload.year} ${payload.code}${incrementId}`;

//   return incrementId;
// };

// year semesterCode 4digit number

import { TAcademicSemester } from '../academicSemister/academicSemister.iterface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  //203001   0001
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  //0001  => 1
  let currentId = (0).toString(); //0000 by default
  const lastStudentId = await findLastStudentId();
  const lasStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lasStudentYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;
  if (
    lastStudentId &&
    lasStudentSemesterCode === currentSemesterCode &&
    lasStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
