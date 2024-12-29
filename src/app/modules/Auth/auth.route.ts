import express from 'express';
import { AuthValidation } from './auth.validation';
import validationRequest from '../../middlewares/validationRequest';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validationRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

export const AuthRouter = router;
