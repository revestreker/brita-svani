// engine.js — The Mystery of Brita Svani
// Game engine. Do not edit. All content lives in scenes.js.

const STATE = {
  currentScene: null,
  inventory: [],
  removedProps: {},
  editorMode: false,
  dialogueOpen: false,
  inventoryOpen: false,
  lightboxOpen: false,
  musicEnabled: true,
  musicVolume: 0.5,
  // Pan state
  panX: 0,           // current pan offset in pixels
  panTarget: 0,      // target pan (for smooth lerp)
  panScene: false,   // whether current scene is a pan scene
  panImageWidth: 0,  // natural width of background image
  panKeys: { left: false, right: false },
};

const PAN_SPEED = 6;
const PAN_LERP  = 0.10;

// ─── AUDIO ───────────────────────────────────────────────────────────────────

const bgMusic = new Audio("assets/audio/score.mp3");
bgMusic.loop = true;
bgMusic.volume = STATE.musicVolume;

function startMusic() {
  if (STATE.musicEnabled) bgMusic.play().catch(() => {});
}
function setMusicEnabled(val) {
  STATE.musicEnabled = val;
  val ? bgMusic.play().catch(() => {}) : bgMusic.pause();
  updateSettingsUI();
}
function setMusicVolume(val) {
  STATE.musicVolume = val;
  bgMusic.volume = val;
  updateSettingsUI();
}

// ─── INIT ────────────────────────────────────────────────────────────────────

function startGame() {
  document.getElementById("title-screen").style.display = "none";
  document.getElementById("settings-screen").style.display = "none";
  document.getElementById("top-bar").style.display = "flex";
  document.getElementById("inventory-btn").style.display = "flex";
  loadScene("exterior");
  fadeIn();
  startMusic();
  requestAnimationFrame(panLoop);
}

function resumeGame() {
  const saved = localStorage.getItem('brita_save');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      document.getElementById("title-screen").style.display = "none";
      document.getElementById("settings-screen").style.display = "none";
      document.getElementById("top-bar").style.display = "flex";
      document.getElementById("inventory-btn").style.display = "flex";
      if (data.inventory) STATE.inventory = data.inventory;
      if (data.removedProps) STATE.removedProps = data.removedProps;
      loadScene(data.scene || "exterior");
      fadeIn();
      startMusic();
      requestAnimationFrame(panLoop);
    } catch(e) { startGame(); }
  } else {
    showTitleMessage("No saved game found — starting new game...");
    setTimeout(startGame, 1800);
  }
}

function openSettings() {
  document.getElementById("settings-screen").style.display = "flex";
}
function closeSettings() {
  document.getElementById("settings-screen").style.display = "none";
}

function showTitleMessage(msg) {
  const el = document.createElement("div");
  el.textContent = msg;
  el.style.cssText = `
    position:absolute;bottom:10%;left:20%;
    font-size:14px;font-style:italic;color:rgba(60,40,20,0.75);
    font-family:Georgia,serif;pointer-events:none;z-index:300;letter-spacing:0.06em;
  `;
  document.getElementById("title-screen").appendChild(el);
  setTimeout(() => el.remove(), 2000);
}

function loadScene(sceneId) {
  const scene = SCENES[sceneId];
  if (!scene) { console.error("Scene not found:", sceneId); return; }
  STATE.currentScene = scene;

  const bg = document.getElementById("background");
  bg.src = scene.background;
  document.getElementById("scene-label").textContent = scene.name;

  // Pan scene setup
  STATE.panScene = scene.type === "pan";
  if (STATE.panScene) {
    bg.onload = () => {
      STATE.panImageWidth = bg.naturalWidth;
      const startFrac = scene.panStart !== undefined ? scene.panStart : 0;
      const maxPan = bg.naturalWidth * (window.innerHeight / bg.naturalHeight) - window.innerWidth;
      STATE.panX = startFrac * Math.max(0, maxPan);
      STATE.panTarget = STATE.panX;
      applyPan();
    };
    bg.style.width = "auto";
    bg.style.height = "100%";
    bg.style.objectFit = "unset";
    bg.style.maxWidth = "none";
  } else {
    bg.onload = null;
    bg.style.width = "100%";
    bg.style.height = "100%";
    bg.style.objectFit = "cover";
    bg.style.maxWidth = "";
    STATE.panScene = false;
    STATE.panX = 0;
    STATE.panTarget = 0;
    applyPan();
  }

  closeInventory();
  closeLightbox();
  renderProps(scene);
  renderHotspots(scene);
  renderInventory();

  // Auto-save
  setTimeout(() => {
    localStorage.setItem('brita_save', JSON.stringify({
      scene: sceneId,
      inventory: STATE.inventory,
      removedProps: STATE.removedProps
    }));
  }, 200);
}

