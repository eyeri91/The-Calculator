class Calculator {
    constructor(preOperandTextElement, curOperandTextElement) {
        this.preOperandTextElement = preOperandTextElement;
        this.curOperandTextElement = curOperandTextElement;
        this.allClear()
    }

    clear() {
        this.currentOperand = this.currentOperand.slice(0, -1);
        this.updateDisply()
    }

    allClear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operator = undefined;
        this.updateDisply()
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
        this.operator = operator;
        this.previousOperand = `${this.currentOperand} ${operator}`
        this.currentOperand = '';
        // this.previousOperand = this.currentOperand + operator;
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
})

allClear.addEventListener('click', () => {
    calculator.allClear()
})

clear.addEventListener('click', () => {
    calculator.clear()
})