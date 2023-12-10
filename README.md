# Pair Academy

I found pair programming an incredibly value experience when I was learning to code. I wanted to create a platform that would replicate that experience with AI. To allow beginners to get personalized, instantaneous, and relevant feedback on their journey in learning how to code. That is the inspiration behind Pair Academy.

![Description of Image](src/assets/application.png "Title of Image")

## Demo

To be added.

## How to Use

The plan is to get the application deployed. For now, you can clone the repo and follow these steps:

### Setup Server Code

- Create an .env file in the root of the client folder
- Add the following to the .env file

```bash
PORT=3000

RAPID_API_HOST = 'judge0-ce.p.rapidapi.com'
RAPID_API_KEY = 'YOUR RAPID API KEY'
RAPID_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions'

OPENAI_API_KEY = 'YOUR OPENAI API KEY'
```

- More resources on setting up Rapid API can be found [here](https://rapidapi.com/judge0-official/api/judge0-ce)
- More resources on setting up OpenAI can be found [here](https://beta.openai.com/docs/developer-quickstart/your-api-keys)
  
- Then run the following commands:

```bash
npm install
npm run dev
```

### Setup Client Code

- Create an .env file in the root of the client folder
- Add the following to the .env file

```bash
VITE_API_BASE_URL = 'API_BASE_URL'
```

- The API_BASE_URL is the url of the server code which when run locally is by default http://localhost:3000
- Then run the following commands:

```bash
npm install
npm run dev
```

## Backlog

- [ ] UX Upgrades
- [ ] Add More Lessons
- [ ] Enable in code editor edits from AI tutor