import React, { useState, useEffect } from 'react';
import { Answer, BusinessIdea, OpenAIResponse } from '../shared/types';
import { questions, getQuestionsBySection, getSectionTitle } from '../shared/questions';
import axios from 'axios';
import WelcomeScreen from './WelcomeScreen';

// Backend URL. Set REACT_APP_API_URL in frontend/.env to change it.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const QuestionForm: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentSection, setCurrentSection] = useState<'why' | 'how' | 'what'>('why');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ideas, setIdeas] = useState<BusinessIdea[]>([]);
  const [summary, setSummary] = useState('');
  const [showResults, setShowResults] = useState(false);

  const sections: ('why' | 'how' | 'what')[] = ['why', 'how', 'what'];
  const currentSectionQuestions = getQuestionsBySection(currentSection);

  useEffect(() => {
    // Initialize answers for all questions
    const initialAnswers = questions.map(q => ({
      questionId: q.id,
      value: ''
    }));
    setAnswers(initialAnswers);
  }, []);

  const handleStart = () => {
    setShowWelcome(false);
  };

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => 
      prev.map(answer => 
        answer.questionId === questionId 
          ? { ...answer, value } 
          : answer
      )
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentSectionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (sections.indexOf(currentSection) < sections.length - 1) {
      const nextSectionIndex = sections.indexOf(currentSection) + 1;
      setCurrentSection(sections[nextSectionIndex]);
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (sections.indexOf(currentSection) > 0) {
      const prevSectionIndex = sections.indexOf(currentSection) - 1;
      setCurrentSection(sections[prevSectionIndex]);
      setCurrentQuestionIndex(getQuestionsBySection(sections[prevSectionIndex]).length - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/generate-ideas`, {
        answers: answers.filter(a => a.value.trim() !== '')
      });
      
      const data: OpenAIResponse = response.data;
      setIdeas(data.ideas);
      setSummary(data.summary);
      setShowResults(true);
    } catch (error) {
      console.error('Error generating ideas:', error);
      alert('Error generating ideas. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getProgress = () => {
    const totalQuestions = questions.length;
    const answeredQuestions = answers.filter(a => a.value.trim() !== '').length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const canProceed = () => {
    const currentQuestion = currentSectionQuestions[currentQuestionIndex];
    const answer = answers.find(a => a.questionId === currentQuestion.id);
    return answer && answer.value.trim() !== '';
  };

  const canSubmit = () => {
    return answers.every(a => a.value.trim() !== '');
  };

  if (showWelcome) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (showResults) {
    return (
      <div className="min-h-screen p-4 sm:p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">
            🎯 Your Personalized Business Ideas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Based on your answers, here are 3 business concepts designed specifically for you
          </p>
        </div>

        {/* Summary Section */}
        {summary && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-3 text-center">
              💡 AI Analysis Summary
            </h2>
            <p className="text-gray-700 text-center text-lg leading-relaxed">
              {summary}
            </p>
          </div>
        )}

        {/* Business Ideas */}
        <div className="space-y-8 mb-8">
          {ideas.map((idea, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Idea Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full mr-3">
                      Idea {index + 1}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                      {idea.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {idea.description}
                  </p>
                </div>
              </div>

              {/* Two Column Layout for Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Why This Works */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Why This Works
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {idea.reasoning}
                  </p>
                </div>

                {/* Human Connection */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-800 mb-3 text-lg flex items-center">
                    <span className="text-blue-600 mr-2">🤝</span>
                    Human Connection
                  </h4>
                  <p className="text-blue-700 leading-relaxed">
                    {idea.alignment}
                  </p>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                <h4 className="font-semibold text-purple-800 mb-3 text-lg flex items-center">
                  <span className="text-purple-600 mr-2">🚀</span>
                  Next Steps to Get Started
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {idea.nextSteps.map((step, stepIndex) => (
                    <div key={stepIndex} className="bg-white rounded-lg p-3 border border-purple-200">
                      <div className="flex items-center">
                        <span className="bg-purple-100 text-purple-600 text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center mr-3">
                          {stepIndex + 1}
                        </span>
                        <span className="text-purple-800 text-sm font-medium">
                          {step}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4 pb-8">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                setShowResults(false);
                setShowWelcome(true);
                setCurrentSection('why');
                setCurrentQuestionIndex(0);
              }}
              className="bg-gray-600 text-white px-8 py-3 rounded-xl hover:bg-gray-700 transition-colors text-lg font-semibold"
            >
              Start Over
            </button>
            <button
              onClick={() => window.print()}
              className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-colors text-lg font-semibold"
            >
              📄 Print/Save Ideas
            </button>
          </div>
          <p className="text-gray-500 text-sm">
            Take your time to review these ideas. Each one is tailored to your unique strengths and vision.
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = currentSectionQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 space-y-1 sm:space-y-0">
          <span className="text-xs sm:text-sm text-gray-600">
            Progress: {Math.round(getProgress())}%
          </span>
          <span className="text-xs sm:text-sm text-gray-600">
            {answers.filter(a => a.value.trim() !== '').length} / {questions.length} questions answered
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgress()}%` }}
          ></div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap justify-center mb-6 sm:mb-8 gap-1 sm:gap-2">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => {
              setCurrentSection(section);
              setCurrentQuestionIndex(0);
            }}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
              currentSection === section
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* Section Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
        {getSectionTitle(currentSection)}
      </h2>

      {/* Question */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm mb-8">
        <div className="mb-4 sm:mb-6">
          <span className="text-xs sm:text-sm text-gray-500">
            Question {currentQuestion.id} of {questions.length}
          </span>
        </div>
        
        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800">
          {currentQuestion.text}
        </h3>

        {/* Answer Input */}
        {currentQuestion.type === 'textarea' ? (
          <textarea
            value={answers.find(a => a.questionId === currentQuestion.id)?.value || ''}
            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
            className="w-full h-32 sm:h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
            placeholder="Type your answer here..."
          />
        ) : currentQuestion.type === 'select' && currentQuestion.options ? (
          <select
            value={answers.find(a => a.questionId === currentQuestion.id)?.value || ''}
            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          >
            <option value="">Select an option...</option>
            {currentQuestion.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={answers.find(a => a.questionId === currentQuestion.id)?.value || ''}
            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            placeholder="Type your answer here..."
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 space-y-3 sm:space-y-0">
          <button
            onClick={handlePrevious}
            disabled={currentSection === 'why' && currentQuestionIndex === 0}
            className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
          >
            Previous
          </button>

          {currentSection === 'what' && currentQuestionIndex === currentSectionQuestions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit() || isLoading}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
            >
              {isLoading ? 'Generating Ideas...' : 'Generate Business Ideas'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionForm; 