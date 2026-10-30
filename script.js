// CivicFix Bengaluru client interactions: mobile drawer, ticket tracking, area filter, and form submission.

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initTrackerWidget();
  initComplaintForm();
  initIssueCardPrefills();
  initMapInteractivity();
  initTableAreaFilter();
});

function initMobileNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (!menuToggle || !navLinks) return;

  function toggleMenu(expand) {
    const isExpanded = expand !== undefined ? expand : menuToggle.getAttribute('aria-expanded') === 'true';
    const newState = !isExpanded;
    
    menuToggle.setAttribute('aria-expanded', String(newState));
    navLinks.classList.toggle('nav-open', newState);

    if (newState) {
      const firstLink = navLinks.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  }

  menuToggle.addEventListener('click', () => toggleMenu());

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      toggleMenu(false);
      menuToggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (
      menuToggle.getAttribute('aria-expanded') === 'true' &&
      !navLinks.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      toggleMenu(false);
    }
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 900) {
        toggleMenu(false);
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900 && menuToggle.getAttribute('aria-expanded') === 'true') {
      toggleMenu(false);
    }
  });
}

// Sample grievance registry for Bengaluru areas (Asia/Kolkata timezone, DD/MM/YYYY dates)
const civicDatabase = {
  'BLR-2026-01': {
    id: 'BLR-2026-01',
    title: 'Indiranagar — Post-Monsoon Asphalt Pothole on 100ft Road',
    category: 'Roads & Potholes',
    department: 'City Corporation / Civic Body',
    area: 'Indiranagar',
    areaId: 'area-indiranagar',
    location: 'Near 100 Feet Road & 12th Main Cross Junction',
    date: '30/10/2026, 06:15 AM IST',
    sla: '2 Working Days (1.5 days remaining, skips state holidays)',
    officer: 'Assistant Executive Engineer (East Zone Road Div)',
    status: 'In Progress',
    statusClass: 'status-progress',
    statusPillText: 'IN PROGRESS (WITHIN WORKING-DAY SLA)',
    timeline: [
      {
        done: true,
        time: '30/10/2026, 06:15 AM IST',
        title: 'Grievance Registered via Portal',
        desc: 'Resident logged pothole with geotagged photo. Categorized under City Corporation roads mandate.',
      },
      {
        done: true,
        time: '30/10/2026, 08:30 AM IST',
        title: 'Work Order #BLR-RD-402 Assigned',
        desc: 'Assigned to Indiranagar ward maintenance unit. Cold-mix asphalt patching scheduled.',
      },
      {
        active: true,
        time: '30/10/2026, 02:00 PM IST (Scheduled)',
        title: 'Asphalt Compaction Underway',
        desc: 'Road patching roller dispatched to site.',
      },
      {
        pending: true,
        time: 'Pending Completion',
        title: 'Completion Verification & Resident Sign-Off',
        desc: 'Requires post-repair photo upload before formal ticket closure.',
      },
    ],
  },
  'BLR-2026-02': {
    id: 'BLR-2026-02',
    title: 'Koramangala — Commercial Garbage Black Spot near 5th Block',
    category: 'Garbage & Dumping',
    department: 'Solid Waste Management Agency',
    area: 'Koramangala',
    areaId: 'area-koramangala',
    location: 'Near 5th Block Public Park & 80ft Road Corner',
    date: '28/10/2026, 09:15 AM IST',
    sla: '1 Working Day (Overdue by 1 day)',
    officer: 'Zonal Sanitation Supervisor (Ward 151)',
    status: 'Escalated',
    statusClass: 'status-escalated',
    statusPillText: 'ESCALATED TO ZONAL COMMISSIONER',
    timeline: [
      {
        done: true,
        time: '28/10/2026, 09:15 AM IST',
        title: 'Grievance Registered & Tagged',
        desc: 'Resident reported persistent black spot refuse overflow blocking pedestrian walkway.',
      },
      {
        done: true,
        time: '28/10/2026, 10:00 AM IST',
        title: 'Dispatched to Solid Waste Unit',
        desc: 'Assigned to Ward 151 sanitation contractor for compact clearance.',
      },
      {
        breach: true,
        time: '29/10/2026, 10:00 AM IST • SLA BREACH',
        title: 'Mandated 1 Working Day Expired',
        desc: 'No resolution verification uploaded within required working day window.',
      },
      {
        activeEscalation: true,
        time: '29/10/2026, 10:05 AM IST',
        title: 'Escalation Notice Dispatched',
        desc: 'Notice sent to Zonal Joint Commissioner. Emergency tipper truck dispatched to 5th Block.',
      },
    ],
  },
  'BLR-2026-03': {
    id: 'BLR-2026-03',
    title: 'Malleshwaram — Streetlight Fixture Failure on 8th Cross',
    category: 'Streetlights & Electrical',
    department: 'BESCOM',
    area: 'Malleshwaram',
    areaId: 'area-malleshwaram',
    location: 'Between 8th Cross & Margosa Road, Pole #ML-08',
    date: '27/10/2026, 07:00 PM IST',
    sla: '3 Working Days (Resolved in 1 working day)',
    officer: 'BESCOM Sub-Division Engineer (Malleshwaram)',
    status: 'Resolved',
    statusClass: 'status-resolved',
    statusPillText: 'RESOLVED & VERIFIED',
    timeline: [
      {
        done: true,
        time: '27/10/2026, 07:00 PM IST',
        title: 'Complaint Registered',
        desc: 'Resident reported dark stretch across two consecutive poles on Margosa Road.',
      },
      {
        done: true,
        time: '28/10/2026, 10:00 AM IST',
        title: 'BESCOM Lineman Inspection',
        desc: 'Found damaged wire connection in junction box.',
      },
      {
        done: true,
        time: '28/10/2026, 04:30 PM IST',
        title: 'LED Fitting Replaced',
        desc: 'Repairs completed and illumination tested during evening inspection.',
      },
      {
        done: true,
        time: '29/10/2026, 09:00 AM IST',
        title: 'Resident Sign-Off Confirmed',
        desc: 'Resident confirmed repair via SMS verification prompt.',
      },
    ],
  },
  'BLR-2026-04': {
    id: 'BLR-2026-04',
    title: 'HSR Layout — BWSSB Water Main Leak Flooding 27th Main',
    category: 'Water & Sewage',
    department: 'BWSSB',
    area: 'HSR Layout',
    areaId: 'area-hsr-layout',
    location: '27th Main Road, Sector 1 (Near BDA Complex)',
    date: '30/10/2026, 07:30 AM IST',
    sla: '1 Working Day (12h Hydro Emergency)',
    officer: 'Assistant Executive Engineer (BWSSB South)',
    status: 'In Progress',
    statusClass: 'status-progress',
    statusPillText: 'BWSSB EMERGENCY CREW ON-SITE',
    timeline: [
      {
        done: true,
        time: '30/10/2026, 07:30 AM IST',
        title: 'High Priority Grievance Registered',
        desc: 'Pressurized water pipe leak flooding street. Routed to BWSSB emergency dispatch.',
      },
      {
        done: true,
        time: '30/10/2026, 08:00 AM IST',
        title: 'Sub-Division Sluice Valve Regulated',
        desc: 'Pressure throttled to prevent road foundation undermining.',
      },
      {
        active: true,
        time: '30/10/2026, 09:15 AM IST',
        title: 'Trench Excavation in Progress',
        desc: 'Hydro repair team fitting stainless-steel clamp over rupture.',
      },
    ],
  },
};

