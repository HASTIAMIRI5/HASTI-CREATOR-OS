# Hasti Creator OS

A lightweight AI creator workflow assistant for ideation, planning, and publishing work.

## What it does

- turns a topic into a creator strategy
- generates content angles and hooks
- maps a publishing plan across channels
- helps move from idea to publish-ready execution

## Quick start

```bash
npm install
npm start
```

Then open http://localhost:3000

## Features

- Topic-based brainstorming
- audience and tone tuning
- content pillars and publishing pipeline
- structured output for content planning
- optional environment-configured app metadata

## API

### POST /api/plan

Request body:

```json
{
  "topic": "AI productivity workflows",
  "audience": "founders and creators",
  "tone": "confident and practical",
  "channels": ["blog", "linkedin", "newsletter"]
}
```

Response:

```json
{
  "title": "AI Productivity Workflows",
  "summary": "...",
  "ideas": [...],
  "contentPillars": [...],
  "publishingPlan": [...],
  "workflow": [...],
  "nextActions": [...]
}
```

## Development

```bash
npm run dev
npm test
```

## License

MIT
