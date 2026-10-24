const PROFILE = {
  headline: 'Renewable Energy Consultant | Solar PV, Smart Grids & Industrial Decarbonization',
  evidence: [
    'Moroccan renewable energy engineer with 11+ years of experience',
    'HJT photovoltaic manufacturing strategy and gigafactory pre-FID technical direction',
    'Green Energy Park / IRESEN leadership in PV and smart-grid R&D',
    'PV testing, quality assurance, certification and grid integration',
    'PTB Germany consulting in Morocco, Vietnam and India',
    'Energy policy, e-mobility roadmaps, industrial decarbonization and international cooperation',
    'IEA PVPS national delegate; 49 peer-reviewed publications',
    'Technical evaluator, training consultant and Solar Decathlon Africa M&E team lead'
  ],
  languages: ['Arabic', 'French', 'English', 'German'],
  regions: ['Morocco', 'Africa', 'MENA', 'emerging markets', 'international development']
};

const OPPORTUNITY_KEY = 'fieldnotes-opportunity-tracker-v1';
const TRAINING_KEY = 'fieldnotes-free-training-v1';
const SEED_OPPORTUNITIES = [
  {
    id: 'afdb-kabisa-2026',
    title: 'Technical Assistance to Kabisa Electric — firm EOI',
    organisation: 'African Development Bank (AfDB)',
    type: 'Firm / subcontracting lead',
    location: 'Africa; delivery area to verify',
    deadline: '2026-10-30',
    status: 'Verify',
    score: 58,
    fit: 'Renewable energy and mobility overlap your technical background; the notice is for a consulting firm, so pursue only through an eligible bidding firm or as a proposed specialist.',
    notes: 'Firm-only EOI. Check the original notice for scope, eligibility and consortium/subcontract rules. Potential route: approach suitable energy advisory firms. An individual cannot apply directly unless the notice confirms otherwise.',
    url: 'https://www.afdb.org/en/about-us/careers/current-vacancies/consultants?order=field_consultant_type&sort=asc',
    added: '2026-10-24',
    verified: '2026-10-24',
    confidence: 'Official board; detail check required'
  },
  {
    id: 'eu-expert-evaluator',
    title: 'European Commission expert database — evaluator / monitor',
    organisation: 'European Commission Funding & Tenders Portal',
    type: 'Evaluator / reviewer',
    location: 'Remote; occasional Brussels assignments',
    deadline: '',
    status: 'Verify',
    score: 87,
    fit: 'Strong match for your technical evaluation, PV quality, research, policy and multilingual experience. Experts are selected per assignment; registration does not guarantee paid work.',
    notes: 'The Commission recruits independent experts for proposal evaluation and project monitoring. Confirm current call terms, geographic eligibility, conflict-of-interest rules and expert-profile keywords before registering. Assignments are short term and contracted when selected.',
    url: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/work-as-an-expert',
    added: '2026-10-24',
    verified: '2026-10-24',
    confidence: 'Official portal; registration and selection terms apply'
  }
];

