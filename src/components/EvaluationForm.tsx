import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';

interface Criterion {
  id: string;
  name: string;
  description: string;
  maxScore: number;
}

const evaluationCriteria: Criterion[] = [
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    description: 'Ability to analyze and solve problems effectively',
    maxScore: 5,
  },
  {
    id: 'code-quality',
    name: 'Code Quality',
    description: 'Cleanliness, organization, and maintainability of code',
    maxScore: 5,
  },
  {
    id: 'technical-skills',
    name: 'Technical Skills',
    description: 'Knowledge and application of technical concepts',
    maxScore: 5,
  },
];

export default function EvaluationForm() {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState('');

  const handleScoreChange = (criterionId: string, score: number) => {
    setScores((prev) => ({ ...prev, [criterionId]: score }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement submission logic
    console.log({ scores, feedback });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Evaluation</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {evaluationCriteria.map((criterion) => (
          <div key={criterion.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">
                {criterion.name}
              </label>
              <span className="text-sm text-gray-500">
                Score: {scores[criterion.id] || 0}/{criterion.maxScore}
              </span>
            </div>
            <p className="text-sm text-gray-500">{criterion.description}</p>
            <div className="flex gap-2">
              {[...Array(criterion.maxScore)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleScoreChange(criterion.id, index + 1)}
                  className={`p-1 rounded-full transition-colors ${
                    (scores[criterion.id] || 0) > index
                      ? 'text-yellow-400 hover:text-yellow-500'
                      : 'text-gray-300 hover:text-gray-400'
                  }`}
                >
                  <Star className="h-6 w-6 fill-current" />
                </button>
              ))}
            </div>
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Feedback
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            rows={4}
            placeholder="Provide detailed feedback..."
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Send className="h-5 w-5" />
          Submit Evaluation
        </button>
      </form>
    </div>
  );
}