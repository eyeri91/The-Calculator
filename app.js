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


equals.addEventListener('click', evaluate);

function evaluate() {
    if ((preOperand === '' && curOperand === '')
        || (preOperand === '' && curOperand !== '')
        || (preOperand !== '' && curOperand === '')) return;
    let preInputList = preOperand.innerHTML.trim().split(' ');
    console.log(preInputList);

}

function operate(num1, operator, num2) {
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

clear.addEventListener('click', clearLastInput)

// How to move preoperand to cur operand without operator and erase one by one?
function clearLastInput() {
    if (curOperand.innerHTML === '' && preOperand.innerHTML === '') return
    // if (curOperand.innerHTML === '' && preOperand.innerHTML !== '') {
    //     firstNum = 
    // }
    firstNum = curOperand.innerHTML.slice(0, -1);
    curOperand.innerHTML = firstNum;
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
    (operator.addEventListener('click', () => displayNum(operator.textContent)))
)


function displayNum(operator) {
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


