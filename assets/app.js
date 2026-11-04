/**
 * ICS Research Centre — Interactive Enterprise Platform
 * Inspired by Global InfoAnalytics & Top-Tier Think Tanks
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroPollWidget();
  initFloatingAssistant();
  initJoinPanelModal();
  initNewsletter();
  initArchiveFilter();
  initCitationModal();
  initContactForm();
  initDatasetViewer();
});

/* --------------------------------------------------------------------------
   Mobile Navigation Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (toggleBtn && navList) {
    toggleBtn.addEventListener('click', () => {
      navList.classList.toggle('mobile-active');
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !expanded);
    });
  }
}

/* --------------------------------------------------------------------------
   Hero Live Polling & Sentiment Tracker Widget (Like GIA Polling Models)
   -------------------------------------------------------------------------- */
const pollData = {
  governance: {
    title: 'Ghana National Sentiment & Economic Direction',
    tag: 'Q3 2026 Poll Result',
    sample: 'N = 2,400 across 16 Regions • MoE: ±2.1%',
    question: 'Generally speaking, do you believe the country is moving in the right direction or wrong direction?',
    bars: [
      { label: 'Wrong Direction', pct: '51%', fill: 'fill-amber' },
      { label: 'Right Direction', pct: '44%', fill: 'fill-blue' },
      { label: 'Undecided / Neutral', pct: '5%', fill: 'fill-green' }
    ]
  },
  markets: {
    title: 'Household Food Price Inflation Perception',
    tag: '42 Markets Tracker',
    sample: 'N = 1,850 Households & Traders • MoE: ±2.3%',
    question: 'How has the price of staple food items (maize, rice, oil) impacted your household budget over the last 90 days?',
    bars: [
      { label: 'Severe Strain (>25% increase)', pct: '64%', fill: 'fill-red' },
      { label: 'Moderate Strain (10–25%)', pct: '28%', fill: 'fill-amber' },
      { label: 'Little to No Change (<10%)', pct: '8%', fill: 'fill-green' }
    ]
  },
  health: {
    title: 'Subnational Primary Health (CHPS) Facility Access',
    tag: 'Health Systems Poll',
    sample: '340 Catchment Communities • MoE: ±2.0%',
    question: 'Is your nearest Community Health Post (CHPS) staffed with a certified resident midwife or nurse 24/7?',
    bars: [
      { label: 'Yes, full residential staffing', pct: '58%', fill: 'fill-blue' },
      { label: 'Intermittent / Weekdays only', pct: '29%', fill: 'fill-amber' },
      { label: 'Frequent unmanned closures', pct: '13%', fill: 'fill-red' }
    ]
  }
};

function initHeroPollWidget() {
  const tabBtns = document.querySelectorAll('.poll-tab-btn');
  const cardContainer = document.getElementById('heroPollContent');
  const tagBadge = document.getElementById('heroPollTag');
  const sampleText = document.getElementById('heroPollSample');

  if (!tabBtns.length || !cardContainer) return;

  function renderPoll(key) {
    const data = pollData[key];
    if (!data) return;

    if (tagBadge) tagBadge.textContent = data.tag;
    if (sampleText) sampleText.textContent = data.sample;

    cardContainer.innerHTML = `
      <div class="poll-question">${data.question}</div>
      <div class="poll-bars">
        ${data.bars.map(b => `
          <div class="poll-bar-item">
            <div class="poll-bar-label">
              <span>${b.label}</span>
              <span>${b.pct}</span>
            </div>
            <div class="poll-bar-track">
              <div class="poll-bar-fill ${b.fill}" style="width: 0%;" data-target-width="${b.pct}"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Trigger smooth fill animation
    setTimeout(() => {
      cardContainer.querySelectorAll('.poll-bar-fill').forEach(el => {
        el.style.width = el.getAttribute('data-target-width');
      });
    }, 50);
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-poll-key');
      renderPoll(key);
    });
  });

  // Initial render
  renderPoll('governance');
}

/* --------------------------------------------------------------------------
   Floating Digital Assistant Widget (Like GIA Assistant)
   -------------------------------------------------------------------------- */
function initFloatingAssistant() {
  const triggerBtn = document.getElementById('assistantTrigger');
  const drawer = document.getElementById('assistantDrawer');
  const closeBtn = document.getElementById('assistantClose');
  const body = document.getElementById('assistantMessages');

  if (!triggerBtn || !drawer) return;

  triggerBtn.addEventListener('click', () => {
    drawer.classList.toggle('active');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('active');
    });
  }

  // Delegate clicks on assistant chip prompts
  document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('assistant-chip')) {
      const topic = e.target.getAttribute('data-prompt');
      handleAssistantQuery(topic, body);
    }
  });
}

