function clear() {
  document.getElementById("screen").innerText = "";
}

function calculate() {
  const screen = document.getElementById("screen");
  screen.innerText = eval(screen.innerText);
}

function append(value) {
  const screen = document.getElementById("screen");
  screen.innerText += value;
}
