import { StudentModel } from "../student.model";
import { Student } from "./student.iterface";

const createStudentIntoDB = async(student: Student) =>{

   const result = await StudentModel.create(student);
    return result;
}

const getStudentIntoDB = async() =>{
    const result = await StudentModel.find();
    return result;
}

//get single data
const getSingleStudentIntoDB =async (id: string) =>{
    const result = await StudentModel.findOne({id})
    return result;
}

export const  studentService = {
    createStudentIntoDB,
    getStudentIntoDB, 
    getSingleStudentIntoDB
}