function handleAssistantQuery(topic, container) {
  if (!container) return;

  let userQuestion = '';
  let botReply = '';

  if (topic === 'commission-poll') {
    userQuestion = 'How do I commission an opinion poll or market study?';
    botReply = `ICS Research Centre designs and conducts tailored surveys, brand tracking, and public policy opinion polls with stratified sampling across Ghana's 16 regions. You can submit your requirements on our <a href="contact.html" style="color:var(--color-primary); font-weight:600;">Commissioning Portal</a> or email <strong>directorate@icsresearch.org</strong>.`;
  } else if (topic === 'open-data') {
    userQuestion = 'Where can I download open microdata?';
    botReply = `You can browse and export district datasets directly on our <a href="data.html" style="color:var(--color-primary); font-weight:600;">Open Data Catalog</a>, including 261-district socio-economic panels and market price trackers.`;
  } else if (topic === 'methodology') {
    userQuestion = 'What sampling and quality standards do you follow?';
    botReply = `Our research follows a strict 4-stage protocol: Pre-analysis registration, audited CAPI mobile data collection with 10% supervisor back-checks, blind econometric replication, and open citable reporting. Read our full <a href="method.html" style="color:var(--color-primary); font-weight:600;">Methodology Charter</a>.`;
  } else if (topic === 'leadership') {
    userQuestion = 'Who leads ICS Research Centre?';
    botReply = `The Centre is led by Chief Executive Officer <strong>Daniel Oppong</strong> and Deputy CEO <strong>Aaron Donkor</strong>, supported by senior fellows in econometrics and health systems. View their <a href="leadership.html" style="color:var(--color-primary); font-weight:600;">Executive Profiles</a>.`;
  }

  // Append user message
  const userMsgEl = document.createElement('div');
  userMsgEl.className = 'assistant-msg';
  userMsgEl.style.background = 'var(--color-primary-light)';
  userMsgEl.style.color = 'var(--color-navy)';
  userMsgEl.style.alignSelf = 'flex-end';
  userMsgEl.style.fontWeight = '600';
  userMsgEl.innerHTML = userQuestion;
  container.appendChild(userMsgEl);

  // Append bot reply with slight delay
  setTimeout(() => {
    const botMsgEl = document.createElement('div');
    botMsgEl.className = 'assistant-msg msg-bot';
    botMsgEl.innerHTML = botReply;
    container.appendChild(botMsgEl);
    container.scrollTop = container.scrollHeight;
  }, 350);
}

/* --------------------------------------------------------------------------
   "Join the Opinion Panel" Modal & Registration (GIA Signature Feature)
   -------------------------------------------------------------------------- */
function initJoinPanelModal() {
  const openBtns = document.querySelectorAll('[data-open-panel]');
  const modal = document.getElementById('joinPanelModal');
  const closeBtn = document.getElementById('closePanelBtn');
  const form = document.getElementById('joinPanelForm');
  const panelSuccessMsg = document.getElementById('panelSuccessMsg');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = 'ICS-PANEL-' + Math.floor(100000 + Math.random() * 900000);
      form.style.display = 'none';
      if (panelSuccessMsg) {
        panelSuccessMsg.style.display = 'block';
        document.getElementById('panelCodeDisplay').textContent = code;
      }
    });
  }
}

