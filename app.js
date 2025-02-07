const display = document.getElementById("display");


function appendToDisplay(inputValue) {
    if (isNaN(inputValue)) {
        if (!isNaN(display.value[display.value.length - 1])) {
            display.value += inputValue
        }
    }
    else {
        display.value += inputValue
    }
}

function deleteAll() {
    display.value = '';
}

function erase() {
    if (display.value[display.value.length-2] == '.') {
        display.value = display.value.slice(0, -2);
    } else {
        display.value = display.value.slice(0, -1);
    }
}

  
function operate(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '×': return a * b;
        case '÷': return a / b;
        case '%': return a % b;
        case '^': return Math.pow(a, b);
        default: return 0;
    }
}

function calculate() {
    let expValue = display.value;
  
    let values = [];
    let operands = [];
    let i = 0;
  
    while (i < expValue.length) {
      if (expValue[i] === ' ') {
        i++;
        continue;
      }
  
      if (!isNaN(expValue[i]) || expValue[i] === '.') {
        let val = '';
        while (i < expValue.length && (!isNaN(expValue[i]) || expValue[i] === '.')) {
          val += expValue[i];
          i++;
        }
        values.push(parseFloat(val));
        continue;
      }
  
      else if (['+', '-', '×', '÷', '^', '%'].includes(expValue[i])) {
        while (operands.length && getPriority(operands[operands.length - 1]) >= getPriority(expValue[i])) {
          let val2 = values.pop();
          let val1 = values.pop();
          let op = operands.pop();
          values.push(operate(val1, val2, op));
        }
        operands.push(expValue[i]);
      } else {
        console.error(`Неизвестный символ: ${expValue[i]}`);
      }
      i++;
    }
  
    while (operands.length) {
      let val2 = values.pop();
      let val1 = values.pop();
      let op = operands.pop();
      values.push(operate(val1, val2, op));
    }
  
    if (values.length === 1) {
      display.value = values[0];
    } else {
        display.value = values[0];;
    }
  }
  
function getPriority(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '×' || op === '÷' || op === '%') return 2;
    if (op === '^') return 3;
    return 0;
}

window.addEventListener("beforeunload", () => {
    const inputValue = document.getElementById("display").value;
    localStorage.setItem("inputValue", inputValue);
  });
  
  if (localStorage.getItem("inputValue")) {
    const inputValue = localStorage.getItem("inputValue");
    document.getElementById("display").value = inputValue;
  }
  
  
  
