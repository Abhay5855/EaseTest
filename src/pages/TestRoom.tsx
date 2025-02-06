import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Users, Code, Maximize2, Minimize2, Clock } from 'lucide-react';
import ScreenShare from '../components/ScreenShare';
import Timer from '../components/Timer';
import ParticipantQuestionView from '../components/questions/ParticipantQuestionView';
import { Question } from '../types/questions';
import toast from 'react-hot-toast';

interface Answer {
  questionId: string;
  answer: string[];
}

export default function TestRoom() {
  const { roomId } = useParams();
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [isEditorFullscreen, setIsEditorFullscreen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Load questions from localStorage (demo purposes)
    const rooms = JSON.parse(localStorage.getItem('testRooms') || '[]');
    const room = rooms.find((r: any) => r.id === roomId);
    if (room) {
      setQuestions(room.questions);
    }
  }, [roomId]);

  const handleTimeUp = () => {
    setIsTimeUp(true);
    handleSubmit();
  };

  const handleAnswer = (answer: string | string[]) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(prev => {
      const answerArray = Array.isArray(answer) ? answer : [answer];
      const existingAnswerIndex = prev.findIndex(a => a.questionId === currentQuestion.id);
      
      if (existingAnswerIndex >= 0) {
        const newAnswers = [...prev];
        newAnswers[existingAnswerIndex] = {
          questionId: currentQuestion.id,
          answer: answerArray,
        };
        return newAnswers;
      }

      return [...prev, {
        questionId: currentQuestion.id,
        answer: answerArray,
      }];
    });
  };

  const handleSubmit = () => {
    if (answers.length < questions.length) {
      toast.error('Please answer all questions before submitting');
      return;
    }

    setIsSubmitted(true);
    // Store answers in localStorage (demo purposes)
    localStorage.setItem(`answers_${roomId}`, JSON.stringify(answers));
    toast.success('Assessment submitted successfully!');
  };

  const navigateQuestion = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (direction === 'next' && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <p className="text-gray-600">Loading assessment questions...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assessment Room</h1>
          <p className="text-gray-600">Room ID: {roomId}</p>
        </div>
        <div className="flex items-center gap-6">
          <Timer duration={60} onTimeUp={handleTimeUp} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ParticipantQuestionView
            question={questions[currentQuestionIndex]}
            index={currentQuestionIndex}
            onAnswer={handleAnswer}
            isSubmitted={isSubmitted}
          />
          
          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigateQuestion('prev')}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              Previous
            </button>
            <div className="text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <button
              onClick={() => navigateQuestion('next')}
              disabled={currentQuestionIndex === questions.length - 1}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <ScreenShare />
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Navigator</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`p-2 rounded-lg text-center ${
                    currentQuestionIndex === index
                      ? 'bg-indigo-600 text-white'
                      : answers.some(a => a.questionId === questions[index].id)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {!isSubmitted && (
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Submit Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}