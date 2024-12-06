import { NextFunction, Request, RequestHandler, Response } from 'express';

// const createStudent: RequestHandler = async (req, res, next) => {
//   try {
//     const { password, student: studentData } = req.body;

//     const result = await UserServices.createStudentIntoDB(
//       password,
//       studentData,
//     );

//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: 'student is create successfully',
//       data: result,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
