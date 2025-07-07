import { Quiz } from './Quiz';
import { Question } from './Question';

Quiz.hasMany(Question, {
  foreignKey: 'quizId',
  as: 'questions',
  onDelete: 'CASCADE',
});
Question.belongsTo(Quiz, {
  foreignKey: 'quizId',
  as: 'quiz',
});

export { Quiz, Question };
