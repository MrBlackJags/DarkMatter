/**
 * DARKMATTER - Main Application Controller
 * Handles Navigation, State, Dynamic Filtering, Modals, Citizen Science, and LocalStorage
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    currentCategory: 'all',
    currentLevel: 'all',
    searchQuery: '',
    bookmarks: JSON.parse(localStorage.getItem('darkmatter_bookmarks') || '[]'),
    upvotedPapers: JSON.parse(localStorage.getItem('darkmatter_upvotes') || '{}'),
    communityPapers: JSON.parse(localStorage.getItem('darkmatter_community_papers') || 'null') || [...DEFAULT_COMMUNITY_SUBMISSIONS],
    allPapers: [],
    activeModalPaper: null,
    quizIndex: 0,
    quizScore: 0,
    visualizer: null,
    charts: null
  };

  // Combine curated + community papers
  state.allPapers = [...SPACE_RESEARCH_DATA.papers];

  // Initialize Engines
  try {
    if (typeof CosmicVisualizer !== 'undefined') {
      state.visualizer = new CosmicVisualizer('cosmic-canvas');
    }
  } catch (e) {
    console.error('Visualizer init error:', e);
  }

  try {
    if (typeof SpaceDataCharts !== 'undefined') {
      state.charts = new SpaceDataCharts();
      state.charts.initRotationCurveChart('rotation-chart');
      state.charts.initTransitPhotometryChart('transit-chart');
      state.charts.initCMBPowerChart('cmb-chart');
    }
  } catch (e) {
    console.error('Charts init error:', e);
  }

  // DOM Elements
  const papersGrid = document.getElementById('papers-grid');
  const communityGrid = document.getElementById('community-grid');
  const neoTableBody = document.getElementById('neo-table-body');
  const missionsGrid = document.getElementById('missions-grid');
  const searchInput = document.getElementById('global-search');
  const paperModal = document.getElementById('paper-modal');
  const submitModal = document.getElementById('submit-modal');
  const bookmarksDrawer = document.getElementById('bookmarks-drawer');
  const toastContainer = document.getElementById('toast-container');

  // --- RENDERING FUNCTIONS ---

  function renderPapers() {
    if (!papersGrid) return;

    let filtered = state.allPapers.filter(paper => {
      const matchesCategory = state.currentCategory === 'all' || 
        paper.domainKey === state.currentCategory || 
        paper.category.toLowerCase().includes(state.currentCategory.toLowerCase());

      const matchesLevel = state.currentLevel === 'all' || 
        paper.readingLevel.toLowerCase() === state.currentLevel.toLowerCase();

      const query = state.searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        paper.title.toLowerCase().includes(query) ||
        paper.abstract.toLowerCase().includes(query) ||
        paper.authors.some(a => a.toLowerCase().includes(query)) ||
        paper.tags.some(t => t.toLowerCase().includes(query));

      return matchesCategory && matchesLevel && matchesSearch;
    });

    if (filtered.length === 0) {
      papersGrid.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-slate-400 mb-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <h4 class="text-lg font-medium text-slate-200">No scientific papers found</h4>
          <p class="text-sm mt-1">Try adjusting your search query, reading level, or research domain filters.</p>
          <button id="reset-filters-btn" class="mt-4 px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/50 transition">
            Reset Filters
          </button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.currentCategory = 'all';
          state.currentLevel = 'all';
          state.searchQuery = '';
          if (searchInput) searchInput.value = '';
          document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          const defaultBtn = document.querySelector('.filter-btn[data-category="all"]');
          if (defaultBtn) defaultBtn.classList.add('active');
          renderPapers();
        });
      }
      return;
    }

    papersGrid.innerHTML = filtered.map(paper => {
      const isBookmarked = state.bookmarks.includes(paper.id);
      const isUpvoted = !!state.upvotedPapers[paper.id];
      const upvoteCount = paper.upvotes + (isUpvoted ? 1 : 0);

      return `
        <article class="paper-card glass-panel group flex flex-col justify-between" data-id="${paper.id}">
          <div>
            <div class="flex items-center justify-between text-xs mb-3">
              <span class="category-badge ${getCategoryColorClass(paper.domainKey)}">
                ${paper.category}
              </span>
              <span class="level-badge ${getLevelColorClass(paper.readingLevel)}">
                ${paper.readingLevel}
              </span>
            </div>

            <h3 class="paper-title text-base font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors leading-snug">
              ${paper.title}
            </h3>

            <p class="text-xs text-slate-400 mt-2 line-clamp-1 font-mono">
              ${paper.authors.join(', ')} • <span class="text-slate-500">${paper.institution}</span>
            </p>

            <p class="text-xs text-slate-300 mt-3 line-clamp-3 leading-relaxed">
              ${paper.abstract}
            </p>

            <div class="flex flex-wrap gap-1.5 mt-4">
              ${paper.tags.map(t => `<span class="tag-pill">#${t}</span>`).join('')}
            </div>
          </div>

          <div class="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <div class="flex items-center space-x-3">
              <span title="Citations" class="flex items-center space-x-1">
                <svg class="w-3.5 h-3.5 text-slate-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <span>${paper.citations} cites</span>
              </span>
              <span class="text-slate-600">•</span>
              <span>${paper.readTime}</span>
            </div>

            <div class="flex items-center space-x-2">
              <button class="upvote-btn flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition ${isUpvoted ? 'text-amber-400 font-bold' : 'text-slate-300'}" data-id="${paper.id}">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
                <span>${upvoteCount}</span>
              </button>

              <button class="bookmark-btn p-1.5 rounded hover:bg-slate-800 transition ${isBookmarked ? 'text-cyan-400' : 'text-slate-400'}" data-id="${paper.id}" title="${isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}">
                <svg class="w-4 h-4" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
              </button>

              <button class="view-paper-btn px-3 py-1 bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/30 rounded font-medium transition" data-id="${paper.id}">
                Read Brief
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach button listeners
    papersGrid.querySelectorAll('.view-paper-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openPaperModal(id);
      });
    });

    papersGrid.querySelectorAll('.upvote-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        toggleUpvote(id);
      });
    });

    papersGrid.querySelectorAll('.bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        toggleBookmark(id);
      });
    });
  }

  function renderCommunityPapers() {
    if (!communityGrid) return;

    if (state.communityPapers.length === 0) {
      communityGrid.innerHTML = `
        <div class="col-span-full py-10 text-center text-slate-400">
          No community submissions yet. Be the first to share your research or observation logs!
        </div>
      `;
      return;
    }

    communityGrid.innerHTML = state.communityPapers.map(paper => {
      return `
        <div class="glass-panel p-5 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs mb-2">
              <span class="text-cyan-400 font-mono">${paper.category}</span>
              <span class="text-slate-500">${paper.date}</span>
            </div>
            <h4 class="text-slate-100 font-semibold text-sm line-clamp-2">${paper.title}</h4>
            <p class="text-xs text-slate-400 mt-1">Submitted by <strong class="text-slate-300">${paper.author}</strong> (${paper.affiliation})</p>
            <p class="text-xs text-slate-300 mt-3 line-clamp-3 leading-relaxed">${paper.abstract}</p>
            <div class="flex flex-wrap gap-1 mt-3">
              ${paper.tags.map(t => `<span class="tag-pill text-[10px]">#${t}</span>`).join('')}
            </div>
          </div>
          <div class="pt-3 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span class="text-emerald-400 flex items-center space-x-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Peer-Review Open</span>
            </span>
            <span class="font-mono text-slate-300">★ ${paper.upvotes} endorsements</span>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderNearEarthObjects() {
    if (!neoTableBody) return;
    const neos = SPACE_RESEARCH_DATA.datasets.nearEarthObjects;

    neoTableBody.innerHTML = neos.map(neo => {
      const hazardBadge = neo.potentialHazard 
        ? `<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">POTENTIALLY HAZARDOUS</span>`
        : `<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">MONITORED SECURE</span>`;

      return `
        <tr class="hover:bg-slate-800/40 transition">
          <td class="px-4 py-3 font-mono font-medium text-slate-200">
            ${neo.designation}
            <div class="text-[11px] text-slate-500 font-sans">${neo.orbitType} family • ${neo.spectralType}</div>
          </td>
          <td class="px-4 py-3 font-mono text-slate-300">${neo.diameterMeters} m</td>
          <td class="px-4 py-3 font-mono text-slate-300">${(neo.velocityKmh).toLocaleString()} km/h</td>
          <td class="px-4 py-3 font-mono text-cyan-400">${neo.missDistanceLunarDistance} LD <span class="text-slate-500 text-[10px]">(${(neo.missDistanceLunarDistance * 384400).toLocaleString()} km)</span></td>
          <td class="px-4 py-3 font-mono text-slate-400 text-xs">${neo.closeApproachDate}</td>
          <td class="px-4 py-3">${hazardBadge}</td>
        </tr>
      `;
    }).join('');
  }

  function renderMissions() {
    if (!missionsGrid) return;
    const missions = SPACE_RESEARCH_DATA.missions;

    missionsGrid.innerHTML = missions.map(m => {
      return `
        <div class="glass-panel p-5 relative overflow-hidden group">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">${m.agency}</span>
            <span class="px-2 py-0.5 text-[10px] font-semibold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">${m.status}</span>
          </div>
          <h4 class="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition">${m.name}</h4>
          <p class="text-xs text-slate-400 mt-1 font-mono">Orbit: ${m.orbit} • Aperture: ${m.mirrorDiameter}</p>
          <div class="my-3 p-2.5 rounded bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong class="text-slate-200">Science Mandate:</strong> ${m.primaryFocus}
          </div>
          <p class="text-xs text-slate-400 italic">"${m.highlight}"</p>
        </div>
      `;
    }).join('');
  }

  // --- MODAL & PAPER DETAILS ---

  function openPaperModal(paperId) {
    const paper = state.allPapers.find(p => p.id === paperId);
    if (!paper || !paperModal) return;

    state.activeModalPaper = paper;

    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalAuthors = document.getElementById('modal-authors');
    const modalDoi = document.getElementById('modal-doi');
    const modalAbstract = document.getElementById('modal-abstract');
    const modalFindings = document.getElementById('modal-findings');
    const modalEquations = document.getElementById('modal-equations');
    const modalDataAction = document.getElementById('modal-data-action');

    if (modalTitle) modalTitle.textContent = paper.title;
    if (modalCategory) modalCategory.textContent = `${paper.category} • ${paper.readingLevel}`;
    if (modalAuthors) modalAuthors.textContent = `${paper.authors.join(', ')} — ${paper.institution}`;
    if (modalDoi) modalDoi.textContent = `DOI: ${paper.doi} | ${paper.arxiv} | Published ${paper.date}`;
    if (modalAbstract) modalAbstract.textContent = paper.abstract;

    if (modalFindings) {
      modalFindings.innerHTML = paper.keyFindings.map(f => `
        <li class="flex items-start space-x-2">
          <span class="text-cyan-400 mt-0.5">▹</span>
          <span>${f}</span>
        </li>
      `).join('');
    }

    if (modalEquations) {
      if (paper.equations && paper.equations.length > 0) {
        modalEquations.innerHTML = paper.equations.map(eq => `
          <div class="p-3 bg-slate-900/90 rounded-lg border border-slate-800 font-mono text-xs">
            <div class="text-slate-400 mb-1 font-sans text-[11px] font-semibold">${eq.label}</div>
            <div class="text-cyan-300 text-sm overflow-x-auto py-1">${eq.formula}</div>
          </div>
        `).join('');
        modalEquations.parentElement.classList.remove('hidden');
      } else {
        modalEquations.parentElement.classList.add('hidden');
      }
    }

    if (modalDataAction) {
      modalDataAction.onclick = () => {
        closePaperModal();
        scrollToSection('data-lab');
        showToast(`Jumped to corresponding dataset for: ${paper.title.substring(0, 30)}...`);
      };
    }

    paperModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closePaperModal() {
    if (!paperModal) return;
    paperModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // --- INTERACTION LOGIC (Bookmarks, Upvotes, Submissions) ---

  function toggleBookmark(paperId) {
    const idx = state.bookmarks.indexOf(paperId);
    if (idx > -1) {
      state.bookmarks.splice(idx, 1);
      showToast('Paper removed from bookmarks');
    } else {
      state.bookmarks.push(paperId);
      showToast('Paper saved to reading bookmarks!');
    }
    localStorage.setItem('darkmatter_bookmarks', JSON.stringify(state.bookmarks));
    updateBookmarkBadge();
    renderPapers();
    renderBookmarksList();
  }

  function toggleUpvote(paperId) {
    if (state.upvotedPapers[paperId]) {
      delete state.upvotedPapers[paperId];
      showToast('Upvote removed');
    } else {
      state.upvotedPapers[paperId] = true;
      showToast('Scientific paper upvoted!');
    }
    localStorage.setItem('darkmatter_upvotes', JSON.stringify(state.upvotedPapers));
    renderPapers();
  }

  function updateBookmarkBadge() {
    const badge = document.getElementById('bookmark-count-badge');
    if (badge) {
      badge.textContent = state.bookmarks.length;
      badge.style.display = state.bookmarks.length > 0 ? 'inline-flex' : 'none';
    }
  }

  function renderBookmarksList() {
    const container = document.getElementById('bookmarks-list');
    if (!container) return;

    const bookmarked = state.allPapers.filter(p => state.bookmarks.includes(p.id));

    if (bookmarked.length === 0) {
      container.innerHTML = `
        <div class="py-12 text-center text-slate-400 text-xs">
          No saved papers yet. Click the bookmark icon on any paper to save it here for quick access.
        </div>
      `;
      return;
    }

    container.innerHTML = bookmarked.map(p => `
      <div class="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
        <h5 class="font-semibold text-slate-200">${p.title}</h5>
        <div class="flex items-center justify-between mt-2">
          <span class="text-cyan-400 font-mono text-[11px]">${p.category}</span>
          <button class="text-rose-400 hover:text-rose-300 remove-bm-btn" data-id="${p.id}">Remove</button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.remove-bm-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        toggleBookmark(btn.getAttribute('data-id'));
      });
    });
  }

  // --- CITIZEN SCIENCE GALAXY QUIZ ---

  function initCitizenScienceQuiz() {
    const quizContainer = document.getElementById('galaxy-quiz-card');
    if (!quizContainer) return;

    const samples = SPACE_RESEARCH_DATA.galaxyClassificationSamples;
    const current = samples[state.quizIndex];

    quizContainer.innerHTML = `
      <div class="mb-4">
        <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span class="font-mono text-cyan-400 font-semibold">SUBJECT #${current.id.toUpperCase()}: ${current.name}</span>
          <span>Sample ${state.quizIndex + 1} of ${samples.length} | Score: <strong class="text-emerald-400">${state.quizScore}</strong></span>
        </div>
        <div class="h-44 w-full rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none"></div>
          <svg class="w-16 h-16 text-cyan-400/80 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" stroke-width="1.5" stroke-dasharray="3 3"></circle>
            <circle cx="12" cy="12" r="4" stroke-width="2"></circle>
            <path stroke-linecap="round" stroke-width="1.5" d="M12 3v3m0 12v3m9-9h-3M6 12H3"></path>
          </svg>
          <div class="text-xs text-slate-300 font-mono italic">Morphological Sensor Analysis:</div>
          <div class="text-sm font-semibold text-slate-100 mt-1 max-w-md">"${current.imageDescription}"</div>
        </div>
      </div>

      <div class="space-y-2" id="quiz-options-container">
        ${current.options.map(opt => `
          <button class="quiz-option-btn w-full text-left px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 text-xs text-slate-200 transition font-mono flex items-center justify-between" data-answer="${opt}">
            <span>${opt}</span>
            <span class="arrow text-slate-500">→</span>
          </button>
        `).join('')}
      </div>

      <div id="quiz-feedback" class="mt-4 hidden p-3 rounded-lg text-xs leading-relaxed"></div>
    `;

    quizContainer.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        handleQuizAnswer(btn.getAttribute('data-answer'), current);
      });
    });
  }

  function handleQuizAnswer(selected, sample) {
    const feedback = document.getElementById('quiz-feedback');
    const optionsContainer = document.getElementById('quiz-options-container');
    if (!feedback || !optionsContainer) return;

    optionsContainer.querySelectorAll('button').forEach(b => b.disabled = true);

    const isCorrect = selected === sample.correctType;
    if (isCorrect) {
      state.quizScore++;
      feedback.className = 'mt-4 p-3 rounded-lg text-xs leading-relaxed bg-emerald-500/10 border border-emerald-500/30 text-emerald-300';
      feedback.innerHTML = `
        <strong class="font-bold">✓ Accurate Classification!</strong>
        <p class="mt-1">${sample.details}</p>
        <button id="next-quiz-btn" class="mt-3 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-sans font-semibold text-xs transition">
          Next Astronomical Subject →
        </button>
      `;
    } else {
      feedback.className = 'mt-4 p-3 rounded-lg text-xs leading-relaxed bg-rose-500/10 border border-rose-500/30 text-rose-300';
      feedback.innerHTML = `
        <strong class="font-bold">✕ Classification Discrepancy.</strong> Correct classification: <span class="underline">${sample.correctType}</span>.
        <p class="mt-1">${sample.details}</p>
        <button id="next-quiz-btn" class="mt-3 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded font-sans font-semibold text-xs transition">
          Proceed to Next Subject →
        </button>
      `;
    }

    feedback.classList.remove('hidden');

    const nextBtn = document.getElementById('next-quiz-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        state.quizIndex = (state.quizIndex + 1) % SPACE_RESEARCH_DATA.galaxyClassificationSamples.length;
        initCitizenScienceQuiz();
      });
    }
  }

  // --- CALCULATORS BINDINGS ---

  function initCalculatorBindings() {
    // 1. Redshift
    const zInput = document.getElementById('calc-z-input');
    const zResultV = document.getElementById('calc-z-velocity');
    const zResultDist = document.getElementById('calc-z-dist');
    const zResultTime = document.getElementById('calc-z-time');

    if (zInput) {
      const updateZ = () => {
        const res = AstroCalculators.calcRedshift(zInput.value);
        if (res) {
          if (zResultV) zResultV.textContent = `${res.velocityKms} km/s (${res.beta})`;
          if (zResultDist) zResultDist.textContent = `${res.distanceGly} Gly (${res.distanceMpc} Mpc)`;
          if (zResultTime) zResultTime.textContent = `${res.lookbackGyr} Billion Years`;
        }
      };
      zInput.addEventListener('input', updateZ);
      updateZ();
    }

    // 2. Schwarzschild
    const bhMassInput = document.getElementById('calc-bh-mass');
    const bhUnitSelect = document.getElementById('calc-bh-unit');
    const bhRadiusRes = document.getElementById('calc-bh-radius');
    const bhPhotonRes = document.getElementById('calc-bh-photon');
    const bhTempRes = document.getElementById('calc-bh-temp');

    const updateBH = () => {
      if (!bhMassInput || !bhUnitSelect) return;
      const res = AstroCalculators.calcSchwarzschild(bhMassInput.value, bhUnitSelect.value);
      if (res) {
        if (bhRadiusRes) bhRadiusRes.textContent = res.radiusKm;
        if (bhPhotonRes) bhPhotonRes.textContent = res.photonSphereKm;
        if (bhTempRes) bhTempRes.textContent = res.hawkingTempKelvin;
      }
    };

    if (bhMassInput && bhUnitSelect) {
      bhMassInput.addEventListener('input', updateBH);
      bhUnitSelect.addEventListener('change', updateBH);
      updateBH();
    }

    // 3. Exoplanet Habitability
    const exoStarTemp = document.getElementById('calc-exo-startemp');
    const exoStarRad = document.getElementById('calc-exo-starrad');
    const exoDistAU = document.getElementById('calc-exo-dist');
    const exoTempRes = document.getElementById('calc-exo-temp');
    const exoVerdictRes = document.getElementById('calc-exo-verdict');

    const updateExo = () => {
      if (!exoStarTemp || !exoStarRad || !exoDistAU) return;
      const res = AstroCalculators.calcExoplanetTemp(exoStarTemp.value, exoStarRad.value, exoDistAU.value);
      if (res) {
        if (exoTempRes) exoTempRes.textContent = `${res.tempKelvin} K (${res.tempCelsius} °C)`;
        if (exoVerdictRes) {
          exoVerdictRes.textContent = res.habitabilityVerdict;
          exoVerdictRes.style.color = res.verdictColor;
        }
      }
    };

    if (exoStarTemp && exoStarRad && exoDistAU) {
      exoStarTemp.addEventListener('input', updateExo);
      exoStarRad.addEventListener('input', updateExo);
      exoDistAU.addEventListener('input', updateExo);
      updateExo();
    }
  }

  // --- DATA LAB SLIDERS BINDING ---

  function initDataLabSliders() {
    // Dark matter fraction slider
    const dmSlider = document.getElementById('dm-fraction-slider');
    const dmValLabel = document.getElementById('dm-fraction-val');
    if (dmSlider && dmValLabel) {
      dmSlider.addEventListener('input', () => {
        const val = parseFloat(dmSlider.value);
        dmValLabel.textContent = `${Math.round(val * 100)}%`;
        if (state.charts) {
          state.charts.updateRotationDarkMatterFraction(val);
        }
      });
    }

    // Transit depth slider
    const transitSlider = document.getElementById('transit-depth-slider');
    const transitValLabel = document.getElementById('transit-depth-val');
    if (transitSlider && transitValLabel) {
      transitSlider.addEventListener('input', () => {
        const val = parseFloat(transitSlider.value);
        transitValLabel.textContent = `${val.toFixed(2)}%`;
        if (state.charts) {
          state.charts.updateTransitParameters(val);
        }
      });
    }
  }

  // --- VISUALIZER CONTROLS ---

  function initVisualizerControls() {
    const modeBtns = document.querySelectorAll('.sim-mode-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-mode');
        if (state.visualizer) state.visualizer.setMode(mode);
      });
    });

    const dmToggle = document.getElementById('sim-dm-toggle');
    if (dmToggle) {
      dmToggle.addEventListener('change', (e) => {
        if (state.visualizer) state.visualizer.setDarkMatter(e.target.checked);
      });
    }

    const particleSlider = document.getElementById('sim-particle-slider');
    if (particleSlider) {
      particleSlider.addEventListener('input', (e) => {
        if (state.visualizer) state.visualizer.setParticleCount(e.target.value);
      });
    }

    const pauseBtn = document.getElementById('sim-pause-btn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        if (state.visualizer) {
          state.visualizer.togglePlay();
          pauseBtn.textContent = state.visualizer.isRunning ? 'Pause' : 'Resume';
        }
      });
    }

    const resetBtn = document.getElementById('sim-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (state.visualizer) state.visualizer.initParticles();
      });
    }
  }

  // --- TOAST NOTIFICATIONS ---

  function showToast(msg) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast-bubble glass-panel px-4 py-2.5 rounded-lg text-xs font-mono text-cyan-200 border border-cyan-500/40 shadow-xl flex items-center space-x-2 transition-all duration-300';
    toast.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
      <span>${msg}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --- HELPERS ---

  function getCategoryColorClass(key) {
    switch (key) {
      case 'cosmology': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'exoplanets': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'gravitational': return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'planetary': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default: return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
    }
  }

  function getLevelColorClass(level) {
    switch (level.toLowerCase()) {
      case 'general science': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'undergraduate': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'advanced': return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
      default: return 'bg-slate-800 text-slate-400';
    }
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // --- EVENT LISTENERS INITIALIZATION ---

  // Search input with debounce
  if (searchInput) {
    let searchDebounce;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        state.searchQuery = e.target.value;
        renderPapers();
      }, 180);
    });
  }

  // Filter Buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCategory = btn.getAttribute('data-category') || 'all';
      renderPapers();
    });
  });

  // Level selector
  const levelSelect = document.getElementById('level-select');
  if (levelSelect) {
    levelSelect.addEventListener('change', (e) => {
      state.currentLevel = e.target.value;
      renderPapers();
    });
  }

  // Modal Closers
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      closePaperModal();
      if (submitModal) submitModal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });

  if (paperModal) {
    paperModal.addEventListener('click', (e) => {
      if (e.target === paperModal) closePaperModal();
    });
  }

  // Bookmarks Drawer Toggle
  const openBookmarksBtn = document.getElementById('open-bookmarks-btn');
  const closeBookmarksBtn = document.getElementById('close-bookmarks-btn');

  if (openBookmarksBtn && bookmarksDrawer) {
    openBookmarksBtn.addEventListener('click', () => {
      bookmarksDrawer.classList.toggle('translate-x-full');
      renderBookmarksList();
    });
  }

  if (closeBookmarksBtn && bookmarksDrawer) {
    closeBookmarksBtn.addEventListener('click', () => {
      bookmarksDrawer.classList.add('translate-x-full');
    });
  }

  // Submit Paper / Observation Modal
  const openSubmitBtn = document.getElementById('open-submit-modal-btn');
  if (openSubmitBtn && submitModal) {
    openSubmitBtn.addEventListener('click', () => {
      submitModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  }

  const submitForm = document.getElementById('submit-research-form');
  if (submitForm) {
    submitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('sub-title').value.trim();
      const author = document.getElementById('sub-author').value.trim();
      const affiliation = document.getElementById('sub-affiliation').value.trim() || 'Independent Citizen Scientist';
      const category = document.getElementById('sub-category').value;
      const abstract = document.getElementById('sub-abstract').value.trim();
      const tags = document.getElementById('sub-tags').value.split(',').map(t => t.trim()).filter(Boolean);

      if (!title || !author || !abstract) {
        showToast('Please fill out all required fields');
        return;
      }

      const newPaper = {
        id: `comm-${Date.now()}`,
        title,
        author,
        affiliation,
        category,
        abstract,
        tags: tags.length ? tags : ['Space Research', 'Observation'],
        date: new Date().toISOString().split('T')[0],
        upvotes: 1,
        timestamp: Date.now()
      };

      state.communityPapers.unshift(newPaper);
      localStorage.setItem('darkmatter_community_papers', JSON.stringify(state.communityPapers));

      submitForm.reset();
      if (submitModal) submitModal.classList.add('hidden');
      document.body.style.overflow = '';

      renderCommunityPapers();
      showToast('Research Log successfully submitted to the community stream!');
      scrollToSection('community-hub');
    });
  }

  // Execute initial renders
  renderPapers();
  renderCommunityPapers();
  renderNearEarthObjects();
  renderMissions();
  initCitizenScienceQuiz();
  initCalculatorBindings();
  initDataLabSliders();
  initVisualizerControls();
  updateBookmarkBadge();
});
