class Calculator {
    constructor(preOperandTextElement, curOperandTextElement) {
        this.preOperandTextElement = preOperandTextElement;
        this.curOperandTextElement = curOperandTextElement;
        this.allClear()
    }

    clear() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    allClear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operator = undefined;

    }

    add() {

    }

    subtract() {

    }

    divide() {

    }

    multiply() {

    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    getOperator(operator) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.calculate()
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }

    calculate() {
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return

        switch (this.operator) {
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break
            case 'x':
                computation = prev * current;
                break
            case '÷':
                computation = prev / current;
                break
            case '%':
                computation = prev % current;
                break
            default:
                return
        }
        this.currentOperand = computation;
        this.operator = undefined;
        this.previousOperand = '';
    }

    updateDisply() {
        this.curOperandTextElement.innerText = this.currentOperand;
        this.preOperandTextElement.innerText = this.previousOperand;
    }

}


const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const allClear = document.querySelector('.all-clear');
const clear = document.querySelector('.clear');
const equals = document.querySelector('.equals');
const preOperandTextElement = document.querySelector('.previous-operand');
const curOperandTextElement = document.querySelector('.current-operand');


const calculator = new Calculator(preOperandTextElement, curOperandTextElement)

numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisply()
    })
})

operators.forEach(button => {
    button.addEventListener('click', () => {
        calculator.getOperator(button.innerText);
        calculator.updateDisply()
    })
})

equals.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisply()
})

allClear.addEventListener('click', () => {
    calculator.allClear()
    calculator.updateDisply()
})

clear.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisply()
})