import express, { Application } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/students/student.route';
import { userRoutes } from './app/modules/user/user.route';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/users', userRoutes);

// const getAController = (req: Request, res: Response) => {
//     const a = 10;
//     res.send(a)
// }

// app.get('/api/v1/students', getAController)

export default app;
