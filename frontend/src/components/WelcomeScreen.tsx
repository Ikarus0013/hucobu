import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12 pt-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          Human Connection Business Generator
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          Discover your perfect business idea for the future of human experiences
        </p>
        
        {/* Key Message */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6 max-w-3xl mx-auto shadow-lg">
          <p className="text-lg sm:text-xl font-medium">
            🚀 As AI automates computer work, people will crave authentic human connections more than ever.
          </p>
        </div>
      </div>

      {/* 3-Step Process */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-12">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Answer Questions</h3>
            <p className="text-gray-600 text-sm">
              30 thoughtful questions about your vision for human connection
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Analysis</h3>
            <p className="text-gray-600 text-sm">
              Our AI understands your unique approach to human connection
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Get Ideas</h3>
            <p className="text-gray-600 text-sm">
              3 personalized business concepts ready to explore
            </p>
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 mb-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Why This Matters Now
        </h3>
        <div className="text-center">
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            As AI takes over routine computer tasks, businesses that create genuine human experiences, 
            foster community, and build meaningful relationships will become increasingly valuable. 
            This is your opportunity to design a business around what makes us uniquely human.
          </p>
        </div>
      </div>

      {/* What You'll Get */}
      <div className="bg-blue-50 rounded-2xl p-6 sm:p-8 mb-12">
        <h3 className="text-xl font-semibold text-blue-800 mb-6 text-center">
          What You'll Receive
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-blue-600 mr-3 text-xl">✓</span>
              <span className="text-blue-700">3 focused business ideas</span>
            </div>
            <div className="flex items-center">
              <span className="text-blue-600 mr-3 text-xl">✓</span>
              <span className="text-blue-700">Detailed reasoning & next steps</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-blue-600 mr-3 text-xl">✓</span>
              <span className="text-blue-700">Human connection analysis</span>
            </div>
            <div className="flex items-center">
              <span className="text-blue-600 mr-3 text-xl">✓</span>
              <span className="text-blue-700">Personalized recommendations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center pb-8">
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Start Your Journey
        </button>
        <p className="text-gray-500 text-sm mt-4">
          Takes about 15-20 minutes • No registration required
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen; 