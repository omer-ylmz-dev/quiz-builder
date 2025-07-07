export type QuestionType = 'boolean' | 'input' | 'checkbox';

export interface Question {
  id?: number;
  type: QuestionType;
  text: string;
  options?: string[];
}

export interface Quiz {
  id?: number;
  title: string;
  questions: Question[];
}

export interface QuestionFormType {
  index: number;
  remove: (index: number) => void;
  question?: QuestionType;
}

export interface QuizSummary {
  id: number;
  title: string;
  questionCount: number;
}

export type QuizForm = {
  title: string;
  questions: {
    type: 'boolean' | 'input' | 'checkbox';
    text: string;
    options?: string[];
  }[];
};