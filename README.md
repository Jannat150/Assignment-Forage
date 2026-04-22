# AI Academy WhatsApp Chatbot

A full-stack chatbot project that answers AI Academy course questions on WhatsApp using Whapi + Node.js backend + LLM responses, with a lightweight React demo frontend.

## Project Overview

This project is designed to:

- Provide accurate AI Academy course information
- Handle common intents such as pricing, enrollment, course structure, and certificate
- Use an LLM for dynamic responses within a strict course context
- Apply WhatsApp-safe behavior (reply delay, duplicate suppression, no unsolicited messages)

## Tech Stack

- Backend: Node.js, Express.js, Axios, Dotenv
- Frontend: React (Create React App)
- WhatsApp API: Whapi
- LLM: OpenAI-compatible chat completion API

## Folder Structure

```text
ai-academy-fullstack/
	backend/
		package.json
		src/
			app.js
			controllers/
				webhookController.js
			routes/
				webhookRoutes.js
			services/
				llmService.js
				whatsappService.js
			utils/
				constants.js
	frontend/
		package.json
		public/
			index.html
		src/
			App.js
			index.js
```

## Backend Flow

1. Whapi sends incoming WhatsApp messages to POST /webhook.
2. Backend validates and normalizes incoming payload.
3. If message is AI-Academy, backend sends welcome message.
4. If message matches predefined intents, backend sends predefined response.
5. Otherwise, backend sends user query + course context to LLM.
6. Backend replies to WhatsApp via Whapi /messages/text.

## Implemented Message Logic

- Entry message trigger: AI-Academy
- Intent checks:
	- Pricing
	- Enrollment / Join
	- Course structure / Modules
	- Certificate
- LLM fallback for non-intent course questions
- Empty message handling
- Invalid payload ignored safely
- Duplicate message suppression window
- Human-like response delay
- Failure fallback: Sorry, I am facing some issues. Please try again later.

## API Endpoints

### Webhook Endpoint

- Method: POST
- Path: /webhook

Expected request shape:

```json
{
	"from": "user_number",
	"message": {
		"text": "User message"
	}
}
```

Success response:

- HTTP 200 OK


## Local Setup

### 1) Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### 2) Run backend

```bash
cd backend
npm start
```

Default backend URL:

- http://localhost:3000

### 3) Run frontend

```bash
cd frontend
npm start
```

Default frontend URL:

- http://localhost:3000 (or next free port if 3000 is already occupied)

## Frontend Purpose

The frontend is a demo UI to explain the chatbot behavior and try sample prompts. Actual production messaging occurs on WhatsApp through Whapi.

## Security and Safety

- API keys are read from environment variables only
- Avoid bulk/broadcast automation
- Reply only to user-initiated messages
- Delay each reply to reduce bot-like behavior
- Avoid repeated identical replies in short intervals

## Scalability Ideas

- Add database-backed conversation history
- Add RAG for richer contextual answers
- Add multilingual support
- Add analytics dashboard
- Add payment confirmation workflow

## License

This project is for educational/demo purposes.
