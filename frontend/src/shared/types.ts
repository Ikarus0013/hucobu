export interface Question {
  id: number;
  section: 'why' | 'how' | 'what';
  text: string;
  type: 'text' | 'textarea' | 'select';
  options?: string[];
  required: boolean;
}

export interface Answer {
  questionId: number;
  value: string;
}

export interface FormData {
  answers: Answer[];
  currentSection: 'why' | 'how' | 'what';
  currentQuestion: number;
}

export interface BusinessIdea {
  title: string;
  description: string;
  reasoning: string;
  nextSteps: string[];
  alignment: string;
}

export interface OpenAIResponse {
  ideas: BusinessIdea[];
  summary: string;
} 