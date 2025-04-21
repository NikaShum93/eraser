const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById("image");
const sound = document.getElementById("sound");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ✨ заполняем canvas непрозрачным чёрным, который будем "стирать"
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let isErasing = false;
let brushSize = 40;

function sparkle(x, y) {
  for (let i = 0; i < 6; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    const color = ["#fff", "#ccf6ff", "#ffddee", "#ffccff"][Math.floor(Math.random() * 4)];
    s.style.background = color;
    s.style.left = (x + (Math.random() * 10 - 5)) + "px";
    s.style.top = (y + (Math.random() * 10 - 5)) + "px";
    s.style.position = "absolute";
    s.style.zIndex = 9999;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 600);
  }
}

canvas.addEventListener("mousedown", () => {
  isErasing = true;
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
});

canvas.addEventListener("mouseup", () => {
  isErasing = false;
  if (sound) sound.pause();
});

canvas.addEventListener("mouseleave", () => {
  isErasing = false;
  if (sound) sound.pause();
});

canvas.addEventListener("mousemove", (e) => {
  if (!isErasing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // 💫 Стираем часть canvas
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";

  sparkle(x, y);
});
