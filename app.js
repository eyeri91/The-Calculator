const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const allClear = document.querySelector('.all-clear');
const clear = document.querySelector('.clear');
const preOperand = document.querySelector('.previous-operand');
const curOperand = document.querySelector('.current-operand');

let firstNum = '';
let secondNum = '';
let savedNum = '';

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

// Round the long decmials 
// Avoid 'divide by 0'
function divide(num1, num2) {
    if (num2 === 0) {
        return "Infinity"
    }
    // return num1 / num2;
    return round(num1 / num2);
}

function round(num) {
    let fNum = Number((Math.abs(num) * 10000).toPrecision(15));
    return Math.round(fNum) / 10000 * Math.sign(num);
}


function operate(operator, num1, num2) {
    return operator(num1, num2);
}

numbers.forEach(number =>
    (number.addEventListener('click', () => getNewOperand(number.textContent)))
)

function getNewOperand(number) {
    if (number === '0'
        && (curOperand.innerHTML === '')) return
    curOperand.innerHTML += number;
}

operators.forEach(operator =>
    (operator.addEventListener('click', () => displayNum(operator.textContent)))
)

function displayNum(operator) {
    savedNum += curOperand.innerHTML;
    savedNum += ` ${operator} `
    preOperand.innerHTML += savedNum;

    // Reset the current number display to get a new number;
    resetCurrentNum();
    savedNum = '';
}

resetCurrentNum = () => curOperand.innerHTML = '';
// resetSavedNum = () => savedNum = '';