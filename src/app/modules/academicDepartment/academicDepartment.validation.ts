import { z } from 'zod';

//create academic department validation schema
const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'academic Department must be string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty is must be string',
      required_error: 'Academic faculty is required',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'academic department name is must be required',
        required_error: 'Name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Faculty must be string',
        required_error: 'Name is required',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidationSchema = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
