function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

function operate(operator, a, b) {
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
  }
}

let firstNumber = null;
let operatorSelected = null;
let displayValue = '0';
let shouldResetDisplay = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

function updateDisplay() {
  display.textContent = displayValue;
}

function inputDigit(digit) {
  if (shouldResetDisplay) {
    displayValue = digit;
    shouldResetDisplay = false;
  } else {
    displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (shouldResetDisplay) {
    displayValue = '0.';
    shouldResetDisplay = false;
    updateDisplay();
    return;
  }
  if (!displayValue.includes('.')) {
    displayValue += '.';
    updateDisplay();
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(displayValue);

  if (firstNumber === null) {
    firstNumber = inputValue;
  } else if (operatorSelected) {
    const result = operate(operatorSelected, firstNumber, inputValue);
    displayValue = String(roundResult(result));
    firstNumber = result;
    updateDisplay();
  }

  shouldResetDisplay = true;
  operatorSelected = nextOperator;
}

function roundResult(num) {
  return Math.round(num * 100000) / 100000;
}

function handleEquals() {
  if (operatorSelected === null || shouldResetDisplay) return;
  const inputValue = parseFloat(displayValue);

  if (operatorSelected === '/' && inputValue === 0) {
    displayValue = "Nice try, but no.";
    firstNumber = null;
    operatorSelected = null;
    shouldResetDisplay = true;
    updateDisplay();
    return;
  }

  const result = operate(operatorSelected, firstNumber, inputValue);
  displayValue = String(roundResult(result));
  firstNumber = null;
  operatorSelected = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function clearAll() {
  displayValue = '0';
  firstNumber = null;
  operatorSelected = null;
  shouldResetDisplay = false;
  updateDisplay();
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.id === 'clear') {
      clearAll();
    } else if (value === '=') {
      handleEquals();
    } else if (['+', '-', '*', '/'].includes(value)) {
      handleOperator(value);
    } else if (value === '.') {
      inputDecimal();
    } else {
      inputDigit(value);
    }
  });
});
