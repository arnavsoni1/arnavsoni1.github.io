let start = 0;
let timer = null;
let running = false;
let laps = document.getElementById("laps");

function format(ms) {
  let m = Math.floor(ms / 60000).toString().padStart(2, '0');
  let s = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
  let msms = (ms % 1000).toString().padStart(3, '0');
  return `${m}:${s}:${msms}`;
}

function update() {
  let now = Date.now() - start;
  document.getElementById("time").textContent = format(now);
}

function toggle() {
  let btn = document.querySelector("button");
  if (!running) {
    start = Date.now() - (parseInt(start) || 0);
    timer = setInterval(update, 10);
  } else {
    clearInterval(timer);
    start = Date.now() - (parseInt(start) || 0);
  }
  running = !running;
}

function reset() {
  clearInterval(timer);
  running = false;
  start = 0;
  document.getElementById("time").textContent = "00:00:000";
  laps.innerHTML = "";
}

function lap() {
  if (!running) return;
  let time = document.getElementById("time").textContent;
  let div = document.createElement("div");
  div.className = "lap";
  div.textContent = `${time}`;
  laps.appendChild(div);
}

document.addEventListener("keydown", function(event) {
  switch (event.code) {
    case "Space":      
      event.preventDefault(); 
      toggle();
      break;

    case "Enter":      
      lap();
      break;

    case "Digit0":     
      reset();
      break;
  }
});