const SEED_TRAINING = [
  {
    id: 'wb-me-climate-mitigation',
    title: 'Monitoring and Evaluation of Climate Mitigation Initiatives',
    provider: 'World Bank Group Open Learning Campus / UN SDG:Learn',
    url: 'https://www.unsdglearn.org/courses/monitoring-and-evaluation-of-climate-mitigation-initiatives/',
    duration: '5 weeks · 2–3 hours per week',
    cost: 'Free',
    credential: 'Certificate listed by course page',
    fit: 'Top priority: strengthens evaluation and MRV methods for climate mitigation, industrial decarbonization and evaluator assignments.',
    status: 'Interested',
    verified: '2026-10-24',
    score: 96,
    notes: ''
  },
  {
    id: 'undp-sustainable-finance',
    title: 'Introduction to Sustainable Finance for Climate and Energy',
    provider: 'UNDP Sustainable Finance Hub',
    url: 'https://sdgfinance.undp.org/courses/introduction-sustainable-finance-climate-and-energy',
    duration: 'Self-paced · duration not stated',
    cost: 'Free',
    credential: 'Certificate listed by course page',
    fit: 'High value for policy advisory, project evaluation, investment readiness and climate/energy finance assignments.',
    status: 'Interested',
    verified: '2026-10-24',
    score: 90,
    notes: ''
  },
  {
    id: 'nap-mel-processes',
    title: 'Monitoring, Evaluation and Learning for National Adaptation Plan Processes',
    provider: 'NAP Global Network / IISD',
    url: 'https://napglobalnetwork.org/2025/03/course-monitoring-evaluation-learning-nap/',
    duration: 'Free, self-paced',
    cost: 'Free',
    credential: 'Certificate not stated',
    fit: 'Useful for international technical cooperation and evaluation frameworks; complements the climate mitigation M&E course.',
    status: 'Interested',
    verified: '2026-10-24',
    score: 82,
    notes: ''
  },
  {
    id: 'tudelft-pv-systems',
    title: 'Solar Energy: Photovoltaic (PV) Systems',
    provider: 'Delft University of Technology via EIT Deep Tech Talent Initiative',
    url: 'https://www.eitdeeptechtalent.eu/courses/solar-energy-photovoltaic-pv-systems/',
    duration: '121 hours · online, continuously open',
    cost: 'Free',
    credential: 'Certificate listed by course page',
    fit: 'Optional technical refresher in PV system design, storage, grid-connected/off-grid applications and performance modelling. Long commitment for a senior PV practitioner.',
    status: 'Interested',
    verified: '2026-10-24',
    score: 68,
    notes: ''
  }
];

let opportunities = loadArray(OPPORTUNITY_KEY, SEED_OPPORTUNITIES);
let trainings = loadArray(TRAINING_KEY, SEED_TRAINING);
let view = 'opportunities';

function loadArray(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(value)) return value;
  } catch (_) {}
  return fallback.map(item => ({ ...item }));
}

function save() {
  localStorage.setItem(OPPORTUNITY_KEY, JSON.stringify(opportunities));
  localStorage.setItem(TRAINING_KEY, JSON.stringify(trainings));
  render();
}

function esc(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : '';
  } catch (_) {
    return '';
  }
}

function isLinkedInUrl(value) {
  try { return new URL(value).hostname.toLowerCase().endsWith('linkedin.com'); }
  catch (_) { return false; }
}

function deadlineState(date) {
  if (!date) return { label: 'Rolling / no deadline stated', kind: '' };
  const days = Math.ceil((new Date(`${date}T23:59:59`) - new Date()) / 86400000);
  if (days < 0) return { label: `Closed · ${date}`, kind: 'expired' };
  if (days <= 7) return { label: `Closes in ${days}d · ${date}`, kind: 'warning' };
  return { label: `Due ${date}`, kind: '' };
}

function isOpen(item) {
  return item.status !== 'Archived' && (!item.deadline || new Date(`${item.deadline}T23:59:59`) >= new Date());
}

function scoreLabel(score) {
  return score >= 75 ? 'Strong fit' : score >= 55 ? 'Possible fit' : 'Low fit';
}

function opportunityCard(item) {
  const deadline = deadlineState(item.deadline);
  const link = safeUrl(item.url);
  return `<article class="op-card">
    <div>
      <div class="card-top"><span class="tag primary">${esc(item.type)}</span>${item.sourcePlatform === 'LinkedIn' || isLinkedInUrl(item.url) ? '<span class="tag linkedin-tag">LinkedIn source</span>' : ''}<span class="tag ${deadline.kind}">${esc(deadline.label)}</span><span class="tag">${esc(item.status)}</span></div>
      <h3 class="op-title">${esc(item.title)}</h3>
      <div class="org-line">${esc(item.organisation)} · ${esc(item.location || 'Location not stated')}</div>
      <p class="op-notes">${esc(item.fit || item.notes || 'No fit notes yet.')}</p>
      ${item.notes ? `<details class="card-details"><summary>Verification notes</summary><p>${esc(item.notes)}</p></details>` : ''}
      <div class="card-meta"><span>◷ Checked ${esc(item.verified || 'not yet')}</span><span>⌖ ${esc(item.confidence || 'Source to verify')}</span>${link ? `<a class="card-link" href="${esc(link)}" target="_blank" rel="noopener">Original source ↗</a>` : ''}</div>
    </div>
    <div class="scorebox"><div><div class="score">${Number(item.score) || 0}<small> /100</small></div><div class="score-label">${scoreLabel(Number(item.score) || 0)}</div></div>
      <div class="card-actions"><select aria-label="Update status" data-status="${esc(item.id)}">${['New', 'Verify', 'Shortlisted', 'Contacted', 'Applied', 'Archived'].map(status => `<option ${item.status === status ? 'selected' : ''}>${status}</option>`).join('')}</select><button class="icon-button" data-delete="${esc(item.id)}" title="Delete opportunity" aria-label="Delete opportunity">×</button></div>
    </div>
  </article>`;
}

