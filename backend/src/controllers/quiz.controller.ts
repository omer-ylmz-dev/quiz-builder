import { Request, Response } from 'express';
import { Quiz, Question } from '../models';

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, questions } = req.body;

    if (!title || !Array.isArray(questions)) {
      return res.status(400).json({ message: 'Title and questions are required' });
    }

    const quiz = await Quiz.create({ title });
    const questionData = questions.map((q: any) => ({
      quizId: quiz.id,
      type: q.type,
      text: q.text,
      options: q.options || null,
    }));

    await Question.bulkCreate(questionData);
    return res.status(201).json({ message: 'Quiz created', quizId: quiz.id });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const getAllQuizzes = async (_req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.findAll({
      include: [{ model: Question, as: 'questions', attributes: [] }],
      attributes: [
        'id',
        'title',
        [Quiz.sequelize!.fn('COUNT', Quiz.sequelize!.col('questions.id')), 'questionCount'],
      ],
      group: ['Quiz.id'],
    });

    return res.json(quizzes);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id, {
      include: [{ model: Question, as: 'questions' }],
    });

    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    return res.json(quiz);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    await quiz.destroy();
    return res.json({ message: 'Quiz deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
