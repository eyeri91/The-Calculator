const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const allClear = document.querySelector('.all-clear');
const clear = document.querySelector('.clear');
const equals = document.querySelector('.equals');
const decimal = document.querySelector('.decimal');
const preOperand = document.querySelector('.previous-operand');
const curOperand = document.querySelector('.current-operand');


let firstNum = '';
let secondNum = '';
let curOperator = '';
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
        return alert("Infinity! Don't divide numbers by 0.");
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

allClear.addEventListener('click', resetAll)

function resetAll() {
    preOperand.innerHTML = '';
    curOperand.innerHTML = '';
    firstNum = '';
    secondNum = '';
    curOperator = '';
}

numbers.forEach(number =>
    (number.addEventListener('click', () => getNewOperand(number.textContent)))
)

function getNewOperand(number) {
    curOperand.innerHTML += number;
}

operators.forEach(operator =>
    (operator.addEventListener('click', () => displayNum(operator.textContent)))
)


function displayNum(operator) {
    firstNum = curOperand.innerHTML;
    curOperator = operator;

    if (firstNum === '') return alert("Enter the operand first")

    preOperand.innerHTML += ` ${firstNum} ${curOperator}`;

    // Reset the current number display to get a new number;
    resetCurrentNum();
    firstNum = '';
}

resetCurrentNum = () => curOperand.innerHTML = '';
// resetSavedNum = () => savedNum = '';


// How to not to start with operator?
// How to