function trainingCard(item) {
  const link = safeUrl(item.url);
  return `<article class="training-card">
    <div class="training-rank"><span>${Number(item.score) || 0}</span><small>FIT</small></div>
    <div class="training-content"><div class="card-top"><span class="tag primary">${esc(item.cost || 'Free')}</span><span class="tag">${esc(item.credential || 'Credential not stated')}</span><span class="tag">${esc(item.status)}</span></div>
      <h3 class="op-title">${esc(item.title)}</h3><div class="org-line">${esc(item.provider)} · ${esc(item.duration || 'Duration not stated')}</div>
      <p class="op-notes">${esc(item.fit || '')}</p>${item.notes ? `<p class="training-notes"><strong>My notes:</strong> ${esc(item.notes)}</p>` : ''}
      <div class="card-meta"><span>Checked ${esc(item.verified || 'not yet')}</span>${link ? `<a class="card-link" href="${esc(link)}" target="_blank" rel="noopener">Course page ↗</a>` : ''}</div>
    </div>
    <div class="training-actions"><select aria-label="Update training status" data-training-status="${esc(item.id)}">${['Interested', 'Enrolled', 'In progress', 'Completed', 'Skip'].map(status => `<option ${item.status === status ? 'selected' : ''}>${status}</option>`).join('')}</select><button class="icon-button" data-training-delete="${esc(item.id)}" title="Remove training" aria-label="Remove training">×</button></div>
  </article>`;
}

function filteredOpportunities() {
  const query = document.querySelector('#search').value.trim().toLowerCase();
  const type = document.querySelector('#type-filter').value;
  const status = document.querySelector('#status-filter').value;
  const sort = document.querySelector('#sort-filter').value;
  const rows = opportunities.filter(item => {
    const text = [item.title, item.organisation, item.location, item.type, item.fit, item.notes].join(' ').toLowerCase();
    return item.type !== 'Evaluator / reviewer' && (!query || text.includes(query)) && (type === 'all' || item.type === type) && (status === 'all' || item.status === status);
  });
  if (sort === 'score') rows.sort((a, b) => b.score - a.score);
  else if (sort === 'deadline') rows.sort((a, b) => (a.deadline || '9999').localeCompare(b.deadline || '9999'));
  else rows.sort((a, b) => (b.added || '').localeCompare(a.added || ''));
  return rows;
}

function bindOpportunityCards() {
  document.querySelectorAll('[data-status]').forEach(select => {
    select.onchange = () => {
      const item = opportunities.find(row => row.id === select.dataset.status);
      if (item) { item.status = select.value; save(); }
    };
  });
  document.querySelectorAll('[data-delete]').forEach(button => {
    button.onclick = () => {
      opportunities = opportunities.filter(row => row.id !== button.dataset.delete);
      save(); toast('Opportunity removed.');
    };
  });
}

function renderOpportunities() {
  const rows = filteredOpportunities();
  const list = document.querySelector('#opportunity-list');
  document.querySelector('#feed-total').textContent = `(${rows.length})`;
  list.innerHTML = rows.length ? rows.map(opportunityCard).join('') : `<div class="empty"><strong>No opportunities match those filters.</strong><p>Add a lead from a tender portal, evaluator roster, consulting firm or client referral. Verify whether an individual can apply before advancing it.</p><button class="button button-primary add-opportunity">＋ Add opportunity</button></div>`;
  bindOpportunityCards();
  document.querySelectorAll('.add-opportunity').forEach(button => button.onclick = () => {
    openOpportunityDialog('Individual consultancy');
  });
}

