import React from 'react';
import { Question } from '../../types/questions';
import CodeEditor from '../CodeEditor';
import { Code } from 'lucide-react';

interface QuestionPreviewProps {
  question: Question;
  index: number;
}

export default function QuestionPreview({ question, index }: QuestionPreviewProps) {
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
              defaultValue="// Your solution here"
              theme="vs-dark"
              onRun={() => {}}
            />
          </div>
        ) : question.options ? (
          <div className="space-y-3 ml-4">
            {question.options.map((option, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type={question.type === 'multi' ? 'checkbox' : 'radio'}
                  checked={question.correctAnswers?.includes(option)}
                  readOnly
                  className="h-4 w-4 text-indigo-600"
                />
                <span className="text-gray-700">{option}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-2 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm">Text answer field will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}