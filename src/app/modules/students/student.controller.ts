// import { Request, Response } from "express";
// import { studentService } from "./student.service";

import { Request, Response } from 'express';
import { studentService } from './student.service';
// import { error } from "console";
// import Joi from "joi";
import studentValidationSchema from './student.zod.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //data validation using joi
    // const {error, value} = studentValidationSchema.validate(studentData)
    //data validation using zod
    const zodParseData = studentValidationSchema.parse(studentData);
    const result = await studentService.createStudentIntoDB(zodParseData);

    // if(error){
    //     res.status(500).json({
    //         success: false,
    //         message: 'something went wrong',
    //         error: error.details
    //     })
    // }
    res.status(200).json({
      success: true,
      message: 'student is create successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getStudentIntoDB();
    res.status(200).json({
      success: true,
      message: 'get Student data successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// single data

const getStudentSingleData = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.getSingleStudentIntoDB(studentId);
    res.status(200).json({
      success: true,
      message: 'get single data successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studentController = {
  createStudent,
  getStudent,
  getStudentSingleData,
};
