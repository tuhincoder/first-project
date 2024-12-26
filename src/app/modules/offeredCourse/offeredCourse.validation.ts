import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const createOfferedCourseValidation = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      // academicSemester: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      // faculty: z.string().optional(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: z.string(),
      endTime: z.string(),
    })
    .refine(
      (body) => {
        // startTime : 10:30  => 1970-01-01T10:30
        //endTime : 12:30  =>  1970-01-01T12:30

        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'Start time should be before End time !  ',
      },
    ),
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
