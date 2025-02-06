import React, { useState } from 'react';
import { Question } from '../../types/questions';
import CodeEditor from '../CodeEditor';
import { Code, Send } from 'lucide-react';

interface ParticipantQuestionViewProps {
  question: Question;
  index: number;
  onAnswer: (answer: string | string[]) => void;
  isSubmitted?: boolean;
}

export default function ParticipantQuestionView({ 
  question, 
  index, 
  onAnswer,
  isSubmitted 
}: ParticipantQuestionViewProps) {
  const [textAnswer, setTextAnswer] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [code, setCode] = useState('// Your solution here');

  const handleOptionChange = (option: string) => {
    if (question.type === 'multi') {
      const newSelection = selectedOptions.includes(option)
        ? selectedOptions.filter(item => item !== option)
        : [...selectedOptions, option];
      setSelectedOptions(newSelection);
      onAnswer(newSelection);
    } else {
      setSelectedOptions([option]);
      onAnswer([option]);
    }
  };

  const handleCodeRun = (code: string) => {
    setCode(code);
    onAnswer([code]);
  };

  const handleTextSubmit = () => {
    onAnswer([textAnswer]);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900">Question {index + 1}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          question.type === 'code' ? 'bg-blue-100 text-blue-800' :
          question.type === 'text' ? 'bg-green-100 text-green-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {question.type === 'text' ? 'Text Answer' :
           question.type === 'mcq' ? 'Multiple Choice' :
           question.type === 'single' ? 'Single Select' :
           question.type === 'code' ? 'Code Editor' : 'Multi Select'}
        </span>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-800 font-medium">{question.text}</p>
        
        {question.type === 'code' ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Code className="h-4 w-4" />
              <span>Language: {question.language}</span>
            </div>
            <CodeEditor
              language={question.language}
              defaultValue={code}
              theme="vs-dark"
              onRun={handleCodeRun}
            />
          </div>
        ) : question.options ? (
          <div className="space-y-3 ml-4">
            {question.options.map((option, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type={question.type === 'multi' ? 'checkbox' : 'radio'}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                  disabled={isSubmitted}
                  className="h-4 w-4 text-indigo-600"
                />
                <span className="text-gray-700">{option}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              disabled={isSubmitted}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              rows={4}
              placeholder="Type your answer here..."
            />
            <button
              onClick={handleTextSubmit}
              disabled={isSubmitted || !textAnswer.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              Submit Answer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}