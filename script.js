const screen = document.getElementById("screen");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const clickedButton = e.target.closest("button");
    const value = clickedButton.innerText;

    if (value === "Clear") {
      screen.innerText = "";
    } else if (value === "=") {
        screen.innerText = eval(screen.innerText);
    } else {
      screen.innerText += value;
    }
  });
});
