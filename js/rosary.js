// Construction du diagramme SVG du rosaire (positions des grains) et de la
// séquence de prière (croix -> intro -> 5 dizaines -> clôture).

const ROSARY = (() => {
  // --- Géométrie du diagramme -------------------------------------------
  const VIEW_W = 360;
  const VIEW_H = 560;
  const LOOP_CX = 180;
  const LOOP_CY = 190;
  const LOOP_R = 150;
  const GAP_DEG = 26; // espace laissé en bas de la boucle pour la médaille

  const R_SMALL = 6;
  const R_LARGE = 9;
  const R_MEDAL = 12;

  function polarToXY(cx, cy, r, angleDeg) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  // Construit la liste des grains (positions) et l'ordre physique du fil
  // (pour tracer les segments de chaîne).
  //
  // Un chapelet se prie en partant du grain immédiatement à DROITE de la
  // médaille, puis en tournant dans le sens ANTI-HORAIRE (droite -> haut ->
  // gauche -> bas) pour revenir à la médaille après la 5e dizaine. Dans notre
  // convention d'angle (0°=haut, 90°=droite, 180°=bas, croissant = sens
  // horaire), le sens anti-horaire correspond à un angle qui DÉCROÎT.
  function buildLayout() {
    const beads = {};
    const loopOrder = [];

    const startAngle = 180 - GAP_DEG / 2;
    const totalSpan = 360 - GAP_DEG;
    const segSpan = totalSpan / 5;

    for (let d = 0; d < 5; d++) {
      const A = startAngle - d * segSpan;

      const largePos = polarToXY(LOOP_CX, LOOP_CY, LOOP_R, A);
      beads[`large-${d}`] = { id: `large-${d}`, kind: "large", r: R_LARGE, ...largePos };
      loopOrder.push(`large-${d}`);

      // 10 grains "Je vous salue Marie", régulièrement espacés jusqu'au
      // grain large suivant (à segSpan). Les prières Gloire au Père et
      // Fatima se disent sur ce 10e grain (pas de grain dédié, comme sur
      // un vrai chapelet).
      for (let i = 0; i < 10; i++) {
        const angle = A - (segSpan * (i + 1)) / 11;
        const pos = polarToXY(LOOP_CX, LOOP_CY, LOOP_R, angle);
        const id = `small-${d}-${i}`;
        beads[id] = { id, kind: "small", r: R_SMALL, ...pos };
        loopOrder.push(id);
      }
    }

    // Médaille : point bas de la boucle (angle 180°).
    const medalPos = polarToXY(LOOP_CX, LOOP_CY, LOOP_R, 180);
    beads["medal"] = { id: "medal", kind: "medal", r: R_MEDAL, ...medalPos };

    // Chaînette d'introduction, verticale, sous la médaille.
    const tailX = medalPos.x;
    let y = medalPos.y + 34;
    const tailOrder = ["medal"];

    ["intro-small-0", "intro-small-1", "intro-small-2"].forEach((id) => {
      beads[id] = { id, kind: "small", r: R_SMALL, x: tailX, y };
      tailOrder.push(id);
      y += 34;
    });

    beads["intro-large"] = { id: "intro-large", kind: "large", r: R_LARGE, x: tailX, y };
    tailOrder.push("intro-large");
    y += 38;

    beads["cross"] = { id: "cross", kind: "cross", r: 14, x: tailX, y };
    tailOrder.push("cross");

    return { beads, loopOrder, tailOrder, viewBox: `0 0 ${VIEW_W} ${VIEW_H}` };
  }

  // --- Séquence de prière --------------------------------------------------
  // Chaque étape référence un grain (beadId) du diagramme et soit une
  // prière (prayerKey dans PRAYERS), soit l'annonce d'un mystère.
  function buildSequence(mysteryKey) {
    const series = MYSTERIES[mysteryKey];
    const seq = [];
    let n = 0;
    const push = (beadId, kind, extra) => {
      seq.push({ n: n++, beadId, kind, ...extra });
    };

    push("cross", "prayer", { prayerKey: "signOfCross" });
    push("cross", "prayer", { prayerKey: "credo" });
    push("intro-large", "prayer", { prayerKey: "ourFather" });
    for (let i = 0; i < 3; i++) {
      push(`intro-small-${i}`, "prayer", { prayerKey: "hailMary" });
    }
    push("medal", "prayer", { prayerKey: "gloryBe" });

    for (let d = 0; d < 5; d++) {
      push(`large-${d}`, "mystery", { mysteryIndex: d });
      push(`large-${d}`, "prayer", { prayerKey: "ourFather" });
      for (let i = 0; i < 10; i++) {
        push(`small-${d}-${i}`, "prayer", { prayerKey: "hailMary" });
      }
      push(`small-${d}-9`, "prayer", { prayerKey: "gloryBe" });
      push(`small-${d}-9`, "prayer", { prayerKey: "fatimaPrayer" });
    }

    push("medal", "prayer", { prayerKey: "salveRegina" });
    push("cross", "prayer", { prayerKey: "signOfCross" });

    // Ajoute le libellé affiché pour chaque étape.
    seq.forEach((step) => {
      if (step.kind === "mystery") {
        step.label = series.items[step.mysteryIndex].title;
      } else {
        step.label = PRAYERS[step.prayerKey].title;
      }
    });

    return seq;
  }

  // --- Rendu SVG -------------------------------------------------------
  const SVG_NS = "http://www.w3.org/2000/svg";

  function renderSVG(svgEl, layout) {
    svgEl.setAttribute("viewBox", layout.viewBox);
    svgEl.innerHTML = "";

    const chainGroup = document.createElementNS(SVG_NS, "g");
    chainGroup.setAttribute("class", "rosary-chain");
    const drawChain = (order) => {
      for (let i = 0; i < order.length - 1; i++) {
        const a = layout.beads[order[i]];
        const b = layout.beads[order[i + 1]];
        const line = document.createElementNS(SVG_NS, "line");
        line.setAttribute("x1", a.x);
        line.setAttribute("y1", a.y);
        line.setAttribute("x2", b.x);
        line.setAttribute("y2", b.y);
        chainGroup.appendChild(line);
      }
    };
    drawChain(layout.loopOrder);
    // referme la boucle jusqu'à la médaille des deux côtés
    const first = layout.beads[layout.loopOrder[0]];
    const last = layout.beads[layout.loopOrder[layout.loopOrder.length - 1]];
    const medal = layout.beads["medal"];
    [
      [medal, first],
      [last, medal],
    ].forEach(([a, b]) => {
      const line = document.createElementNS(SVG_NS, "line");
      line.setAttribute("x1", a.x);
      line.setAttribute("y1", a.y);
      line.setAttribute("x2", b.x);
      line.setAttribute("y2", b.y);
      chainGroup.appendChild(line);
    });
    drawChain(layout.tailOrder);
    svgEl.appendChild(chainGroup);

    const beadsGroup = document.createElementNS(SVG_NS, "g");
    beadsGroup.setAttribute("class", "rosary-beads");

    Object.values(layout.beads).forEach((bead) => {
      if (bead.kind === "cross") {
        const g = document.createElementNS(SVG_NS, "g");
        g.setAttribute("data-bead-id", bead.id);
        g.setAttribute("class", "bead bead-cross");
        const vBar = document.createElementNS(SVG_NS, "rect");
        vBar.setAttribute("x", bead.x - 3);
        vBar.setAttribute("y", bead.y - 14);
        vBar.setAttribute("width", 6);
        vBar.setAttribute("height", 28);
        vBar.setAttribute("rx", 2);
        const hBar = document.createElementNS(SVG_NS, "rect");
        hBar.setAttribute("x", bead.x - 11);
        hBar.setAttribute("y", bead.y - 6);
        hBar.setAttribute("width", 22);
        hBar.setAttribute("height", 6);
        hBar.setAttribute("rx", 2);
        g.appendChild(vBar);
        g.appendChild(hBar);
        beadsGroup.appendChild(g);
      } else {
        const circle = document.createElementNS(SVG_NS, "circle");
        circle.setAttribute("data-bead-id", bead.id);
        circle.setAttribute("class", `bead bead-${bead.kind}`);
        circle.setAttribute("cx", bead.x);
        circle.setAttribute("cy", bead.y);
        circle.setAttribute("r", bead.r);
        beadsGroup.appendChild(circle);
      }
    });

    svgEl.appendChild(beadsGroup);
  }

  function highlightStep(svgEl, sequence, stepIndex) {
    const passedBeadIds = new Set(sequence.slice(0, stepIndex).map((s) => s.beadId));
    const currentBeadId = sequence[stepIndex] ? sequence[stepIndex].beadId : null;

    svgEl.querySelectorAll("[data-bead-id]").forEach((el) => {
      const id = el.getAttribute("data-bead-id");
      el.classList.toggle("done", passedBeadIds.has(id) && id !== currentBeadId);
      el.classList.toggle("current", id === currentBeadId);
    });
  }

  return { buildLayout, buildSequence, renderSVG, highlightStep };
})();
