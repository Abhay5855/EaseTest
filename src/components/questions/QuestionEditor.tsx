import React from 'react';
import { Plus, Trash2, Code } from 'lucide-react';
import { Question } from '../../types/questions';

interface QuestionEditorProps {
  question: Question;
  onChange: (question: Question) => void;
  onDelete?: () => void;
}

export default function QuestionEditor({ question, onChange, onDelete }: QuestionEditorProps) {
  const addOption = () => {
    if (question.options) {
      onChange({
        ...question,
        options: [...question.options, ''],
      });
    }
  };

  const updateOption = (index: number, value: string) => {
    if (question.options) {
      const newOptions = [...question.options];
      newOptions[index] = value;
      onChange({
        ...question,
        options: newOptions,
      });
    }
  };

  const removeOption = (index: number) => {
    if (question.options && question.options.length > 1) {
      const newOptions = question.options.filter((_, i) => i !== index);
      onChange({
        ...question,
        options: newOptions,
        correctAnswers: question.correctAnswers?.filter(answer => 
          newOptions.includes(answer)
        ),
      });
    }
  };

  const toggleCorrectAnswer = (option: string) => {
    if (question.type === 'multi') {
      const newCorrectAnswers = question.correctAnswers?.includes(option)
        ? question.correctAnswers.filter(a => a !== option)
        : [...(question.correctAnswers || []), option];
      onChange({
        ...question,
        correctAnswers: newCorrectAnswers,
      });
    } else {
      onChange({
        ...question,
        correctAnswers: [option],
      });
    }
  };

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <select
          value={question.type}
          onChange={(e) => onChange({
            ...question,
            type: e.target.value as Question['type'],
            options: e.target.value === 'text' || e.target.value === 'code' ? undefined : [''],
            correctAnswers: [],
            language: e.target.value === 'code' ? 'javascript' : undefined,
          })}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        >
          <option value="text">Text Answer</option>
          <option value="mcq">Multiple Choice</option>
          <option value="single">Single Select</option>
          <option value="multi">Multi Select</option>
          <option value="code">Code Editor</option>
        </select>
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </div>

      <textarea
        value={question.text}
        onChange={(e) => onChange({ ...question, text: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        placeholder="Enter your question"
        rows={3}
      />

      {question.type === 'code' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Programming Language
          </label>
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-gray-400" />
            <select
              value={question.language}
              onChange={(e) => onChange({
                ...question,
                language: e.target.value,
              })}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>
        </div>
      )}

      {question.type !== 'text' && question.type !== 'code' && (
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <div key={index} className="flex gap-2">
              <input
                type={question.type === 'multi' ? 'checkbox' : 'radio'}
                checked={question.correctAnswers?.includes(option)}
                onChange={() => toggleCorrectAnswer(option)}
                className="mt-3"
              />
              <input
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder={`Option ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Add Option
          </button>
        </div>
      )}
    </div>
  );
}