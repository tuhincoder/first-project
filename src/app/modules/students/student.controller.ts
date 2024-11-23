// import { Request, Response } from "express";
// import { studentService } from "./student.service";

import { Request, Response } from "express";
import { studentService } from "./student.service";

const createStudent = async(req: Request, res: Response) =>{
   try{
    const student = req.body;
    const result = await studentService.createStudentIntoDB(student)

    res.status(200).json({
        success: true,
        message: 'student is create successfully',
        data: result
    })
   }catch(err){
    console.log(err);
   }

}

export const  studentController = {
    createStudent
}