function openOpportunityDialog(type, sourcePlatform = '') {
  document.querySelector('#opportunity-form [name="type"]').value = type;
  document.querySelector('#opportunity-form').dataset.captureSource = sourcePlatform;
  document.querySelector('#opportunity-dialog').showModal();
}

function renderPipeline() {
  const rows = opportunities.filter(item => ['Shortlisted', 'Contacted', 'Applied'].includes(item.status));
  document.querySelector('#pipeline-view').innerHTML = `<div class="view-heading"><div class="eyebrow">FOLLOW THROUGH</div><h2>My pipeline</h2><p>Paid consulting leads you have shortlisted, contacted or applied for.</p></div>${rows.length ? rows.map(opportunityCard).join('') : '<div class="empty"><strong>Your pipeline is clear.</strong><p>Change an opportunity status to Shortlisted, Contacted or Applied to track next steps.</p></div>'}`;
  bindOpportunityCards();
}

function renderEvaluation() {
  const rows = opportunities.filter(item => item.type === 'Evaluator / reviewer');
  document.querySelector('#evaluation-view').innerHTML = `<div class="view-heading"><div class="eyebrow">PAID REVIEW & ASSESSMENT WORK</div><h2>Evaluation work</h2><p>Evaluator, proposal reviewer, technical assessor and programme-monitoring assignments. Roster registration is not a contract; track selection, deadlines, eligibility and conflicts of interest.</p><button class="button button-primary" id="add-evaluator">＋ Add evaluation opportunity</button></div>${rows.length ? rows.map(opportunityCard).join('') : '<div class="empty"><strong>No evaluation leads tracked yet.</strong><p>Add an evaluator roster, technical review call or paid assessment contract.</p></div>'}`;
  bindOpportunityCards();
  document.querySelector('#add-evaluator').onclick = () => openOpportunityDialog('Evaluator / reviewer');
}

function renderLinkedIn() {
  const rows = opportunities.filter(item => item.sourcePlatform === 'LinkedIn' || isLinkedInUrl(item.url));
  const queries = [
    ['Consulting calls · renewable energy', 'call for consultant renewable energy solar PV Africa MENA Morocco'],
    ['Technical reviewers · energy and climate', 'technical evaluator reviewer renewable energy climate assessment'],
    ['Individual expert & policy mandates', 'individual consultant energy policy decarbonization Africa MENA'],
    ['Associate / subcontracting work', 'renewable energy consultant subcontractor associate expert Africa MENA'],
    ['Solar, smart grid & manufacturing', 'solar PV smart grids PV manufacturing quality certification consultant']
  ];
  const contentSearch = query => `https://www.linkedin.com/search/results/content/?keywords=${encodeURIComponent(query)}`;
  const jobSearch = query => `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(query)}`;
  document.querySelector('#linkedin-view').innerHTML = `<div class="view-heading"><div class="eyebrow">LINKEDIN OPPORTUNITY WATCH</div><h2>LinkedIn posts & contracts</h2><p>Search LinkedIn’s native Posts and Jobs results, then save promising consulting calls here with the original post URL. Filter out ordinary permanent jobs and check client, payment, deadline and eligibility before shortlisting.</p><button class="button button-primary" id="capture-linkedin">＋ Capture LinkedIn opportunity</button></div><article class="view-card"><h3>Focused LinkedIn searches</h3><p>LinkedIn results vary by account and may require sign-in. In Posts search, choose recent results; for Jobs, prioritize contract and temporary engagements.</p><div class="search-link-list">${queries.map(query => `<a class="search-link" href="${contentSearch(query[1])}" target="_blank" rel="noopener">Posts · ${esc(query[0])} ↗</a>`).join('')}<a class="search-link" href="${jobSearch('renewable energy consultant solar PV contract Africa Morocco')}" target="_blank" rel="noopener">Jobs · renewable energy contract roles ↗</a></div><p class="fine-print">The tracker does not scrape LinkedIn or read your feed. LinkedIn says third-party tools must not scrape or automate its site. This capture flow stores only the post URL and details you enter.</p><a href="https://www.linkedin.com/help/linkedin/answer/a523136/search-on-linkedin" target="_blank" rel="noopener">LinkedIn search help ↗</a> · <a href="https://www.linkedin.com/help/linkedin/answer/a1341543" target="_blank" rel="noopener">LinkedIn automated activity policy ↗</a></article><div class="view-heading compact-heading"><div class="eyebrow">SAVED FROM LINKEDIN</div><h2>Tracked posts <span class="subtle">(${rows.length})</span></h2></div>${rows.length ? rows.map(opportunityCard).join('') : '<div class="empty"><strong>No LinkedIn posts saved yet.</strong><p>Open a search above, copy the original post link, then capture it here. New captures start at Verify until paid status and eligibility are checked.</p><button class="button button-primary" id="capture-linkedin-empty">＋ Capture a post</button></div>'}`;
  bindOpportunityCards();
  const capture = () => openOpportunityDialog('Individual consultancy', 'LinkedIn');
  document.querySelector('#capture-linkedin').onclick = capture;
  const emptyButton = document.querySelector('#capture-linkedin-empty');
  if (emptyButton) emptyButton.onclick = capture;
}

