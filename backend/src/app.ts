import express from 'express';
import cors from 'cors';
import { sequelize } from './config/database';
import quizRoutes from './controllers/quiz.routes';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/quizzes', quizRoutes);

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
});

export default app;
