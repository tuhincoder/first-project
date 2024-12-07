import { z } from 'zod';

// Zod schema for Name
const nameSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name cannot exceed 20 characters')
    .min(1, 'First name is required')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: 'First name must be in capitalized format' },
    ),
  middleName: z
    .string()
    .min(5, 'Middle name must be at least 5 characters long')
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Middle name must only contain alphabetic characters',
    }),
  lastName: z.string().min(1, 'Last name is required'),
});

// Zod schema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  fatherContact: z.string().min(1, "Father's contact is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  motherContact: z.string().min(1, "Mother's contact is required"),
});

// Zod schema for Local Guardian
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required"),
  occupation: z.string().min(1, "Local guardian's occupation is required"),
  contactNo: z.string().min(1, "Local guardian's contact number is required"),
  address: z.string().min(1, "Local guardian's address is required"),
});

// Zod schema for Student
const studentValidationSchema = z.object({
  body: z.object({
    // id: z.string().min(1, 'Student ID is required'),
    password: z.string().max(20),
    student: z.object({
      name: nameSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Invalid email format'),
      contactNo: z.string().min(1, 'Contact number is required'),
      emergencyContactNO: z
        .string()
        .min(1, 'Emergency contact number is required'),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  studentValidationSchema,
};
