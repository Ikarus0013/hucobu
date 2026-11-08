import { Question } from './types';

export const questions: Question[] = [
  // Section 1: The "Why" - Your Core Desires (Questions 1-10)
  {
    id: 1,
    section: 'why',
    text: 'What does "human connection" mean to you? Describe an experience where you felt truly connected to another person.',
    type: 'textarea',
    required: true
  },
  {
    id: 2,
    section: 'why',
    text: 'Think about your current job. What\'s the one thing you are missing the most?',
    type: 'textarea',
    required: true
  },
  {
    id: 3,
    section: 'why',
    text: 'What kind of feelings do you want to evoke in your customers? (e.g., happiness, belonging, inspiration, comfort).',
    type: 'textarea',
    required: true
  },
  {
    id: 4,
    section: 'why',
    text: 'What\'s a common, everyday interaction that you love? (e.g., getting a coffee from a friendly barista, chatting with a local shop owner).',
    type: 'textarea',
    required: true
  },
  {
    id: 5,
    section: 'why',
    text: 'What are you passionate about, even if it has nothing to do with business?',
    type: 'textarea',
    required: true
  },
  {
    id: 6,
    section: 'why',
    text: 'What are your personal or professional strengths? What makes you unique?',
    type: 'textarea',
    required: true
  },
  {
    id: 7,
    section: 'why',
    text: 'If money were no object, how would you spend your time?',
    type: 'textarea',
    required: true
  },
  {
    id: 8,
    section: 'why',
    text: 'What\'s a problem in your community or daily life that you\'d love to solve?',
    type: 'textarea',
    required: true
  },
  {
    id: 9,
    section: 'why',
    text: 'What kind of people do you feel energized after spending time with?',
    type: 'textarea',
    required: true
  },
  {
    id: 10,
    section: 'why',
    text: 'What\'s a moment in your life that you\'re proud of?',
    type: 'textarea',
    required: true
  },

  // Section 2: The "How" - Your Operational Style & Resources (Questions 11-20)
  {
    id: 11,
    section: 'how',
    text: 'How much time are you realistically willing to dedicate to this project each week?',
    type: 'select',
    options: ['1-5 hours', '5-10 hours', '10-20 hours', '20+ hours'],
    required: true
  },
  {
    id: 12,
    section: 'how',
    text: 'What\'s your total budget for getting started?',
    type: 'select',
    options: ['Under €5,000', '€5,000 - €20,000', '€20,000 - €50,000', 'More than €50,000'],
    required: true
  },
  {
    id: 13,
    section: 'how',
    text: 'Do you prefer a physical space (like a shop) or a more mobile setup (like a food truck, pop-up, or market stall)?',
    type: 'select',
    options: ['Physical space', 'Mobile setup', 'Both', 'Not sure yet'],
    required: true
  },
  {
    id: 14,
    section: 'how',
    text: 'Are you looking for a side hustle or something that could eventually become your full-time job?',
    type: 'select',
    options: ['Side hustle', 'Full-time eventually', 'Not sure yet'],
    required: true
  },
  {
    id: 15,
    section: 'how',
    text: 'Are you comfortable with a long-term project (1-2 years to see a return) or do you need to see results more quickly?',
    type: 'select',
    options: ['Long-term (1-2 years)', 'Quick results (3-6 months)', 'Medium-term (6-12 months)'],
    required: true
  },
  {
    id: 16,
    section: 'how',
    text: 'Are you more of a front-facing person who loves interacting with people, or a behind-the-scenes person who enjoys making things happen?',
    type: 'select',
    options: ['Front-facing', 'Behind-the-scenes', 'Both equally'],
    required: true
  },
  {
    id: 17,
    section: 'how',
    text: 'What skills do you want to learn as part of this project?',
    type: 'textarea',
    required: true
  },
  {
    id: 18,
    section: 'how',
    text: 'What\'s a "worst-case scenario" you\'re willing to accept if the business fails?',
    type: 'textarea',
    required: true
  },
  {
    id: 19,
    section: 'how',
    text: 'What does your ideal workday look like, from start to finish?',
    type: 'textarea',
    required: true
  },
  {
    id: 20,
    section: 'how',
    text: 'How do you typically handle stress and challenging situations?',
    type: 'textarea',
    required: true
  },

  // Section 3: The "What" - Brainstorming & Idea Generation (Questions 21-30)
  {
    id: 21,
    section: 'what',
    text: 'Think about your ideal day and the connections you want to create. What\'s one dream scenario you wouldn\'t mind repeating often? (e.g., "I am in a cozy cafe, serving people coffee and chatting with regulars" or "I am at a craft market, talking to people about creative processes")',
    type: 'textarea',
    required: true
  },
  {
    id: 22,
    section: 'what',
    text: 'What type of environment or setting makes you feel most energized and connected to others?',
    type: 'textarea',
    required: true
  },
  {
    id: 23,
    section: 'what',
    text: 'What kind of problems do you enjoy helping people solve?',
    type: 'textarea',
    required: true
  },
  {
    id: 24,
    section: 'what',
    text: 'Who are the people you feel most passionate about serving or helping?',
    type: 'textarea',
    required: true
  },
  {
    id: 25,
    section: 'what',
    text: 'What skills or knowledge do you have that others often ask you about?',
    type: 'textarea',
    required: true
  },
  {
    id: 26,
    section: 'what',
    text: 'What kind of experiences do you want to create for your customers?',
    type: 'textarea',
    required: true
  },
  {
    id: 27,
    section: 'what',
    text: 'What does "success" look like to you in terms of human connection?',
    type: 'textarea',
    required: true
  },
  {
    id: 28,
    section: 'what',
    text: 'What excites you most about the possibility of creating meaningful connections through business?',
    type: 'textarea',
    required: true
  },
  {
    id: 29,
    section: 'what',
    text: 'What concerns or fears do you have about starting this type of business?',
    type: 'textarea',
    required: true
  },
  {
    id: 30,
    section: 'what',
    text: 'If you could create one thing that would make the world more connected, what would it be?',
    type: 'textarea',
    required: true
  }
];

export const getQuestionsBySection = (section: 'why' | 'how' | 'what') => {
  return questions.filter(q => q.section === section);
};

export const getSectionTitle = (section: 'why' | 'how' | 'what') => {
  const titles = {
    why: 'The "Why" - Your Core Desires',
    how: 'The "How" - Your Operational Style & Resources',
    what: 'The "What" - Brainstorming & Idea Generation'
  };
  return titles[section];
}; 