function renderTraining() {
  const rows = [...trainings].sort((a, b) => (b.score || 0) - (a.score || 0));
  const complete = rows.filter(item => item.status === 'Completed').length;
  document.querySelector('#training-view').innerHTML = `<div class="view-heading"><div class="eyebrow">PROFILE-BUILDING · FREE ONLY</div><h2>Free training</h2><p>Self-paced learning with a clear link to your consulting pipeline. Cost and certificate details are checked against the course page; re-check before enrolling.</p><div class="training-summary"><span><strong>${rows.length}</strong> saved</span><span><strong>${complete}</strong> completed</span><span><strong>0</strong> paid courses included</span></div><button class="button button-primary" id="add-training">＋ Add training</button></div>${rows.length ? rows.map(trainingCard).join('') : '<div class="empty"><strong>No training saved.</strong><p>Add a free course and track it from interested through completion.</p></div>'}`;
  document.querySelectorAll('[data-training-status]').forEach(select => {
    select.onchange = () => {
      const item = trainings.find(row => row.id === select.dataset.trainingStatus);
      if (item) { item.status = select.value; save(); }
    };
  });
  document.querySelectorAll('[data-training-delete]').forEach(button => {
    button.onclick = () => {
      trainings = trainings.filter(row => row.id !== button.dataset.trainingDelete);
      save(); toast('Training removed.');
    };
  });
  document.querySelector('#add-training').onclick = () => document.querySelector('#training-dialog').showModal();
}

