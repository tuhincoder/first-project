import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'student is create successfully',
      data: result,
    });
    // res.status(200).json({
    //   success: true,
    //   message: 'student is create successfully',
    //   data: result,
    // });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createStudent,
};