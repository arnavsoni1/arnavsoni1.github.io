let exp = document.getElementById("display");

function append(a) {
  exp.value += a;
}

function clear() {
  exp.value = "";
}

function evaluate() {
    exp.value = eval(exp.value);
}