function renderSources() {
  const sourceList = [
    ['AfDB consultants', 'Individual and firm EOIs across Africa. Screen out expired notices and distinguish people from company eligibility.', 'https://www.afdb.org/en/about-us/careers/current-vacancies/consultants?order=field_consultant_type&sort=asc'],
    ['UNGM procurement notices', 'UN and partner procurement; look for individual consultant and technical service notices.', 'https://www.ungm.org/Public/Notice'],
    ['UNDP procurement notices', 'Country-office individual consultant contracts and technical assistance.', 'https://procurement-notices.undp.org/'],
    ['European Commission expert work', 'Paid evaluator, monitor and proposal-review mandates through the expert database.', 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/work-as-an-expert'],
    ['LinkedIn opportunity posts', 'Use the dedicated LinkedIn tab for native Posts and Jobs searches. Manually capture the original post URL; the app does not scrape or automate LinkedIn.', 'https://www.linkedin.com/search/results/content/?keywords=renewable%20energy%20consultant'],
    ['World Bank procurement', 'Consulting services EOIs and project procurement; distinguish firm from individual.', 'https://projects.worldbank.org/en/projects-operations/procurement'],
    ['ILO e-Sourcing / UNGM', 'Individual consultants and external collaborator calls; supplier registration may be required.', 'https://www.ungm.org/Public/Notice'],
    ['Direct firms and developers', 'Build a focused list of energy advisory, engineering, manufacturing and due-diligence firms active in Morocco, Africa and MENA.', '']
  ];
  const queries = [
    ['Individual energy consulting · Morocco & MENA', '(renewable energy OR solar PV OR smart grid OR decarbonization) (consultant OR consultancy OR expert) Morocco MENA'],
    ['Paid evaluator & reviewer assignments', '(renewable energy OR climate OR power sector) (evaluator OR reviewer OR technical assessor) consultant Africa'],
    ['Technical assistance & firm partnerships', '(solar OR renewable energy OR energy access) (technical assistance OR EOI OR subcontractor OR consortium) Africa'],
    ['PV manufacturing, quality & grid integration', '(PV manufacturing OR photovoltaic OR grid integration OR certification) consultant (Africa OR MENA OR Morocco)']
  ];
  document.querySelector('#sources-view').innerHTML = `<div class="view-heading"><div class="eyebrow">DISCOVERY CHANNELS</div><h2>Sources to monitor</h2><p>Free-first sources and focused searches. Search results are leads only; open the original notice to confirm current eligibility, fee status and deadline.</p></div>${sourceList.map(source => `<article class="view-card"><h3>${esc(source[0])}</h3><p>${esc(source[1])}</p>${source[2] ? `<a href="${esc(source[2])}" target="_blank" rel="noopener">Open source ↗</a>` : ''}</article>`).join('')}<article class="view-card"><h3>Ready-to-run searches</h3><p>Search the web for new opportunities that match your profile.</p>${queries.map(query => `<a class="search-link" href="https://www.google.com/search?q=${encodeURIComponent(query[1])}" target="_blank" rel="noopener">${esc(query[0])} ↗</a>`).join('')}</article><article class="view-card"><h3>Profile fit used for matching</h3><p>${esc(PROFILE.headline)}. Strengths: ${esc(PROFILE.evidence.join('; '))}. Languages: ${esc(PROFILE.languages.join(', '))}. Target regions: ${esc(PROFILE.regions.join(', '))}.</p></article>`;
}

function render() {
  const open = opportunities.filter(isOpen);
  const closingSoon = open.filter(item => item.deadline && (new Date(`${item.deadline}T23:59:59`) - new Date()) / 86400000 <= 7);
  document.querySelector('#today').textContent = new Intl.DateTimeFormat('en', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).format(new Date()).toUpperCase();
  document.querySelector('#metric-open').textContent = open.length;
  document.querySelector('#metric-strong').textContent = open.filter(item => item.score >= 70).length;
  document.querySelector('#metric-soon').textContent = closingSoon.length;
  document.querySelector('#metric-pipeline').textContent = opportunities.filter(item => ['Shortlisted', 'Contacted', 'Applied'].includes(item.status)).length;
  document.querySelector('#nav-count').textContent = opportunities.filter(item => isOpen(item) && item.type !== 'Evaluator / reviewer').length;
  document.querySelector('#evaluation-count').textContent = opportunities.filter(item => item.type === 'Evaluator / reviewer' && isOpen(item)).length;
  document.querySelector('#linkedin-count').textContent = opportunities.filter(item => (item.sourcePlatform === 'LinkedIn' || isLinkedInUrl(item.url)) && isOpen(item)).length;
  document.querySelector('#training-count').textContent = trainings.filter(item => !['Completed', 'Skip'].includes(item.status)).length;

  const sections = {
    opportunities: '#opportunity-list', pipeline: '#pipeline-view', evaluation: '#evaluation-view', linkedin: '#linkedin-view', training: '#training-view', sources: '#sources-view'
  };
  Object.entries(sections).forEach(([name, selector]) => document.querySelector(selector).classList.toggle('hidden', view !== name));
  document.querySelector('#intro').classList.toggle('hidden', view !== 'opportunities');
  document.querySelector('#metrics').classList.toggle('hidden', !['opportunities', 'pipeline'].includes(view));
  document.querySelector('#filters').classList.toggle('hidden', view !== 'opportunities');
  document.querySelector('#feed-heading').classList.toggle('hidden', view !== 'opportunities');
  document.querySelector('#crumb-current').textContent = view === 'opportunities' ? 'OPPORTUNITIES' : view.replace('-', ' ').toUpperCase();
  if (view === 'opportunities') renderOpportunities();
  if (view === 'pipeline') renderPipeline();
  if (view === 'evaluation') renderEvaluation();
  if (view === 'linkedin') renderLinkedIn();
  if (view === 'training') renderTraining();
  if (view === 'sources') renderSources();
}

function toast(message) {
  const node = document.querySelector('#toast');
  node.textContent = message;
  node.classList.add('show');
  setTimeout(() => node.classList.remove('show'), 2300);
}

document.querySelectorAll('.nav-item').forEach(button => button.onclick = () => {
  view = button.dataset.view;
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item === button));
  render();
});

