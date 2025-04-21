const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById("image");
const sound = document.getElementById("sound");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isErasing = false;
let brushSize = 40;

function drawDust(x, y) {
  const particles = 50;
  for (let i = 0; i < particles; i++) {
    const dx = x + (Math.random() - 0.5) * brushSize;
    const dy = y + (Math.random() - 0.5) * brushSize;
    const alpha = Math.random() * 0.5;
    ctx.fillStyle = `rgba(50, 30, 30, ${alpha})`;
    ctx.beginPath();
    ctx.arc(dx, dy, 1 + Math.random() * 2, 0, Math.PI * 2);
    ctx.fill();
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
  drawDust(x, y);
});
