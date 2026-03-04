const profiles = {
  max: { name: "Max Performance", cpu: 100, gpu: 100, status: "Turbo Boost Active" },
  balance: { name: "Balanced", cpu: 72, gpu: 68, status: "Balanced Optimization" },
  saver: { name: "Power Saver", cpu: 40, gpu: 35, status: "Eco Efficiency" },
};

const modeGrid = document.getElementById("modeGrid");
const cpuFill = document.getElementById("cpuFill");
const gpuFill = document.getElementById("gpuFill");
const cpuLabel = document.getElementById("cpuLabel");
const gpuLabel = document.getElementById("gpuLabel");
const activeProfile = document.getElementById("activeProfile");
const systemStatus = document.getElementById("systemStatus");
const applyBtn = document.getElementById("applyBtn");
const spoofToggle = document.getElementById("spoofToggle");
const lockToggle = document.getElementById("lockToggle");
const floatPin = document.getElementById("floatPin");
const floatingPanel = document.getElementById("floatingPanel");

let currentMode = "max";

function render(mode) {
  const profile = profiles[mode];
  cpuFill.style.width = `${profile.cpu}%`;
  gpuFill.style.width = `${profile.gpu}%`;
  cpuLabel.textContent = `${profile.cpu}%`;
  gpuLabel.textContent = `${profile.gpu}%`;
  activeProfile.textContent = profile.name;
  systemStatus.textContent = profile.status;

  modeGrid.querySelectorAll(".mode-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.mode === mode);
  });
}

modeGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".mode-card");
  if (!button) {
    return;
  }

  currentMode = button.dataset.mode;
  render(currentMode);
});

applyBtn.addEventListener("click", () => {
  const spoof = spoofToggle.checked ? "Spoof ON" : "Spoof OFF";
  const lock = lockToggle.checked ? "CPU/GPU Lock ON" : "CPU/GPU Lock OFF";
  systemStatus.textContent = `${profiles[currentMode].name} Applied • ${spoof} • ${lock}`;
});

floatPin.addEventListener("click", () => {
  floatingPanel.classList.toggle("pinned");
  floatPin.textContent = floatingPanel.classList.contains("pinned") ? "✅" : "📌";
});

render(currentMode);