function initTrackerWidget() {
  const form = document.getElementById('trackForm');
  const ticketInput = document.getElementById('ticketInput');
  const resultArea = document.getElementById('trackerResult');
  const quickChips = document.querySelectorAll('.quick-chip');

  if (!form || !ticketInput || !resultArea) return;

  function renderTicket(ticketId) {
    const cleanId = ticketId.trim().toUpperCase();
    const data = civicDatabase[cleanId];

    if (!data) {
      resultArea.innerHTML = `
        <div class="alert alert-warning" role="alert" style="background-color: var(--danger-subtle); color: var(--danger); padding: var(--space-md); border-radius: var(--radius-xs);">
          <strong>Reference Code Not Found (${cleanId})</strong>
          <p style="font-size: var(--text-sm); margin-top: 4px;">
            Sample codes available: <code>BLR-2026-01</code>, <code>BLR-2026-02</code>, <code>BLR-2026-03</code>, or <code>BLR-2026-04</code>.
          </p>
        </div>
      `;
      return;
    }

    const timelineHtml = data.timeline
      .map((item) => {
        let stepClass = 'step-pending';
        let marker = '&#9675;';

        if (item.done) {
          stepClass = 'step-done';
          marker = '&#10003;';
        } else if (item.breach) {
          stepClass = 'step-breach';
          marker = '!';
        } else if (item.activeEscalation) {
          stepClass = 'step-active-escalation';
          marker = '&bull;';
        } else if (item.active) {
          stepClass = 'step-done';
          marker = '&#9654;';
        }

        return `
          <li class="timeline-step ${stepClass}">
            <div class="timeline-marker" aria-hidden="true">${marker}</div>
            <div class="timeline-content">
              <div class="timeline-time">${item.time}</div>
              <div class="timeline-label ${item.breach ? 'text-danger' : ''}">${item.title}</div>
              <p class="timeline-desc">${item.desc}</p>
            </div>
          </li>
        `;
      })
      .join('');

    resultArea.innerHTML = `
      <div class="ticket-status-summary">
        <div class="status-badge-row">
          <span class="status-pill ${data.statusClass}" id="ticketStatusPill">
            ${data.statusPillText}
          </span>
          <span class="ticket-id-tag" id="ticketRefDisplay">${data.id}</span>
        </div>
        <h4 class="ticket-title-display" id="ticketTitleDisplay">${data.title}</h4>
        <div class="ticket-meta-grid">
          <div>
            <span class="meta-label">Area:</span>
            <strong class="meta-val">${data.location}</strong>
          </div>
          <div>
            <span class="meta-label">Reported (IST):</span>
            <strong class="meta-val">${data.date}</strong>
          </div>
          <div>
            <span class="meta-label">Mandated SLA:</span>
            <strong class="meta-val">${data.sla}</strong>
          </div>
          <div>
            <span class="meta-label">Authority:</span>
            <strong class="meta-val">${data.department} &bull; ${data.officer}</strong>
          </div>
        </div>
      </div>

      <div class="timeline-wrapper">
        <h5 class="timeline-heading">Working-Day Audit Timeline (Skips State Holidays)</h5>
        <ol class="status-timeline">
          ${timelineHtml}
        </ol>
      </div>
    `;

    highlightAreaOnMap(data.areaId);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    renderTicket(ticketInput.value);
  });

  quickChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const sample = chip.getAttribute('data-sample');
      if (sample) {
        ticketInput.value = sample;
        renderTicket(sample);
      }
    });
  });
}