/* --------------------------------------------------------------------------
   Newsletter / Executive Briefing Subscription
   -------------------------------------------------------------------------- */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value) {
        alert(`Thank you! ${input.value} has been subscribed to the ICS Polling & Economic Briefing Bulletin.`);
        input.value = '';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Publications Archive Filter & Live Search
   -------------------------------------------------------------------------- */
function initArchiveFilter() {
  const searchInput = document.getElementById('pubSearch');
  const typeSelect = document.getElementById('pubTypeFilter');
  const focusSelect = document.getElementById('pubFocusFilter');
  const yearSelect = document.getElementById('pubYearFilter');
  const rows = document.querySelectorAll('.pub-row[data-type]');
  const countDisplay = document.getElementById('pubResultCount');

  if (!searchInput && !typeSelect && !focusSelect && !yearSelect) return;

  function filterPublications() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedType = typeSelect ? typeSelect.value : 'all';
    const selectedFocus = focusSelect ? focusSelect.value : 'all';
    const selectedYear = yearSelect ? yearSelect.value : 'all';

    let visibleCount = 0;

    rows.forEach(row => {
      const type = row.getAttribute('data-type') || '';
      const focus = row.getAttribute('data-focus') || '';
      const year = row.getAttribute('data-year') || '';
      const text = row.innerText.toLowerCase();

      const matchesQuery = query === '' || text.includes(query);
      const matchesType = selectedType === 'all' || type === selectedType;
      const matchesFocus = selectedFocus === 'all' || focus === selectedFocus;
      const matchesYear = selectedYear === 'all' || year === selectedYear;

      if (matchesQuery && matchesType && matchesFocus && matchesYear) {
        row.style.display = 'grid';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${visibleCount} of ${rows.length} published records`;
    }
  }

  if (searchInput) searchInput.addEventListener('input', filterPublications);
  if (typeSelect) typeSelect.addEventListener('change', filterPublications);
  if (focusSelect) focusSelect.addEventListener('change', filterPublications);
  if (yearSelect) yearSelect.addEventListener('change', filterPublications);
}

/* --------------------------------------------------------------------------
   Citation Modal & Formatter
   -------------------------------------------------------------------------- */
const publicationDatabase = {
  'ICS-WP-2026-04': {
    title: 'Evaluating Subnational Fiscal Transfers and District Service Delivery in Ghana (2018–2025)',
    authors: 'Daniel Oppong, Dr. Aaron Donkor, Dr. Kwame Mensah',
    year: '2026',
    type: 'Working Paper',
    focus: 'Public Policy & Governance',
    doi: '10.5281/zenodo.ics.2026.04',
    url: 'https://icsresearch.org/publications/ICS-WP-2026-04'
  },
  'ICS-PB-2026-02': {
    title: 'Food Price Inflation Pass-Through: Micro-Evidence from 42 Market Centres Across Southern and Northern Ghana',
    authors: 'Aaron Donkor, Faustina Osei-Tutu, Daniel Oppong',
    year: '2026',
    type: 'Policy Brief',
    focus: 'Economic & Social Data',
    doi: '10.5281/zenodo.ics.2026.02',
    url: 'https://icsresearch.org/publications/ICS-PB-2026-02'
  },
  'ICS-TR-2025-11': {
    title: 'Predictive Small-Area Estimation for Health Facility Resource Allocation in the Savannah Ecological Zone',
    authors: 'Dr. Kwame Mensah, Aaron Donkor, Dr. Abena Boateng',
    year: '2025',
    type: 'Technical Report',
    focus: 'Applied Statistical Modelling',
    doi: '10.5281/zenodo.ics.2025.11',
    url: 'https://icsresearch.org/publications/ICS-TR-2025-11'
  },
  'ICS-PB-2025-08': {
    title: 'Community Health Planning and Services (CHPS) Compound Retention Dynamics: Administrative Survey Evidence',
    authors: 'Dr. Abena Boateng, Daniel Oppong',
    year: '2025',
    type: 'Policy Brief',
    focus: 'Health & Development Metrics',
    doi: '10.5281/zenodo.ics.2025.08',
    url: 'https://icsresearch.org/publications/ICS-PB-2025-08'
  },
  'ICS-DS-2025-01': {
    title: 'Ghana District Socio-Economic & Fiscal Disparities Panel Dataset (2016–2024)',
    authors: 'ICS Research Centre Data Core (Oppong, Donkor, Mensah)',
    year: '2025',
    type: 'Dataset Release',
    focus: 'Data Infrastructure & Training',
    doi: '10.5281/zenodo.ics.data.2025.01',
    url: 'https://icsresearch.org/data/ICS-DS-2025-01'
  },
  'ICS-WP-2024-09': {
    title: 'Assessing Mobile Money Transaction Taxes on Informal Retailers: A Quasi-Experimental Panel Study',
    authors: 'Daniel Oppong, Aaron Donkor',
    year: '2024',
    type: 'Working Paper',
    focus: 'Economic & Social Data',
    doi: '10.5281/zenodo.ics.2024.09',
    url: 'https://icsresearch.org/publications/ICS-WP-2024-09'
  }
};

function initCitationModal() {
  const modal = document.getElementById('citationModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const citeBtns = document.querySelectorAll('[data-cite-id]');
  const citationText = document.getElementById('citationText');
  const copyBtn = document.getElementById('copyCitationBtn');
  const formatSelect = document.getElementById('citationFormatSelect');

  if (!modal || !citeBtns.length) return;

  let currentPub = null;

  function renderCitation(pub, format) {
    if (!pub) return '';
    if (format === 'apa') {
      return `${pub.authors} (${pub.year}). ${pub.title}. *ICS Research Centre ${pub.type} Series*, ${pub.focus}. DOI: ${pub.doi}. Retrieved from ${pub.url}`;
    } else if (format === 'chicago') {
      return `${pub.authors}. "${pub.title}." ICS Research Centre ${pub.type}, Accra, Ghana (${pub.year}). https://doi.org/${pub.doi}.`;
    } else if (format === 'bibtex') {
      const key = pub.title.split(' ')[0].toLowerCase() + pub.year;
      return `@techreport{${key},
  title = {${pub.title}},
  author = {${pub.authors}},
  institution = {ICS Research Centre},
  year = {${pub.year}},
  address = {Accra, Ghana},
  type = {${pub.type}},
  url = {${pub.url}},
  doi = {${pub.doi}}
}`;
    }
    return '';
  }

  citeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pubId = btn.getAttribute('data-cite-id');
      currentPub = publicationDatabase[pubId] || {
        title: btn.closest('.pub-row')?.querySelector('h4')?.innerText || 'ICS Research Report',
        authors: 'ICS Research Centre',
        year: '2026',
        type: 'Working Paper',
        focus: 'Public Policy',
        doi: '10.5281/zenodo.ics',
        url: window.location.href
      };

      const format = formatSelect ? formatSelect.value : 'apa';
      if (citationText) {
        citationText.value = renderCitation(currentPub, format);
      }
      modal.classList.add('active');
    });
  });

  if (formatSelect) {
    formatSelect.addEventListener('change', () => {
      if (currentPub && citationText) {
        citationText.value = renderCitation(currentPub, formatSelect.value);
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  if (copyBtn && citationText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(citationText.value).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied to Clipboard!';
        setTimeout(() => {
          copyBtn.innerText = originalText;
        }, 2000);
      });
    });
  }
}

