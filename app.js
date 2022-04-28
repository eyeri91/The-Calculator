const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const allClear = document.querySelector('.all-clear');
const clear = document.querySelector('.clear');
const savedInput = document.querySelector('.saved-input');
const currentNum = document.querySelector('.current-num');

let input = '';
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
    (number.addEventListener('click', () => getNewNumber(number.textContent)))
)

// How to avoid having 0 as the first number?
function getNewNumber(number) {
    currentNum.innerHTML += number;
}

operators.forEach(operator =>
    (operator.addEventListener('click', () => displayNewNum(operator.textContent)))
)

function displayNewNum(operator) {
    savedNum += currentNum.innerHTML;
    savedNum += ` ${operator} `
    savedInput.innerHTML += savedNum;

    // Reset the current
    resetCurrentNum();
    savedNum = '';
}


resetCurrentNum = () => currentNum.innerHTML = '';
// resetSavedNum = () => savedNum = '';