// ─── PAN SYSTEM ──────────────────────────────────────────────────────────────

function applyPan() {
  const bg = document.getElementById("background");
  const propLayer = document.getElementById("prop-layer");
  const hotspotLayer = document.getElementById("hotspot-layer");
  const tx = -Math.round(STATE.panX);
  bg.style.transform = `translateX(${tx}px)`;
  propLayer.style.transform = `translateX(${tx}px)`;
  // Hotspots move with the pan too
  hotspotLayer.style.transform = `translateX(${tx}px)`;
}

function getMaxPan() {
  if (!STATE.panScene) return 0;
  const bg = document.getElementById("background");
  const scaledWidth = bg.naturalWidth * (window.innerHeight / bg.naturalHeight);
  return Math.max(0, scaledWidth - window.innerWidth);
}

function panLoop() {
  requestAnimationFrame(panLoop);
  if (!STATE.panScene) return;

  if (STATE.panKeys.left)  STATE.panTarget = Math.max(0, STATE.panTarget - PAN_SPEED);
  if (STATE.panKeys.right) STATE.panTarget = Math.min(getMaxPan(), STATE.panTarget + PAN_SPEED);

  STATE.panX += (STATE.panTarget - STATE.panX) * PAN_LERP;
  applyPan();
}

// ─── PROPS ───────────────────────────────────────────────────────────────────

function getCoverRect() {
  const vw = window.innerWidth, vh = window.innerHeight;
  const bg = document.getElementById("background");
  if (STATE.panScene) {
    const scale = vh / (bg.naturalHeight || vh);
    return { offsetX: 0, offsetY: 0, renderedW: (bg.naturalWidth || vw) * scale, renderedH: vh, scale };
  }
  const nw = bg.naturalWidth || 1920, nh = bg.naturalHeight || 1080;
  const scale = Math.max(vw / nw, vh / nh);
  const renderedW = nw * scale, renderedH = nh * scale;
  return { offsetX: (renderedW - vw) / 2, offsetY: (renderedH - vh) / 2, renderedW, renderedH, scale };
}

function bgPctToViewportPx(xPct, yPct, wPct, hPct) {
  const { offsetX, offsetY, renderedW, renderedH } = getCoverRect();
  return {
    left:   (xPct / 100) * renderedW - offsetX,
    top:    (yPct / 100) * renderedH - offsetY,
    width:  (wPct / 100) * renderedW,
    height: (hPct / 100) * renderedH,
  };
}

function positionProp(el, prop) {
  const { left, top, width, height } = bgPctToViewportPx(prop.x, prop.y, prop.width, prop.height);
  el.style.left = left + "px"; el.style.top = top + "px";
  el.style.width = width + "px"; el.style.height = height + "px";
}

function renderProps(scene) {
  const layer = document.getElementById("prop-layer");
  layer.innerHTML = "";
  if (!scene.props) return;
  const removed = STATE.removedProps[scene.id] || {};
  scene.props.forEach(prop => {
    if (removed[prop.id]) return;
    const el = document.createElement("img");
    el.src = prop.image + "?v=" + Date.now();
    el.id = "prop-" + prop.id;
    el.style.cssText = "position:absolute;pointer-events:none;";
    positionProp(el, prop);
    el.onload = () => positionProp(el, prop);
    layer.appendChild(el);
  });
}

