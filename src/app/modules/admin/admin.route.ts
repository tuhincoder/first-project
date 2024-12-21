import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';
import validationRequest from '../../middlewares/validationRequest';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validationRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