['#search', '#type-filter', '#status-filter', '#sort-filter'].forEach(selector => {
  document.querySelector(selector).addEventListener('input', render);
});

document.querySelector('#reset-filters').onclick = () => {
  document.querySelector('#search').value = '';
  document.querySelector('#type-filter').value = 'all';
  document.querySelector('#status-filter').value = 'all';
  document.querySelector('#sort-filter').value = 'score';
  render();
};

document.querySelector('#save-opportunity').onclick = event => {
  event.preventDefault();
  const form = new FormData(document.querySelector('#opportunity-form'));
  const rawUrl = form.get('url');
  if (rawUrl && !safeUrl(rawUrl)) return toast('Use a valid https:// source URL.');
  const capturedFromLinkedIn = document.querySelector('#opportunity-form').dataset.captureSource === 'LinkedIn';
  const linkedInUrl = isLinkedInUrl(rawUrl);
  if (capturedFromLinkedIn && !linkedInUrl) return toast('Paste the original linkedin.com post or job URL to capture it.');
  const item = {
    id: `custom-${Date.now()}`, title: form.get('title'), organisation: form.get('organisation') || 'Organisation not stated',
    type: form.get('type'), location: form.get('location'), deadline: form.get('deadline'), url: rawUrl,
    notes: form.get('notes'), fit: form.get('notes') || 'Manually added; assess profile fit and verify eligibility.',
    status: capturedFromLinkedIn || linkedInUrl ? 'Verify' : 'New',
    sourcePlatform: capturedFromLinkedIn || linkedInUrl ? 'LinkedIn' : '',
    score: 45, added: new Date().toISOString().slice(0, 10), verified: 'not yet',
    confidence: capturedFromLinkedIn || linkedInUrl ? 'LinkedIn post; verify at source' : 'Unverified'
  };
  opportunities.unshift(item);
  document.querySelector('#opportunity-dialog').close();
  document.querySelector('#opportunity-form').reset();
  save(); toast('Opportunity added. Verify the source and eligibility.');
};

document.querySelector('#save-training').onclick = event => {
  event.preventDefault();
  const form = new FormData(document.querySelector('#training-form'));
  const url = safeUrl(form.get('url'));
  if (!url) return toast('Use a valid https:// course URL.');
  trainings.unshift({
    id: `training-${Date.now()}`, title: form.get('title'), provider: form.get('provider') || 'Provider not stated',
    duration: form.get('duration') || 'Duration not stated', url, cost: 'Free — verify before enrolling',
    credential: 'Not checked', fit: form.get('notes') || 'Assess the link to your consulting profile before enrolling.',
    notes: form.get('notes'), status: 'Interested', verified: 'not yet', score: 45
  });
  document.querySelector('#training-dialog').close();
  document.querySelector('#training-form').reset();
  save(); toast('Training saved. Check the course cost and access terms.');
};

document.querySelector('#export-btn').onclick = () => {
  const backup = { version: 2, exportedAt: new Date().toISOString(), opportunities, trainings };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `fieldnotes-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click(); URL.revokeObjectURL(link.href); toast('Backup exported.');
};

document.querySelector('#import-file').onchange = async event => {
  try {
    const parsed = JSON.parse(await event.target.files[0].text());
    const importedOpportunities = Array.isArray(parsed) ? parsed : parsed.opportunities;
    const importedTraining = Array.isArray(parsed) ? [] : parsed.trainings;
    if (!Array.isArray(importedOpportunities)) throw new Error('Invalid format');
    opportunities = importedOpportunities.map(item => ({ ...item, id: String(item.id || `import-${Math.random().toString(36).slice(2)}`) }));
    if (Array.isArray(importedTraining)) trainings = importedTraining.map(item => ({ ...item, id: String(item.id || `training-${Math.random().toString(36).slice(2)}`) }));
    save(); toast('Backup imported.');
  } catch (_) { toast('Could not read that backup file.'); }
  event.target.value = '';
};

render();

