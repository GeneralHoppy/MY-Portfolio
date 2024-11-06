const display = document.getElementById("display");
let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldResetDisplay = false;

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => handleButtonClick(button.dataset.key));
});

function handleButtonClick(key) {
  switch (key) {
    case "clear":
      clearDisplay();
      break;
    case "backspace":
      deleteLastDigit();
      break;
    case "add":
    case "subtract":
    case "multiply":
    case "divide":
      setOperator(key);
      break;
    case "equal":
      evaluate();
      break;
    case "decimal":
      addDecimal();
      break;
    default:
      appendNumber(key);
      break;
  }
}

function clearDisplay() {
  currentInput = "0";
  previousInput = "";
  operator = null;
  display.textContent = currentInput;
}

function deleteLastDigit() {
  currentInput = currentInput.toString().slice(0, -1) || "0";
  display.textContent = currentInput;
}

function setOperator(selectedOperator) {
  if (operator !== null) evaluate();
  previousInput = currentInput;
  operator = selectedOperator;
  shouldResetDisplay = true;
}

function appendNumber(number) {
  if (shouldResetDisplay) {
    currentInput = number;
    shouldResetDisplay = false;
  } else {
    currentInput = currentInput === "0" ? number : currentInput + number;
  }
  display.textContent = currentInput;
}

function addDecimal() {
  if (!currentInput.includes(".")) {
    currentInput += ".";
    display.textContent = currentInput;
  }
}

function evaluate() {
  if (operator === null || shouldResetDisplay) return;
  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  switch (operator) {
    case "add":
      computation = prev + current;
      break;
    case "subtract":
      computation = prev - current;
      break;
    case "multiply":
      computation = prev * current;
      break;
    case "divide":
      computation = prev / current;
      break;
    default:
      return;
  }

  currentInput = computation.toString();
  operator = null;
  previousInput = "";
  display.textContent = currentInput;
}
