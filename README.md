# Hucobu

Hucobu (Human Connection Business) is a web app that asks you 30 questions and then uses OpenAI to suggest three business ideas that create human connection.

## What it does

The app shows 30 questions in three sections: "Why" (your motivation), "How" (your resources and style) and "What" (your ideas). You answer the questions one by one. Then the backend sends your answers to the OpenAI model `gpt-4o`. The model sends back three business ideas. Each idea has a description, a reason, next steps and a note about human connection. The app also shows a summary.

## Requirements

- Node.js 18 or later.
- npm (included with Node.js).
- An OpenAI account and API key: <https://platform.openai.com/api-keys>.

## Install

1. Get the code:

   ```bash
   git clone https://github.com/Ikarus0013/hucobu.git
   ```

2. Go into the project folder:

   ```bash
   cd hucobu
   ```

3. Install the backend dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Copy the backend example environment file:

   ```bash
   cp .env.example .env
   ```

5. Write your OpenAI API key into `backend/.env`. Refer to "Configure".
6. Install the frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

## Configure

Put these values in the `backend/.env` file.

| Variable | Required | Description | Where to get it |
| --- | --- | --- | --- |
| `OPENAI_API_KEY` | Yes | OpenAI API key. Only the backend uses it. | <https://platform.openai.com/api-keys> |
| `PORT` | No | Port of the backend server. The default is `3001`. | Your choice |

You can put this value in the `frontend/.env` file. Use `frontend/.env.example` as an example.

| Variable | Required | Description | Where to get it |
| --- | --- | --- | --- |
| `REACT_APP_API_URL` | No | URL of the backend server. The default is `http://localhost:3001`. | Your choice |

**CAUTION:** Do not commit the `.env` files. The backend file contains your private key.

## Use

1. Start the backend in a terminal:

   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend in a second terminal:

   ```bash
   cd frontend
   npm start
   ```

3. Open <http://localhost:3000> in your browser.
4. Click "Start Your Journey".
5. Answer each question.
6. Click "Next" to go to the next question. Click "Previous" to go back.
7. At the last question, click "Generate Business Ideas".
8. Wait for the result. This can take up to one minute.
9. Read the three business ideas and the summary.
10. Click "Start Over" to answer the questions again.

To build and start the backend for production, use these commands:

```bash
cd backend
npm run build
npm start
```

To make a production build of the frontend, use these commands:

```bash
cd frontend
npm run build
```

## How it works

1. The frontend has the questions in `frontend/src/shared/questions.ts`.
2. The frontend sends your answers to `POST /api/generate-ideas` on the backend.
3. The backend adds each question text to its answer and makes one prompt.
4. The backend sends the prompt to `gpt-4o` and asks for a JSON answer.
5. The backend reads the JSON. If the JSON is not correct, it makes one idea from the text.
6. The frontend shows the ideas.

The backend also has `GET /api/questions` and `GET /api/questions/:section` (`why`, `how` or `what`).

## Files

| Path | Description |
| --- | --- |
| `backend/src/server.ts` | Express server with the OpenAI call. |
| `backend/src/shared/` | Question data and types for the backend. |
| `frontend/src/App.tsx` | Main React component. |
| `frontend/src/components/WelcomeScreen.tsx` | Start page. |
| `frontend/src/components/QuestionForm.tsx` | Question form and results. |
| `frontend/src/shared/` | Question data and types for the frontend. |
| `frontend/tailwind.config.js` | Tailwind CSS settings. |

To change the questions, edit `backend/src/shared/questions.ts` and `frontend/src/shared/questions.ts`. Make sure the two files stay the same.

## Limits

- The questions are in two copies (backend and frontend). You must change both copies.
- The app does not save your answers or the ideas.
- The backend writes the full OpenAI answer to the console.
- Each request to OpenAI costs money on your OpenAI account.

## License

MIT. Refer to the `LICENSE` file.
