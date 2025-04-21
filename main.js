const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const label = document.getElementById("label");
const sound = document.getElementById("sound");

let imageElement = null;

function findGroupedImage() {
  try {
    const parent = window.frameElement?.parentElement;
    if (!parent) return;
    const siblings = parent.querySelectorAll("img");
    if (siblings.length > 0) imageElement = siblings[0];
  } catch (e) {
    console.warn("Cannot access parent element:", e);
  }
}

function applyMask(x, y, radius) {
  if (!imageElement) return;
  const mask = imageElement.style.webkitMaskImage || "";
  const newMask = `radial-gradient(circle ${radius}px at ${x}px ${y}px, transparent 0%, black 100%)`;
  const current = imageElement.style.webkitMaskImage;
  imageElement.style.webkitMaskImage = current
    ? `${current}, ${newMask}`
    : newMask;
  imageElement.style.maskImage = imageElement.style.webkitMaskImage;
}

function sparkle(x, y) {
  for (let i = 0; i < 4; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    const color = ["#fff", "#ccf6ff", "#ffddee", "#ffccff"][Math.floor(Math.random() * 4)];
    s.style.background = color;
    s.style.left = (x + (Math.random() * 10 - 5)) + "px";
    s.style.top = (y + (Math.random() * 10 - 5)) + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 600);
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let isErasing = false;
const brushSize = 40;

canvas.addEventListener("mousedown", () => {
  isErasing = true;
  sound.currentTime = 0;
  sound.play();
});

canvas.addEventListener("mouseup", () => {
  isErasing = false;
  sound.pause();
});

canvas.addEventListener("mouseleave", () => {
  isErasing = false;
  sound.pause();
});

canvas.addEventListener("mousemove", (e) => {
  if (!isErasing || !imageElement) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  applyMask(x, y, brushSize);
  sparkle(x, y);
});

setTimeout(() => {
  if (window.top !== window.self) label.style.opacity = 0;
}, 3000);

findGroupedImage();