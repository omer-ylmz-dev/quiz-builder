import React from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import QuestionForm from '../components/QuestionForm';
import { useNavigate } from 'react-router-dom';
import { useCreateQuizMutation } from '../services/api'; 

const schema = z.object({
  title: z.string().min(1),
  questions: z.array(
    z.object({
      type: z.enum(['boolean', 'input', 'checkbox']),
      text: z.string().min(1),
      options: z.array(z.string()).optional(),
    })
  ),
});

type QuizForm = z.infer<typeof schema>;

const CreateQuiz: React.FC = () => {
  const methods = useForm<QuizForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      questions: [],
    },
  });

  const { control, register, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const navigate = useNavigate();

  
  const [createQuiz, { isLoading, isError }] = useCreateQuizMutation();

  const onSubmit = async (data: QuizForm) => {
    try {
      await createQuiz(data).unwrap();  
      navigate('/'); 
    } catch (err) {
      console.error('Error creating quiz:', err);  
    }
  };

  return (
    <div className='min-h-screen w-full flex flex-col justify-around items-center'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-15 items-center'>
          <h1 className='font-bold text-black text-6xl'>Create Quiz</h1>

          <label className='text-2xl text-black flex items-center gap-x-3'>
            Title:
            <input className='border-b-2 outline-none' {...register('title')} required />
          </label>

          <div>
            <h3 className='text-2xl text-center'>{fields.length > 0 ? 'Questions' : 'There is no question yet'}</h3>
            {fields.length > 0 && (
              <div className='overflow-x-auto h-80 w-96 py-10'>
                {fields.map((field, index) => (
                  <QuestionForm key={field.id} index={index} remove={remove} />
                ))}
              </div>
            )}
          </div>

          <div className='flex gap-x-10'>
            <button
              type='button'
              className='bg-black w-max h-10 px-5 flex justify-center items-center text-white rounded-md cursor-pointer'
              onClick={() => append({ type: 'input', text: '', options: [] })}
            >
              Add Question
            </button>

            <button
              type='submit'
              className='bg-black w-max h-10 px-5 flex justify-center items-center text-white rounded-md cursor-pointer'
              disabled={isLoading} 
            >
              {isLoading ? 'Creating Quiz...' : 'Submit Quiz'}
            </button>
          </div>
          
          {isError && <div className='text-red-500 mt-3'>Error creating quiz. Please try again.</div>} 
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateQuiz;
