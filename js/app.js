(() => {
  const STORAGE_KEY = "rosaire-progress-v1";
  const SERIES_ORDER = ["joyful", "sorrowful", "glorious", "luminous"];
  const DAY_NAMES = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];
  const MONTH_NAMES = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const todayMysteryKey = mysteryKeyForDay(new Date().getDay());

  let todaySelectedSeries = todayMysteryKey;
  let prayerState = loadProgress() || { mysteryKey: todayMysteryKey, stepIndex: 0 };

  let rosaryLayout = null;
  let currentSequence = null;

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !MYSTERIES[data.mysteryKey]) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prayerState));
    } catch (e) {
      /* stockage indisponible, on continue sans persistance */
    }
  }

  // --- Navigation par onglets ------------------------------------------
  function showTab(tabName) {
    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.hidden = panel.dataset.tabPanel !== tabName;
    });
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tabName);
    });
    document.getElementById("app").scrollTop = 0;
    if (tabName === "pray") {
      renderPrayStep();
    }
  }

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => showTab(btn.dataset.tab));
  });

  // --- Onglet "Aujourd'hui" ---------------------------------------------
  function formatToday() {
    const d = new Date();
    return `${DAY_NAMES[d.getDay()]} ${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
  }

  function renderSeriesPicker() {
    const el = document.getElementById("today-series-picker");
    el.innerHTML = "";
    SERIES_ORDER.forEach((key) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "series-btn";
      btn.textContent = MYSTERIES[key].title.replace("Mystères ", "");
      btn.classList.toggle("active", key === todaySelectedSeries);
      if (key === todayMysteryKey) btn.classList.add("is-today");
      btn.addEventListener("click", () => {
        todaySelectedSeries = key;
        renderTodayTab();
      });
      el.appendChild(btn);
    });
  }

  function renderTodayTab() {
    document.getElementById("today-date").textContent = formatToday();

    const series = MYSTERIES[todaySelectedSeries];
    const heading =
      todaySelectedSeries === todayMysteryKey
        ? `Aujourd'hui : ${series.title}`
        : series.title;
    document.getElementById("today-series-title").textContent = heading;

    renderSeriesPicker();

    const list = document.getElementById("today-mystery-list");
    list.innerHTML = "";
    series.items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "mystery-item";
      li.innerHTML = `
        <h3>${item.title}</h3>
        <p class="mystery-ref">${item.reference} &middot; Fruit : ${item.fruit}</p>
        <p class="mystery-meditation">${item.meditation}</p>
      `;
      list.appendChild(li);
    });
  }

  document.getElementById("start-rosary-btn").addEventListener("click", () => {
    prayerState = { mysteryKey: todaySelectedSeries, stepIndex: 0 };
    saveProgress();
    showTab("pray");
  });

  // --- Onglet "Prier" -----------------------------------------------------
  function ensureSequence() {
    if (!currentSequence || currentSequence.mysteryKey !== prayerState.mysteryKey) {
      currentSequence = ROSARY.buildSequence(prayerState.mysteryKey);
      currentSequence.mysteryKey = prayerState.mysteryKey;
    }
    return currentSequence;
  }

  function renderPrayStep() {
    if (!rosaryLayout) {
      rosaryLayout = ROSARY.buildLayout();
      ROSARY.renderSVG(document.getElementById("rosary-svg"), rosaryLayout);
    }
    const seq = ensureSequence();
    const step = seq[prayerState.stepIndex];

    document.getElementById("pray-progress").textContent = `${MYSTERIES[prayerState.mysteryKey].title} — étape ${
      prayerState.stepIndex + 1
    } / ${seq.length}`;

    document.getElementById("pray-step-label").textContent = step.label;

    const metaEl = document.getElementById("pray-step-meta");
    const textEl = document.getElementById("pray-step-text");

    if (step.kind === "mystery") {
      const item = MYSTERIES[prayerState.mysteryKey].items[step.mysteryIndex];
      metaEl.innerHTML = `<p class="mystery-ref">${item.reference} &middot; Fruit : ${item.fruit}</p>`;
      textEl.textContent = item.meditation;
      textEl.classList.remove("placeholder");
    } else {
      metaEl.innerHTML = "";
      const prayer = PRAYERS[step.prayerKey];
      if (prayer.text && prayer.text.trim()) {
        textEl.textContent = prayer.text;
        textEl.classList.remove("placeholder");
      } else {
        textEl.textContent = "Texte à compléter.";
        textEl.classList.add("placeholder");
      }
    }

    document.getElementById("prev-step-btn").disabled = prayerState.stepIndex === 0;
    const nextBtn = document.getElementById("next-step-btn");
    nextBtn.textContent = prayerState.stepIndex === seq.length - 1 ? "Terminé" : "Suivant";

    ROSARY.highlightStep(document.getElementById("rosary-svg"), seq, prayerState.stepIndex);
    saveProgress();
    document.getElementById("app").scrollTop = 0;
  }

  document.getElementById("next-step-btn").addEventListener("click", () => {
    const seq = ensureSequence();
    if (prayerState.stepIndex < seq.length - 1) {
      prayerState.stepIndex++;
      renderPrayStep();
    }
  });

  document.getElementById("prev-step-btn").addEventListener("click", () => {
    if (prayerState.stepIndex > 0) {
      prayerState.stepIndex--;
      renderPrayStep();
    }
  });

  document.getElementById("restart-rosary-btn").addEventListener("click", () => {
    prayerState.stepIndex = 0;
    renderPrayStep();
  });

  // --- Onglet "Prières" -----------------------------------------------
  function renderPrayersTab() {
    const prayersEl = document.getElementById("prayers-list");
    prayersEl.innerHTML = "";
    Object.values(PRAYERS).forEach((prayer) => {
      const card = document.createElement("div");
      card.className = "prayer-card";
      const hasText = prayer.text && prayer.text.trim();
      card.innerHTML = `
        <h3>${prayer.title}</h3>
        <div class="prayer-text ${hasText ? "" : "placeholder"}">${
        hasText ? escapeHtml(prayer.text).replace(/\n/g, "<br>") : "Texte à compléter."
      }</div>
      `;
      prayersEl.appendChild(card);
    });

    const litaniesEl = document.getElementById("litanies-list");
    litaniesEl.innerHTML = "";
    Object.values(LITANIES).forEach((lit) => {
      const card = document.createElement("div");
      card.className = "prayer-card";
      if (lit.lines && lit.lines.length) {
        const rows = lit.lines
          .map((l) => `<p><strong>${escapeHtml(l.call || "")}</strong> — ${escapeHtml(l.response || "")}</p>`)
          .join("");
        card.innerHTML = `<h3>${lit.title}</h3>${rows}`;
      } else {
        card.innerHTML = `<h3>${lit.title}</h3><div class="prayer-text placeholder">Texte à compléter.</div>`;
      }
      litaniesEl.appendChild(card);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // --- Initialisation ----------------------------------------------------
  renderTodayTab();
  renderPrayersTab();
  showTab("today");

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {
        /* PWA hors-ligne indisponible, l'app reste utilisable en ligne */
      });
    });
  }
})();
