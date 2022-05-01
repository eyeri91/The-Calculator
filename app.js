const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const allClear = document.querySelector('.all-clear');
const clear = document.querySelector('.clear');
const equals = document.querySelector('.equals');
const decimal = document.querySelector('.decimal');
const preOperand = document.querySelector('.previous-operand');
const curOperand = document.querySelector('.current-operand');


let firstNum = '';
let nextNum = '';
let curOperator = '';
let savedNum;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return alert("Infinity! Don't divide numbers by 0.");
    }
    return round(num1 / num2);
}

function remainder(num1, num2) {
    return num1 % num2;
}

function round(num) {
    let fNum = Number((Math.abs(num) * 10000).toPrecision(15));
    return Math.round(fNum) / 10000 * Math.sign(num);
}


equals.addEventListener('click', () => evaluate());

function evaluate() {
    let previousInput = preOperand.innerHTML;
    let currentInput = curOperand.innerHTML;
    if ((previousInput === '' && currentInput === '')
        || (previousInput === '' && currentInput !== '')
        || (previousInput !== '' && currentInput === '')) return;


    let preInputList = preOperand.innerHTML.trim().split(' ');
    let totalOperation = preInputList.join(' ') + ` ${curOperand.innerHTML}`;
    let result = calculateByOrder(preInputList);
    displayResult(result, totalOperation);
}

function calculateByOrder(preInputList) {
    let num1 = Number(preInputList[0]);
    let operator = preInputList[1];

    if (preInputList.length === 2) {
        let num2 = Number(curOperand.innerHTML);
        return operate(num1, operator, num2);

    } else {
        let num2 = Number(preInputList[2]);
        let previousOperation = operate(num1, operator, num2);
        preInputList.splice(0, 3);
        preInputList.unshift(previousOperation);
        return calculateByOrder(preInputList);
    }
}

function operate(num1, operator, num2) {
    if (operator === '+') {
        operator = add;
    } else if (operator === '-') {
        operator = subtract;
    } else if (operator === 'x') {
        operator = multiply;
    } else if (operator === '÷') {
        operator = divide;
    } else if (operator === '%') {
        operator = remainder;
    }
    return operator(num1, num2);
}

function displayResult(result, totalOperation) {
    preOperand.innerHTML = totalOperation;
    curOperand.innerHTML = result;
}

allClear.addEventListener('click', resetAll)

function resetAll() {
    preOperand.innerHTML = '';
    curOperand.innerHTML = '';
    firstNum = '';
    nextNum = '';
    curOperator = '';
    savedNum = '';

}

clear.addEventListener('click', clearLastInput)

// How to move preoperand to cur operand without operator and erase one by one?
function clearLastInput() {
    let previousInput = preOperand.innerHTML;
    let currentInput = curOperand.innerHTML;
    if (currentInput === '' && previousInput === '') return
    if (currentInput !== '') {
        firstNum = curOperand.innerHTML.slice(0, -1);
        curOperand.innerHTML = firstNum;
    }
    if (previousInput !== '' && currentInput === '') {
        firstNum = preOperand.innerHTML.slice(0, -1);
        preOperand.innerHTML = firstNum;
    }
}

decimal.addEventListener('click', addDecimal);

function addDecimal() {
    if (curOperand.innerHTML === '' || curOperand.innerHTML.includes('.')) return
    curOperand.innerHTML += '.';
}

numbers.forEach(number =>
    (number.addEventListener('click', () => getNewOperand(number.textContent)))
)

function getNewOperand(number) {
    curOperand.innerHTML += number;
}

operators.forEach(operator =>
    (operator.addEventListener('click', () => addOperator(operator.textContent)))
)


function addOperator(operator) {
    firstNum = curOperand.innerHTML;
    savedNum = firstNum;
    curOperator = operator;

    if (firstNum === '') return alert("Enter the operand first")

    preOperand.innerHTML += ` ${firstNum} ${curOperator}`;

    // Reset the current number display to get a new number;
    resetCurrentNum();
    firstNum = '';
    return savedNum, curOperator;
}

resetCurrentNum = () => curOperand.innerHTML = '';
// resetSavedNum = () => savedNum = '';



//  Clear function when current operand is empty, erase the last input of the previous operand
//  How to continue the calculation once the first result is out?
// How to not to have indefined after divde by 0 alert?