window.addEventListener("resize", () => {
  const scene = STATE.currentScene;
  if (!scene || !scene.props) return;
  const removed = STATE.removedProps[scene.id] || {};
  scene.props.forEach(prop => {
    if (removed[prop.id]) return;
    const el = document.getElementById("prop-" + prop.id);
    if (el) positionProp(el, prop);
  });
});

function removeProp(sceneId, propId) {
  if (!STATE.removedProps[sceneId]) STATE.removedProps[sceneId] = {};
  STATE.removedProps[sceneId][propId] = true;
  const el = document.getElementById("prop-" + propId);
  if (el) {
    el.style.transition = "opacity 0.35s ease";
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 360);
  }
}

// ─── HOTSPOTS ────────────────────────────────────────────────────────────────

function renderHotspots(scene) {
  const layer = document.getElementById("hotspot-layer");
  layer.innerHTML = "";
  // For pan scenes, hotspot layer needs to be as wide as the full image
  if (STATE.panScene) {
    layer.style.width = "auto";
  } else {
    layer.style.width = "100%";
  }

  scene.hotspots.forEach(hs => {
    const el = document.createElement("div");
    el.className = "hotspot" + (STATE.editorMode ? " debug" : "");
    el.style.cssText = `left:${hs.x}%;top:${hs.y}%;width:${hs.width}%;height:${hs.height}%`;
    el.dataset.id = hs.id;
    const label = document.createElement("div");
    label.className = "hotspot-label";
    label.textContent = hs.label;
    el.appendChild(label);
    el.addEventListener("click", () => { if (!STATE.editorMode) triggerHotspot(hs); });
    layer.appendChild(el);
  });
}

function triggerHotspot(hs) {
  const action = hs.action;
  if (!action) return;

  if (action.type === "dialogue") {
    showDialogue(action.speaker, action.text);
  } else if (action.type === "pickup") {
    const alreadyHave = STATE.inventory.find(i => i.id === action.item.id);
    if (!alreadyHave) {
      STATE.inventory.push(action.item);
      renderInventory();
      showPickupNotification(action.item.label);
      if (action.removesProp) removeProp(STATE.currentScene.id, action.removesProp);
      const hotspotEl = document.querySelector(`[data-id="${hs.id}"]`);
      if (hotspotEl) hotspotEl.style.display = "none";
      showDialogue(action.speaker, action.text);
    } else {
      showDialogue(action.speaker, action.alreadyTaken || "I already have that.");
    }
  } else if (action.type === "scene") {
    closeInventory(); closeLightbox();
    fadeOut(() => { loadScene(action.target); fadeIn(); });
  } else if (action.type === "lightbox") {
    openLightbox(action.image);
  } else if (action.type === "conditional") {
    const hasItem = STATE.inventory.find(i => i.id === action.requiresItem);
    if (hasItem) {
      showDialogue(action.speaker, action.textSuccess);
      if (action.then) setTimeout(() => handleThen(action.then), 1800);
    } else {
      showDialogue(action.speaker, action.textFail);
    }
  }
}

function handleThen(then) {
  if (then.type === "scene") fadeOut(() => { loadScene(then.target); fadeIn(); });
  else if (then.type === "pickup") {
    if (!STATE.inventory.find(i => i.id === then.item.id)) {
      STATE.inventory.push(then.item); renderInventory();
    }
  }
}

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────

let eyeTrackingActive = false;

function openLightbox(imageSrc) {
  STATE.lightboxOpen = true;
  closeDialogue(); closeInventory();
  const lb = document.getElementById("lightbox");
  document.getElementById("lightbox-img").src = imageSrc;
  lb.style.display = "flex";
  requestAnimationFrame(() => lb.classList.add("open"));
}

function closeLightbox() {
  STATE.lightboxOpen = false;
  eyeTrackingActive = false;
  const lb = document.getElementById("lightbox");
  lb.classList.remove("open");
  setTimeout(() => { lb.style.display = "none"; }, 280);
}

