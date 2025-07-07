import { Quiz, Question } from './models';
import { sequelize } from './config/database';

const seedDatabase = async () => {
  try {
    // Veritabanını senkronize et
    await sequelize.sync({ force: true }); // force: true eski verileri siler ve yeni yapıyı oluşturur

    console.log('Database synced');

    // Quiz ve Question örnek verisi
    const quiz = await Quiz.create({
      title: 'Sample Quiz',
    });

    // Sample questions
    const questions = [
      {
        type: 'boolean',
        text: 'Is the earth round?',
      },
      {
        type: 'input',
        text: 'What is the capital of France?',
      },
      {
        type: 'checkbox',
        text: 'Which of the following are programming languages?',
        options: ['JavaScript', 'Python', 'HTML', 'CSS'],
      },
    ];

    // Soruları ekle
    for (let question of questions) {
      await Question.create({
        quizId: quiz.id,
        //@ts-ignore
        type: question.type,
        text: question.text,
        options: question.options || [],
      });
    }

    console.log('Sample quiz and questions added');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Seed işlemini başlat
seedDatabase();
