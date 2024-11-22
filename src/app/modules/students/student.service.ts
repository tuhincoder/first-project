import { StudentMOdel } from "../student.model";
import { Student } from "./student.iterface";

const createStudentIntoDB = async(student: Student) =>{

    await StudentMOdel.create(student)
}

export const  studentService = {
    createStudentIntoDB
}