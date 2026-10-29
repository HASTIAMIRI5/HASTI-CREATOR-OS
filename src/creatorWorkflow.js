const test = require('node:test');
const assert = require('node:assert/strict');
const { generateCreatorPlan } = require('../src/creatorWorkflow');

test('generateCreatorPlan returns a structured creator strategy', () => {
  const plan = generateCreatorPlan({
    topic: 'AI productivity workflows',
    audience: 'founders and creators',
    tone: 'clear and practical',
    channels: ['blog', 'linkedin', 'newsletter'],
  });

  assert.equal(plan.title, 'AI Productivity Workflows');
  assert.ok(plan.summary.includes('AI productivity workflows'));
  assert.equal(plan.ideas.length, 3);
  assert.equal(plan.contentPillars.length, 4);
  assert.equal(plan.publishingPlan.length, 3);
  assert.ok(plan.nextActions.length >= 3);
});
