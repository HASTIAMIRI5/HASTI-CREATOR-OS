require('dotenv').config();
const express = require('express');
const path = require('path');
const { generateCreatorPlan } = require('./src/creatorWorkflow');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    app: process.env.APP_NAME || 'Hasti Creator OS',
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/plan', (req, res) => {
  const { topic, audience, tone, channels } = req.body || {};

  if (!topic || !topic.trim()) {
    return res.status(400).json({
      error: 'A topic is required to generate a creator plan.',
    });
  }

  try {
    const plan = generateCreatorPlan({
      topic: topic.trim(),
      audience: audience?.trim() || 'general digital audience',
      tone: tone?.trim() || 'clear and practical',
      channels: Array.isArray(channels) && channels.length ? channels : ['blog', 'newsletter', 'linkedin'],
    });

    return res.json(plan);
  } catch (error) {
    return res.status(500).json({
      error: 'Unable to generate the creator workflow right now.',
      details: error.message,
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Hasti Creator OS running at http://localhost:${PORT}`);
});
