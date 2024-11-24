// import { Request, Response } from "express";
// import { studentService } from "./student.service";

import { Request, Response } from "express";
import { studentService } from "./student.service";

const createStudent = async(req: Request, res: Response) =>{
   try{
    const {student: studentData }= req.body;
    const result = await studentService.createStudentIntoDB(studentData)

    res.status(200).json({
        success: true,
        message: 'student is create successfully',
        data: result
    })
   }catch(err){
    console.log(err);
   }

}

const getStudent = async(req: Request, res: Response) =>{
    try{
        const result = await studentService.getStudentIntoDB()
        res.status(200).json({
            success: true,
            message: 'get Student data successfully',
            data: result
        })
    }catch(error){
        console.log(error);
    }
}

export const  studentController = {
    createStudent,
    getStudent
}

