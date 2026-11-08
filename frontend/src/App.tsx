import React from 'react';
import QuestionForm from './components/QuestionForm';
import './App.css';

function App() {
  return (
    <div className="App min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800">
            Human Connection Business Generator
          </h1>
          <p className="text-center text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base px-2">
            Answer 30 questions to discover your perfect business idea
          </p>
        </div>
      </header>
      
      <main className="py-4 sm:py-6 md:py-8">
        <QuestionForm />
      </main>
    </div>
  );
}

export default App;
