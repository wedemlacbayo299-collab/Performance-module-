const profiles = {
  max: { name: 'Max Performance', cpu: 100, gpu: 100, status: 'Turbo Boost Active' },
  balance: { name: 'Balanced', cpu: 70, gpu: 68, status: 'Balanced Optimization' },
  saver: { name: 'Power Saver', cpu: 42, gpu: 38, status: 'Eco Efficiency' },
};

const modeGrid = document.getElementById('modeGrid');
const cpuFill = document.getElementById('cpuFill');
const gpuFill = document.getElementById('gpuFill');
const cpuLabel = document.getElementById('cpuLabel');
const gpuLabel = document.getElementById('gpuLabel');
const activeProfile = document.getElementById('activeProfile');
const systemStatus = document.getElementById('systemStatus');
const applyBtn = document.getElementById('applyBtn');
const spoofToggle = document.getElementById('spoofToggle');
const lockToggle = document.getElementById('lockToggle');

let currentMode = localStorage.getItem('ksu-mode') || 'max';

function render(mode) {
  const p = profiles[mode] || profiles.max;
  if (cpuFill) cpuFill.style.width = `${p.cpu}%`;
  if (gpuFill) gpuFill.style.width = `${p.gpu}%`;
  if (cpuLabel) cpuLabel.textContent = `${p.cpu}%`;
  if (gpuLabel) gpuLabel.textContent = `${p.gpu}%`;
  if (activeProfile) activeProfile.textContent = p.name;
  if (systemStatus) systemStatus.textContent = p.status;
  if (modeGrid) {
    modeGrid.querySelectorAll('.mode-card').forEach((card) => {
      card.classList.toggle('active', card.dataset.mode === mode);
    });
  }
}

if (modeGrid) {
  modeGrid.addEventListener('click', (e) => {
    const b = e.target.closest('.mode-card');
    if (!b) return;
    currentMode = b.dataset.mode;
    localStorage.setItem('ksu-mode', currentMode);
    render(currentMode);
  });
}

if (applyBtn) {
  applyBtn.addEventListener('click', () => {
    const spoof = spoofToggle && spoofToggle.checked ? 'Spoof ON' : 'Spoof OFF';
    const lock = lockToggle && lockToggle.checked ? 'CPU/GPU Lock ON' : 'CPU/GPU Lock OFF';
    if (systemStatus) systemStatus.textContent = `${profiles[currentMode].name} Applied • ${spoof} • ${lock}`;
  });
}

render(currentMode);
