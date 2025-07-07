import { Router } from 'express';
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  deleteQuiz,
} from '../controllers/quiz.controller';

const router = Router();

//@ts-ignore
router.post('/', createQuiz);
//@ts-ignore
router.get('/', getAllQuizzes);
//@ts-ignore
router.get('/:id', getQuizById);
//@ts-ignore
router.delete('/:id', deleteQuiz);

export default router;
