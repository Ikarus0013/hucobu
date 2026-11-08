import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { questions, getQuestionsBySection } from './shared/questions';
import { Answer, OpenAIResponse } from './shared/types';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

// Get all questions
app.get('/api/questions', (req, res) => {
  res.json(questions);
});

// Get questions by section
app.get('/api/questions/:section', (req, res) => {
  const { section } = req.params;
  if (section === 'why' || section === 'how' || section === 'what') {
    const sectionQuestions = getQuestionsBySection(section);
    res.json(sectionQuestions);
  } else {
    res.status(400).json({ error: 'Invalid section' });
  }
});

// Generate business ideas using OpenAI
app.post('/api/generate-ideas', async (req, res) => {
  try {
    const { answers }: { answers: Answer[] } = req.body;

    if (!answers || answers.length === 0) {
      return res.status(400).json({ error: 'Answers are required' });
    }

    // Create a formatted prompt with all answers
    const formattedAnswers = answers
      .map(answer => {
        const question = questions.find(q => q.id === answer.questionId);
        return `Question ${answer.questionId}: ${question?.text}\nAnswer: ${answer.value}\n`;
      })
      .join('\n');

    const prompt = `Based on the following answers to questions about starting a human connection business, generate 3 specific business ideas. 

Please provide your response in the following JSON format:
{
  "ideas": [
    {
      "title": "Business Name/Title",
      "description": "2-3 sentence description of the business concept",
      "reasoning": "Why this idea aligns with their answers and strengths",
      "nextSteps": ["Step 1", "Step 2", "Step 3"],
      "alignment": "How this business creates human connection"
    }
  ],
  "summary": "Overall assessment and recommendation"
}

Here are the answers:

${formattedAnswers}

Focus on practical, actionable business ideas that leverage their strengths and create genuine human connections. Consider their budget, time constraints, and personal preferences.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a business consultant specializing in helping people start businesses that create meaningful human connections. Provide practical, actionable advice."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Debug: Log the raw response from OpenAI
    console.log('Raw OpenAI response:', response);
    console.log('Response type:', typeof response);

    // Clean the response by removing markdown formatting
    let cleanedResponse = response;
    if (response.includes('```json')) {
      // Remove markdown code block formatting
      cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      console.log('Cleaned response:', cleanedResponse);
    }

    // Try to parse the JSON response
    let parsedResponse: OpenAIResponse;
    try {
      parsedResponse = JSON.parse(cleanedResponse);
      console.log('Successfully parsed JSON response:', parsedResponse);
    } catch (parseError) {
      console.log('JSON parsing failed:', parseError);
      console.log('Cleaned response that failed to parse:', cleanedResponse);
      
      // If parsing fails, create a structured response from the text
      parsedResponse = {
        ideas: [{
          title: "AI Generated Business Concept",
          description: cleanedResponse.length > 200 ? cleanedResponse.substring(0, 200) + "..." : cleanedResponse,
          reasoning: "This idea was generated based on your specific answers and preferences",
          nextSteps: [
            "Review the generated concept carefully",
            "Identify the key elements that resonate with you", 
            "Research the feasibility and market potential"
          ],
          alignment: "This business concept focuses on creating meaningful human connections based on your responses"
        }],
        summary: "AI has generated a business concept based on your answers. While the response couldn't be parsed in the expected format, the core idea is presented above for your review."
      };
      console.log('Created fallback response:', parsedResponse);
    }

    res.json(parsedResponse);
  } catch (error) {
    console.error('Error generating ideas:', error);
    res.status(500).json({ 
      error: 'Failed to generate ideas',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 