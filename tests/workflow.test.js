const form = document.getElementById('plan-form');
const output = document.getElementById('output');
const status = document.getElementById('status');

function renderPlan(plan) {
  const channels = (plan.channels || [])
    .map((channel) => `<li><strong>${channel.name}</strong>: ${channel.objective}</li>`)
    .join('');

  const ideas = (plan.ideas || [])
    .map(
      (idea) => `
        <li>
          <strong>${idea.title}</strong><br />
          ${idea.angle}<br />
          <span>${idea.promise}</span>
        </li>
      `
    )
    .join('');

  const pillars = (plan.contentPillars || [])
    .map((pillar) => `<li>${pillar}</li>`)
    .join('');

  const weekPlan = (plan.publishingPlan || [])
    .map(
      (step) => `
        <li>
          <strong>Week ${step.week}:</strong> ${step.focus}
          <ul>
            ${step.deliverables.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </li>
      `
    )
    .join('');

  const nextActions = (plan.nextActions || [])
    .map((item) => `<li>${item}</li>`)
    .join('');

  const workflow = (plan.workflow || [])
    .map((step) => `<li>${step}</li>`)
    .join('');

  output.innerHTML = `
    <div class="card">
      <h3>${plan.title}</h3>
      <p>${plan.summary}</p>
      <p><strong>Audience:</strong> ${plan.audience}<br /><strong>Tone:</strong> ${plan.tone}</p>
    </div>

    <div class="card">
      <h3>Top ideas</h3>
      <ul>${ideas}</ul>
    </div>

    <div class="card">
      <h3>Content pillars</h3>
      <ul>${pillars}</ul>
    </div>

    <div class="card">
      <h3>Publishing channels</h3>
      <ul>${channels}</ul>
    </div>

    <div class="card">
      <h3>Publishing plan</h3>
      <ul>${weekPlan}</ul>
    </div>

    <div class="card">
      <h3>Workflow</h3>
      <ul>${workflow}</ul>
    </div>

    <div class="card">
      <h3>Next actions</h3>
      <ul>${nextActions}</ul>
    </div>
  `;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const topic = formData.get('topic')?.toString().trim();
  const audience = formData.get('audience')?.toString().trim();
  const tone = formData.get('tone')?.toString().trim();
  const channelsText = formData.get('channels')?.toString().trim();

  const channels = channelsText
    ? channelsText
        .split(',')
        .map((name) => name.trim())
        .filter(Boolean)
    : [];

  if (!topic) {
    status.textContent = 'Please add a topic before generating the plan.';
    return;
  }

  status.textContent = 'Generating your creator workflow...';
  output.innerHTML = '';

  try {
    const response = await fetch('/api/plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, audience, tone, channels }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Unknown error');
    }

    renderPlan(data);
    status.textContent = 'Creator plan generated successfully.';
  } catch (error) {
    output.innerHTML = `<div class="card"><strong>Error:</strong> ${error.message}</div>`;
    status.textContent = 'Generation failed.';
  }
});
