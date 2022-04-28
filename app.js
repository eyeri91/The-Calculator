
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