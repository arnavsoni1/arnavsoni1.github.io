let exp = document.getElementById("display");

function append(a) {
  exp.value += a;
}

function clear() {
  exp.innerText = " ";
}

function evaluate() {
    let result = eval(exp.value);
    exp.value = result;
}
