import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import type { QuestionFormType } from '../types';



const QuestionForm: React.FC<QuestionFormType> = ({ index, remove }) => {
  const { register, watch, control } = useFormContext();
  const type = watch(`questions.${index}.type`);

  const { fields, append, remove: removeOption } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  return (
    <div className="border-2 border-[#ccc] p-3 m-4 flex flex-col justify-between items-center">
      <label>
        Type:
        <select {...register(`questions.${index}.type` as const)}>
          <option value="boolean">Boolean</option>
          <option value="input">Input</option>
          <option value="checkbox">Checkbox</option>
        </select>
      </label>

      <br />
      <label className='text-md text-black flex items-center gap-x-3'>
        Text:
        <input className='border-b-2 outline-none' {...register(`questions.${index}.text` as const)} required />
      </label>

      {type === 'checkbox' && (
        <div className="border-2 border-[#ccc] p-3 m-4 flex flex-col justify-between items-center">
          <strong>Options:</strong>
          {fields.map((field, optIndex) => (
            <div key={field.id} className='flex flex-col items-center'>
              <input
                className='border-b-2 outline-none'
                {...register(`questions.${index}.options.${optIndex}` as const)}
                required
              />
              <button type="button" className='bg-black w-max h-7 px-5 flex justify-center items-center text-white rounded-md my-3 cursor-pointer' onClick={() => removeOption(optIndex)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" className='bg-black w-max h-7 px-5 flex justify-center items-center text-white rounded-md cursor-pointer' onClick={() => append('')}>
            Add Option
          </button>
        </div>
      )}

      <br />
      <button type="button" className='bg-black w-max h-7 px-5 flex justify-center items-center text-white rounded-md cursor-pointer' onClick={() => remove(index)}>
        Remove Question
      </button>
    </div>
  );
};

export default QuestionForm;
