import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetQuizQuery } from '../services/api';
import type { Question } from '../types';

const QuizDetail: React.FC = () => {
  const { id } = useParams();
  
  
  const { data: quiz, error, isLoading } = useGetQuizQuery(id!);
  
  if (isLoading) return <div>Loading...</div>; 
  if (error) return <div>Error: {error as any}</div>;

  return (
    <div className='flex flex-col items-center py-5'>
      <h2 className='text-3xl text-black'>{quiz?.title}</h2>
      <h4 className='mt-6'>Questions</h4>
      <ul className='mt-5'>
        {quiz?.questions.map((q:Question, index:number) => (
          <li key={index} className='w-2xl border-2 border-black mb-2 p-5'>
            <strong>Question:</strong> {q.text} <br />
            {(q.type === 'boolean') ? (
              <>
                <strong>Options:</strong>
                <ul>
                  <li>true</li>
                  <li>false</li>
                </ul>
              </>
            ) : (q.type !== 'input' && q.options) ? (
              <>
                <strong>Options:</strong>
                <ul>
                  {q.options.map((opt: string, i:number) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizDetail;
