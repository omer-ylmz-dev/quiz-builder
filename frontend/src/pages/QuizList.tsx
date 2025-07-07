import React from 'react';
import { Link } from 'react-router-dom';
import { useGetQuizzesQuery, useDeleteQuizMutation } from '../services/api';
import type { QuizSummary } from '../types';

const QuizList: React.FC = () => {
  const { data: quizzes, error, isLoading, refetch } = useGetQuizzesQuery();
  const [deleteQuiz] = useDeleteQuizMutation();

  
  const handleDelete = async (id: number) => {
    try {
      await deleteQuiz(id).unwrap();
      refetch(); 
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading quizzes</div>;

  return (
    <div className='min-h-screen w-full flex flex-col justify-around items-center'>
      <h1 className='font-bold text-black text-6xl'>All Quizzes</h1>

      {quizzes && quizzes.length > 0 ? (
        <ul className='flex flex-col gap-y-3'>
          {quizzes.map((quiz: QuizSummary) => (
            <li key={quiz.id} className='flex gap-x-10 items-center text-xl'>
              <Link to={`/quizzes/${quiz.id}`}>{quiz.title}</Link> ({quiz.questionCount} questions)
              <button 
                className='bg-black w-max h-7 px-5 flex justify-center items-center text-white rounded-md cursor-pointer' 
                onClick={() => handleDelete(quiz.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No quizzes available</div>
      )}

      <Link to="/create" className='bg-black w-max h-10 px-5 flex justify-center items-center text-white rounded-md'>
        Create New Quiz
      </Link>
    </div>
  );
};

export default QuizList;
