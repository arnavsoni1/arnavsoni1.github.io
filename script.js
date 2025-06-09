const display = document.getElementById('display');

function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  try {
    let expression = display.value.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
    display.value = eval(expression);
  } catch {
    display.value = 'Error';
  }
}
