import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const createOfferedCourseValidation = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicSemester: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.enum([...Days] as [string, ...string[]]),
    startTime: z.string(),
    endTime: z.string(),
  }),
});
//update  offered course
const updateOfferedCourseValidation = z.object({
  body: z.object({
    // semesterRegistration: z.string().optional(),
    // academicSemester: z.string().optional(),
    // academicFaculty: z.string().optional(),
    // academicDepartment: z.string().optional(),
    // course: z.string().optional(),
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    section: z.number().optional(),
    days: z.enum([...Days] as [string, ...string[]]).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidation,
  updateOfferedCourseValidation,
};
