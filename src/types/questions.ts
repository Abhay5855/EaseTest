export interface Question {
  id: string;
  type: 'text' | 'mcq' | 'single' | 'multi' | 'code';
  text: string;
  options?: string[];
  correctAnswers?: string[];
  language?: string;
}