// ─── DIALOGUE ────────────────────────────────────────────────────────────────

function showDialogue(speaker, text) {
  STATE.dialogueOpen = true;
  closeInventory();
  document.getElementById("dialogue-speaker").textContent = speaker || "—";
  document.getElementById("dialogue-text").textContent = text;
  document.getElementById("dialogue-box").style.display = "block";
}

function closeDialogue() {
  STATE.dialogueOpen = false;
  document.getElementById("dialogue-box").style.display = "none";
}

// ─── INVENTORY ───────────────────────────────────────────────────────────────

const ITEM_ICONS = {
  mystery_bottle: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2 h6 v3 l2 3 v10 a1.5 1.5 0 0 1-1.5 1.5 h-5 a1.5 1.5 0 0 1-1.5-1.5 V8 l2-3 Z"
          stroke="rgba(200,170,90,0.85)" stroke-width="1.3" fill="rgba(200,170,90,0.08)"/>
    <line x1="7.5" y1="11" x2="14.5" y2="11" stroke="rgba(200,170,90,0.45)" stroke-width="1"/>
    <rect x="8.5" y="2" width="5" height="1.5" rx="0.5" stroke="rgba(200,170,90,0.65)" stroke-width="1" fill="none"/>
  </svg>`,
  note: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="2.5" width="14" height="17" rx="1.5" stroke="rgba(200,170,90,0.85)" stroke-width="1.3" fill="rgba(200,170,90,0.06)"/>
    <line x1="7" y1="7.5" x2="15" y2="7.5" stroke="rgba(200,170,90,0.55)" stroke-width="1"/>
    <line x1="7" y1="10.5" x2="15" y2="10.5" stroke="rgba(200,170,90,0.55)" stroke-width="1"/>
    <line x1="7" y1="13.5" x2="12" y2="13.5" stroke="rgba(200,170,90,0.55)" stroke-width="1"/>
    <path d="M14.5 2.5 L18 6 L14.5 6 Z" stroke="rgba(200,170,90,0.55)" stroke-width="1" fill="rgba(200,170,90,0.1)"/>
  </svg>`,
  default: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="14" height="14" rx="2" stroke="rgba(200,170,90,0.6)" stroke-width="1.3" fill="rgba(200,170,90,0.06)"/>
    <line x1="11" y1="7" x2="11" y2="15" stroke="rgba(200,170,90,0.5)" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="7" y1="11" x2="15" y2="11" stroke="rgba(200,170,90,0.5)" stroke-width="1.2" stroke-linecap="round"/>
  </svg>`
};

function renderItemIcon(item) {
  // To use your own drawn icon: return `<img src="assets/items/${item.id}.png" style="width:22px;height:22px;object-fit:contain;">`;
  return ITEM_ICONS[item.id] || ITEM_ICONS["default"];
}

function renderInventory() {
  const grid = document.getElementById("inventory-grid");
  const countEl = document.getElementById("inv-count");
  grid.innerHTML = "";
  const totalSlots = Math.max(10, Math.ceil((STATE.inventory.length + 1) / 5) * 5);
  for (let i = 0; i < totalSlots; i++) {
    const item = STATE.inventory[i];
    const slot = document.createElement("div");
    slot.className = "inv-slot" + (item ? " filled" : "");
    if (item) {
      slot.innerHTML = renderItemIcon(item);
      const tip = document.createElement("div");
      tip.className = "inv-tooltip";
      tip.textContent = item.label;
      slot.appendChild(tip);
    }
    grid.appendChild(slot);
  }
  if (STATE.inventory.length > 0) {
    countEl.textContent = STATE.inventory.length;
    countEl.style.display = "flex";
  } else {
    countEl.style.display = "none";
  }
}

function toggleInventory() { STATE.inventoryOpen ? closeInventory() : openInventory(); }

function openInventory() {
  STATE.inventoryOpen = true;
  const panel = document.getElementById("inventory-panel");
  panel.style.display = "block";
  requestAnimationFrame(() => panel.classList.add("open"));
}

function closeInventory() {
  STATE.inventoryOpen = false;
  const panel = document.getElementById("inventory-panel");
  panel.classList.remove("open");
  setTimeout(() => { if (!STATE.inventoryOpen) panel.style.display = "none"; }, 240);
}

function showPickupNotification(label) {
  const n = document.createElement("div");
  n.textContent = "+" + label;
  n.style.cssText = `position:absolute;bottom:90px;right:80px;font-size:12px;letter-spacing:0.1em;
    color:rgba(200,170,90,0.95);font-family:Georgia,serif;font-style:italic;
    pointer-events:none;z-index:400;opacity:1;transition:opacity 0.5s ease,transform 0.5s ease;transform:translateY(0);`;
  document.getElementById("game-container").appendChild(n);
  requestAnimationFrame(() => {
    setTimeout(() => {
      n.style.opacity = "0"; n.style.transform = "translateY(-16px)";
      setTimeout(() => n.remove(), 500);
    }, 1200);
  });
}

// ─── TRANSITIONS ─────────────────────────────────────────────────────────────

function fadeOut(cb) {
  const f = document.getElementById("fade");
  f.style.opacity = "1";
  setTimeout(() => { if (cb) cb(); }, 700);
}
function fadeIn() {
  const f = document.getElementById("fade");
  setTimeout(() => { f.style.opacity = "0"; }, 60);
}

// ─── TOP BAR ─────────────────────────────────────────────────────────────────

function goToMainMenu() {
  closeSettings(); closeDialogue(); closeInventory(); closeLightbox();
  fadeOut(() => {
    document.getElementById("title-screen").style.display = "flex";
    document.getElementById("top-bar").style.display = "none";
    document.getElementById("inventory-btn").style.display = "none";
    document.getElementById("hotspot-layer").innerHTML = "";
    document.getElementById("prop-layer").innerHTML = "";
    document.getElementById("scene-label").textContent = "";
    bgMusic.pause(); bgMusic.currentTime = 0;
    STATE.panScene = false;
    fadeIn();
  });
}

let settingsOpen = false;
function toggleSettingsPanel() {
  settingsOpen = !settingsOpen;
  document.getElementById("settings-panel").style.display = settingsOpen ? "block" : "none";
}
function updateSettingsUI() {
  ["music-toggle-btn","music-toggle-btn-ingame"].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.textContent = STATE.musicEnabled ? "Music: ON" : "Music: OFF";
  });
  ["volume-slider","volume-slider-ingame"].forEach(id => {
    const sl = document.getElementById(id);
    if (sl) sl.value = Math.round(STATE.musicVolume * 100);
  });
  ["volume-readout","volume-readout-ingame"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = Math.round(STATE.musicVolume * 100) + "%";
  });
}

// ─── EDITOR MODE ─────────────────────────────────────────────────────────────

const editorCanvas = document.getElementById("drag-canvas");
const editorCtx = editorCanvas.getContext("2d");
let drag = { active: false, x0: 0, y0: 0, x1: 0, y1: 0 };

function toggleEditor() {
  STATE.editorMode = !STATE.editorMode;
  const badge = document.getElementById("editor-badge");
  const panel = document.getElementById("editor-panel");
  if (STATE.editorMode) {
    badge.style.display = "block"; panel.style.display = "block";
    editorCanvas.style.display = "block"; editorCanvas.style.pointerEvents = "all";
    resizeEditorCanvas();
  } else {
    badge.style.display = "none"; panel.style.display = "none";
    editorCanvas.style.display = "none"; editorCanvas.style.pointerEvents = "none";
    editorCtx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
  }
  if (STATE.currentScene) renderHotspots(STATE.currentScene);
}

function resizeEditorCanvas() {
  const gc = document.getElementById("game-container");
  editorCanvas.width = gc.offsetWidth;
  editorCanvas.height = gc.offsetHeight;
}

editorCanvas.addEventListener("mousedown", e => {
  if (!STATE.editorMode) return;
  resizeEditorCanvas();
  const r = editorCanvas.getBoundingClientRect();
  drag = { active: true, x0: e.clientX - r.left, y0: e.clientY - r.top, x1: e.clientX - r.left, y1: e.clientY - r.top };
});
editorCanvas.addEventListener("mousemove", e => {
  if (!STATE.editorMode || !drag.active) return;
  const r = editorCanvas.getBoundingClientRect();
  drag.x1 = e.clientX - r.left; drag.y1 = e.clientY - r.top;
  drawEditorRect();
});
editorCanvas.addEventListener("mouseup", e => {
  if (!STATE.editorMode || !drag.active) return;
  drag.active = false;
  const r = editorCanvas.getBoundingClientRect();
  drag.x1 = e.clientX - r.left; drag.y1 = e.clientY - r.top;
  drawEditorRect(); outputEditorCoords();
});

function drawEditorRect() {
  editorCtx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
  const x = Math.min(drag.x0, drag.x1), y = Math.min(drag.y0, drag.y1);
  const w = Math.abs(drag.x1 - drag.x0), h = Math.abs(drag.y1 - drag.y0);
  editorCtx.strokeStyle = "rgba(255,200,80,0.9)"; editorCtx.lineWidth = 2;
  editorCtx.setLineDash([6, 3]); editorCtx.strokeRect(x, y, w, h);
  editorCtx.fillStyle = "rgba(255,200,80,0.07)"; editorCtx.fillRect(x, y, w, h);
}

function outputEditorCoords() {
  const W = editorCanvas.width, H = editorCanvas.height;
  const x = Math.round(Math.min(drag.x0, drag.x1) / W * 100);
  const y = Math.round(Math.min(drag.y0, drag.y1) / H * 100);
  const w = Math.round(Math.abs(drag.x1 - drag.x0) / W * 100);
  const h = Math.round(Math.abs(drag.y1 - drag.y0) / H * 100);
  document.getElementById("editor-coords").innerHTML = `x: ${x}%&nbsp;&nbsp;y: ${y}%<br>width: ${w}%&nbsp;&nbsp;height: ${h}%`;
  document.getElementById("editor-json").textContent =
`{
  "id": "hotspot_name",
  "label": "What is it?",
  "x": ${x}, "y": ${y},
  "width": ${w}, "height": ${h},
  "action": {
    "type": "dialogue",
    "speaker": "You",
    "text": "Describe what you see."
  }
}`;
}

// ─── INPUT ───────────────────────────────────────────────────────────────────

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft")  { STATE.panKeys.left  = true; if (STATE.panScene) e.preventDefault(); }
  if (e.key === "ArrowRight") { STATE.panKeys.right = true; if (STATE.panScene) e.preventDefault(); }
  if (e.key === "e" || e.key === "E") toggleEditor();
  if (e.key === "Escape") { closeDialogue(); closeSettings(); closeInventory(); closeLightbox(); }
  if (e.key === "i" || e.key === "I") toggleInventory();
});
document.addEventListener("keyup", e => {
  if (e.key === "ArrowLeft")  STATE.panKeys.left  = false;
  if (e.key === "ArrowRight") STATE.panKeys.right = false;
});

document.addEventListener("mousemove", e => {
  const c = document.getElementById("custom-cursor");
  c.style.left = e.clientX + "px";
  c.style.top = e.clientY + "px";
});

document.addEventListener("click", e => {
  const sp = document.getElementById("settings-panel");
  const sb = document.getElementById("settings-btn");
  if (settingsOpen && !sp.contains(e.target) && !sb.contains(e.target)) {
    settingsOpen = false; sp.style.display = "none";
  }
  const ip = document.getElementById("inventory-panel");
  const ib = document.getElementById("inventory-btn");
  if (STATE.inventoryOpen && !ip.contains(e.target) && !ib.contains(e.target)) closeInventory();
});

// ─── BOOT ────────────────────────────────────────────────────────────────────

renderInventory();
updateSettingsUI();
