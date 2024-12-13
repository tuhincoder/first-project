// import { z } from 'zod';

// // Zod schema for Name
// const createUserNameValidationSchema = z.object({
//   firstName: z.string().max(20, 'First name cannot exceed 20 characters'),

//   // .refine(
//   //   (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
//   //   { message: 'First name must be in capitalized format' },
//   // ),
//   middleName: z.string(),
//   lastName: z.string(),
// });

// // Zod schema for Guardian
// const createGuardianValidationSchema = z.object({
//   fatherName: z.string(),
//   fatherOccupation: z.string(),
//   fatherContact: z.string(),
//   motherName: z.string(),
//   motherOccupation: z.string(),
//   motherContact: z.string(),
// });

// // Zod schema for Local Guardian
// const createLocalGuardianValidationSchema = z.object({
//   name: z.string(),
//   occupation: z.string(),
//   contactNo: z.string(),
//   address: z.string(),
// });

// // Zod schema for Student
// const createStudentValidationSchema = z.object({
//   body: z.object({
//     // id: z.string().min(1, 'Student ID is required'),
//     password: z.string().max(20),
//     student: z.object({
//       name: createUserNameValidationSchema,
//       gender: z.enum(['male', 'female', 'other']),
//       dateOfBirth: z.string().optional(),
//       email: z.string().email('Invalid email format'),
//       contactNo: z.string().min(1, 'Contact number is required'),
//       emergencyContactNO: z.string(),
//       bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
//       presentAddress: z.string(),
//       permanentAddress: z.string(),
//       guardian: createGuardianValidationSchema,
//       localGuardian: createLocalGuardianValidationSchema,
//       admissionSemester: z.string(),
//       profileImg: z.string().optional(),
//     }),
//   }),
// });

// //update for validation
// const updateUserNameValidationSchema = z.object({
//   firstName: z
//     .string()
//     .max(20, 'First name cannot exceed 20 characters')
//     .min(1, 'First name is required')
//     .refine(
//       (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
//       { message: 'First name must be in capitalized format' },
//     )
//     .optional(), // Optional
//   middleName: z.string().optional(), // Optional
//   lastName: z.string().optional(), // Optional
// });

// const updateGuardianValidationSchema = z.object({
//   fatherName: z.string().optional(),
//   fatherOccupation: z.string().optional(),
//   fatherContact: z.string().optional(),
//   motherName: z.string().optional(),
//   motherOccupation: z.string().optional(),
//   motherContact: z.string().optional(),
// });

// const updateLocalGuardianValidationSchema = z.object({
//   name: z.string().optional(),
//   occupation: z.string().optional(),
//   contactNo: z.string().optional(),
//   address: z.string().optional(),
// });

// const updateStudentValidationSchema = z.object({
//   body: z.object({
//     // id: z.string().min(1, 'Student ID is required').optional(),
//     // password: z.string().max(20).optional(),
//     student: z.object({
//       name: updateUserNameValidationSchema,
//       gender: z.enum(['male', 'female', 'other']).optional(),
//       dateOfBirth: z.string().optional(),
//       email: z.string().email('Invalid email format').optional(),
//       contactNo: z.string().min(1, 'Contact number is required').optional(),
//       emergencyContactNO: z.string().optional(),
//       bloodGroup: z
//         .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
//         .optional(),
//       presentAddress: z.string().optional(),
//       permanentAddress: z.string().optional(),
//       guardian: updateGuardianValidationSchema.optional(),
//       localGuardian: updateLocalGuardianValidationSchema.optional(),
//       admissionSemester: z.string().optional(),
//       profileImg: z.string().optional(),
//       academicDepartment: z.string().optional(),
//     }),
//   }),
// });

// export const studentValidations = {
//   createStudentValidationSchema,
//   updateStudentValidationSchema,
// };

import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
});

const createGuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