function highlightAreaOnMap(areaId) {
  if (!areaId) return;

  const areas = document.querySelectorAll('.area-boundary');
  areas.forEach((a) => {
    if (a.id === areaId) {
      a.classList.add('area-highlighted');
    } else {
      a.classList.remove('area-highlighted');
    }
  });
}

function initMapInteractivity() {
  const mapPins = document.querySelectorAll('.map-pin');
  const ticketInput = document.getElementById('ticketInput');
  const trackForm = document.getElementById('trackForm');

  mapPins.forEach((pin) => {
    const handlePinClick = () => {
      const pinLabel = pin.getAttribute('aria-label') || '';
      const match = pinLabel.match(/BLR-\d{4}-\d+/);
      if (match && ticketInput && trackForm) {
        ticketInput.value = match[0];
        trackForm.dispatchEvent(new Event('submit', { cancelable: true }));
        
        if (window.innerWidth < 992) {
          const trackerWidget = document.getElementById('trackerWidget');
          if (trackerWidget) {
            trackerWidget.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };

    pin.addEventListener('click', handlePinClick);
    pin.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePinClick();
      }
    });
  });
}

function initTableAreaFilter() {
  const filterSelect = document.getElementById('tableAreaFilter');
  const table = document.getElementById('areasTable');

  if (!filterSelect || !table) return;

  filterSelect.addEventListener('change', () => {
    const chosen = filterSelect.value;
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach((row) => {
      const area = row.getAttribute('data-area');
      if (chosen === 'all' || area === chosen) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

function initComplaintForm() {
  const form = document.getElementById('civicReportForm');
  const descTextarea = document.getElementById('issueDescription');
  const charCountDisplay = document.getElementById('charCount');
  const successAlert = document.getElementById('formSuccessAlert');
  const newRefCode = document.getElementById('newRefCode');
  const submitBtn = document.getElementById('submitComplaintBtn');

  if (!form) return;

  if (descTextarea && charCountDisplay) {
    descTextarea.addEventListener('input', () => {
      const len = descTextarea.value.length;
      charCountDisplay.textContent = `${len} / 500 characters`;
      charCountDisplay.style.color = len > 500 ? 'var(--danger)' : 'var(--text-muted)';
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const randomTicketNum = Math.floor(10 + Math.random() * 89);
    const generatedId = `BLR-2026-${randomTicketNum}`;

    const formData = new FormData(form);
    const category = formData.get('issueCategory') || 'potholes';
    const area = formData.get('area') || 'Indiranagar';
    const street = formData.get('streetAddress') || 'Reported Landmark';
    const name = formData.get('citizenName') || 'Citizen';

    const deptMap = {
      potholes: 'City Corporation / Civic Body',
      garbage: 'Solid Waste Management Agency',
      streetlights: 'BESCOM',
      water: 'BWSSB',
    };

    const slaMap = {
      potholes: '2 Working Days',
      garbage: '1 Working Day',
      streetlights: '3 Working Days',
      water: '1 Working Day (12h Leak)',
    };

    const categoryTitles = {
      potholes: 'Roads & Potholes',
      garbage: 'Garbage & Waste Black Spot',
      streetlights: 'Streetlights & BESCOM Fault',
      water: 'BWSSB Water Main Leak / UGD',
    };

    const areaIdMap = {
      'Indiranagar': 'area-indiranagar',
      'Koramangala': 'area-koramangala',
      'Jayanagar': 'area-jayanagar',
      'Whitefield': 'area-whitefield',
      'Malleshwaram': 'area-malleshwaram',
      'HSR Layout': 'area-hsr-layout',
      'Yelahanka': 'area-yelahanka',
      'Electronic City': 'area-electronic-city',
    };

    civicDatabase[generatedId] = {
      id: generatedId,
      title: `${area} — ${categoryTitles[category] || 'Civic Issue'}`,
      category: categoryTitles[category],
      department: deptMap[category],
      area: area,
      areaId: areaIdMap[area] || 'area-indiranagar',
      location: `${area} (${street})`,
      date: 'Today, 10:30 AM IST (30/10/2026)',
      sla: `${slaMap[category]} (Working-day clock active, skips state holidays)`,
      officer: `Assigned to ${deptMap[category]} local ward sub-division`,
      status: 'In Progress',
      statusClass: 'status-progress',
      statusPillText: 'LODGED & ACTIVE IN WORKING DAYS',
      timeline: [
        {
          done: true,
          time: 'Just now (IST)',
          title: 'Grievance Registered via Citizen Portal',
          desc: `Logged by resident ${name}. Local ward reference generated.`,
        },
        {
          active: true,
          time: 'Within 2 hours',
          title: `Dispatched to ${deptMap[category]} Field Engineer`,
          desc: `SLA timer initialized for ${slaMap[category]}. Skips Karnataka holidays.`,
        },
        {
          pending: true,
          time: `Target: within ${slaMap[category]}`,
          title: 'Field Verification or Zonal Escalation',
          desc: 'Automatic escalation to Zonal Commissioner if resolution window lapses.',
        },
      ],
    };

    if (newRefCode) newRefCode.textContent = generatedId;
    if (successAlert) {
      successAlert.hidden = false;
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    const ticketInput = document.getElementById('ticketInput');
    if (ticketInput) {
      ticketInput.value = generatedId;
    }

    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>&#10003; Logged (${generatedId})</span>`;
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 3500);
    }

    form.reset();
    if (charCountDisplay) charCountDisplay.textContent = '0 / 500 characters';
  });
}

function initIssueCardPrefills() {
  const prefillButtons = document.querySelectorAll('.select-issue-btn');
  const form = document.getElementById('civicReportForm');

  prefillButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-prefill');
      if (category && form) {
        const radio = form.querySelector(`input[name="issueCategory"][value="${category}"]`);
        if (radio) {
          radio.checked = true;
          form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}