/* --------------------------------------------------------------------------
   Contact Form Validation & Submission Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('institutionalContactForm');
  const successModal = document.getElementById('contactSuccessModal');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');
  const trackingNumberSpan = document.getElementById('trackingNumberSpan');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const honeypot = document.getElementById('website_url_honeypot');
    if (honeypot && honeypot.value.trim() !== '') {
      console.warn('Bot detected via honeypot.');
      return;
    }

    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    const timestamp = Date.now().toString().slice(-4);
    const trackingCode = `ICS-ENQ-2026-${timestamp}`;

    if (trackingNumberSpan) {
      trackingNumberSpan.textContent = trackingCode;
    }

    if (successModal) {
      successModal.classList.add('active');
    }

    form.reset();
  });

  if (closeSuccessBtn && successModal) {
    closeSuccessBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });
  }
}

/* --------------------------------------------------------------------------
   Dataset Explorer & CSV Export
   -------------------------------------------------------------------------- */
const sampleData = [
  { region: 'Greater Accra', district: 'Accra Metropolitan', pop: '1,782,150', clinics: '142', healthScore: '89.4', fiscalIndex: '0.94' },
  { region: 'Ashanti', district: 'Kumasi Metropolitan', pop: '1,430,780', clinics: '118', healthScore: '84.2', fiscalIndex: '0.88' },
  { region: 'Northern', district: 'Tamale Metropolitan', pop: '374,744', clinics: '48', healthScore: '71.8', fiscalIndex: '0.62' },
  { region: 'Western', district: 'Sekondi-Takoradi', pop: '445,205', clinics: '56', healthScore: '78.5', fiscalIndex: '0.79' },
  { region: 'Eastern', district: 'New Juaben South', pop: '190,410', clinics: '34', healthScore: '81.0', fiscalIndex: '0.74' },
  { region: 'Central', district: 'Cape Coast Metropolitan', pop: '189,925', clinics: '31', healthScore: '79.2', fiscalIndex: '0.72' },
  { region: 'Upper East', district: 'Bolgatanga Municipal', pop: '144,370', clinics: '26', healthScore: '68.9', fiscalIndex: '0.55' },
  { region: 'Volta', district: 'Ho Municipal', pop: '210,340', clinics: '39', healthScore: '76.4', fiscalIndex: '0.67' }
];

function initDatasetViewer() {
  const tbody = document.getElementById('datasetTableBody');
  const exportBtn = document.getElementById('exportCsvBtn');

  if (tbody) {
    tbody.innerHTML = sampleData.map(row => `
      <tr>
        <td style="font-weight:700; color:var(--color-navy);">${row.region}</td>
        <td>${row.district}</td>
        <td style="font-family:var(--font-mono);">${row.pop}</td>
        <td style="font-family:var(--font-mono);">${row.clinics}</td>
        <td style="font-family:var(--font-mono); font-weight:600; color:var(--color-primary);">${row.healthScore}</td>
        <td style="font-family:var(--font-mono);">${row.fiscalIndex}</td>
      </tr>
    `).join('');
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const headers = ['Region', 'District', 'Population', 'Public Health Clinics', 'Service Index', 'Fiscal Transfer Ratio'];
      const csvRows = [headers.join(',')];

      sampleData.forEach(item => {
        csvRows.push([
          `"${item.region}"`,
          `"${item.district}"`,
          `"${item.pop.replace(/,/g, '')}"`,
          item.clinics,
          item.healthScore,
          item.fiscalIndex
        ].join(','));
      });

      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'ICS-Ghana-District-Indicators-2025.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}
