import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);

const createOfferedCourseValidation = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      // academicSemester: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      // faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
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
  body: z
    .object({
      // semesterRegistration: z.string(),
      // academicSemester: z.string(),
      // academicFaculty: z.string(),
      // academicDepartment: z.string(),
      // course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      // z.array(z.enum([...Days] as [string, ...string[]])),
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

export const OfferedCourseValidations = {
  createOfferedCourseValidation,
  updateOfferedCourseValidation,
};
