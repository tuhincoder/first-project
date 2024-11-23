import { StudentModel } from "../student.model";
import { Student } from "./student.iterface";

// const createStudentIntoDB = async(student: Student) =>{

//    const result = await StudentModel.create(student);
//     return result;
// }


// export const  studentService = {
//     createStudentIntoDB
// }

const createStudentIntoDB = async(student: Student)=>{
    const result  = await StudentModel.create(student);
    return result;
}
export const studentService = {
    createStudentIntoDB: createStudentIntoDB
}
