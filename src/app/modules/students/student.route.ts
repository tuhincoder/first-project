import  express  from "express";
import { studentController } from "./student.controller";

// const router = express.Router();
// router.post('/create-student', studentController.createStudent)

const router = express.Router();
router.post('/create-student',studentController.createStudent)

router.get('/', studentController.getStudent)


export const studentRoutes = router;

