import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Clock, FileText, Plus, Eye, Save, ArrowLeft, ArrowRight, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import QuestionEditor from '../components/questions/QuestionEditor';
import QuestionPreview from '../components/questions/QuestionPreview';
import { Question } from '../types/questions';

export default function CreateRoom() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [roomId, setRoomId] = useState('');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 60,
    startTime: '',
    date: '',
    maxParticipants: 10,
    isLive: true,
    allowGuests: false,
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: '1',
    type: 'mcq',
    text: '',
    options: [''],
    correctAnswers: [],
  });
  const [previewMode, setPreviewMode] = useState(false);

  const generateRoomId = () => {
    const id = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomId(id);
    return id;
  };

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateRoomId();
    setStep(2);
  };

  const copyRoomId = async () => {
    await navigator.clipboard.writeText(roomId);
    setCopied(true);
    toast.success('Room ID copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const addQuestion = () => {
    if (currentQuestion.text.trim()) {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion({
        id: (questions.length + 2).toString(),
        type: 'mcq',
        text: '',
        options: [''],
        correctAnswers: [],
      });
    }
  };

  const updateQuestion = (index: number, updatedQuestion: Question) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (currentQuestion.text.trim()) {
      setQuestions([...questions, currentQuestion]);
    }
    
    if (questions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }

    // Store room data in localStorage for demo purposes
    const roomData = {
      id: roomId,
      ...formData,
      questions,
      createdAt: new Date().toISOString(),
    };
    const existingRooms = JSON.parse(localStorage.getItem('testRooms') || '[]');
    localStorage.setItem('testRooms', JSON.stringify([...existingRooms, roomData]));
    
    toast.success('Assessment room created successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex justify-between px-8 py-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-indigo-100' : 'bg-gray-100'
              }`}>1</div>
              <span className="font-medium">Basic Info</span>
            </div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-indigo-100' : 'bg-gray-100'
              }`}>2</div>
              <span className="font-medium">Questions</span>
            </div>
          </div>
        </div>

        <div className="p-8">
          {roomId && (
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-900">Room ID</h3>
                  <p className="text-indigo-700 text-2xl font-mono mt-1">{roomId}</p>
                </div>
                <button
                  onClick={copyRoomId}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy ID'}
                </button>
              </div>
              <p className="text-sm text-indigo-600 mt-2">
                Share this ID with participants to let them join the assessment
              </p>
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleBasicInfoSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Assessment Title
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    placeholder="e.g., Frontend Developer Assessment"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  placeholder="Describe the purpose and scope of this assessment..."
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    min="15"
                    max="180"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Participants
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    id="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Live Assessment</label>
                    <p className="text-sm text-gray-500">Enable real-time monitoring and evaluation</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isLive: !formData.isLive })}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      formData.isLive ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        formData.isLive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Allow Guests</label>
                    <p className="text-sm text-gray-500">Let participants join without registration</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, allowGuests: !formData.allowGuests })}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      formData.allowGuests ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        formData.allowGuests ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {!previewMode && (
                <>
                  <div className="space-y-4">
                    {questions.map((q, index) => (
                      <QuestionEditor
                        key={q.id}
                        question={q}
                        onChange={(updatedQuestion) => updateQuestion(index, updatedQuestion)}
                        onDelete={() => removeQuestion(index)}
                      />
                    ))}
                    <QuestionEditor
                      question={currentQuestion}
                      onChange={setCurrentQuestion}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="flex items-center gap-2 px-6 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Add Question
                  </button>
                </>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-6 py-2 text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPreviewMode(!previewMode)}
                    className="flex items-center gap-2 px-6 py-2 text-indigo-600 hover:text-indigo-700"
                  >
                    <Eye className="h-4 w-4" />
                    {previewMode ? 'Edit Mode' : 'Preview'}
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    Save Assessment
                  </button>
                </div>
              </div>

              {previewMode && (
                <div className="mt-8 space-y-6">
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{formData.title}</h2>
                    <p className="text-gray-600 mb-4">{formData.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {formData.duration} minutes
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Max {formData.maxParticipants} participants
                      </div>
                      {formData.isLive && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          Live Assessment
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[...questions, ...(currentQuestion.text ? [currentQuestion] : [])].map((question, index) => (
                      <QuestionPreview key={question.id} question={question} index={index} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}