
var resultScreen = null;
var memory = null;
var operation = null;
var historyP = null;
var screenContainsMemory = false;

window.onload = function () {
    resultScreen = document.getElementById("result-screen");
    historyP = document.getElementById("history");
    resultScreen.value = "0";
}

function numClicked(button) {
    button.blur();
    if (screenContainsMemory) {
        screenContainsMemory = false;
        resultScreen.value = "";
    }
    if (resultScreen.value == "0") resultScreen.value = "";
    if (resultScreen.value.endsWith(".") && button.value == ".") return;
    resultScreen.value += button.value;
}

function addClicked(button) {
    button.blur();
    updateHistory("+");
    executePendingOperation();
    operation = (a, b) => a + b;
}

function subtractClicked(button) {
    button.blur();
    if (resultScreen.value.length > 0) {
        updateHistory("-");
        executePendingOperation();
        operation = (a, b) => a - b;
    }
    else {
        resultScreen.value = "-";
    }
}

function multiplyClicked(button) {
    button.blur();
    updateHistory("x");
    executePendingOperation();
    operation = (a, b) => a * b;
}

function divideClicked(button) {
    button.blur();
    updateHistory("/");
    executePendingOperation();
    operation = division;
}

function ceClicked(button) {
    button.blur();
    resultScreen.value = "0";
}

function cClicked(button) {
    button.blur();
    reset();
}

function delClicked(button) {
    button.blur();
    if (resultScreen.value.length > 1 && resultScreen.value != "0") {
        resultScreen.value = resultScreen.value.slice(0, resultScreen.value.length - 1);
    }
    else if (resultScreen.value.length == 1) {
        resultScreen.value = "0";
    }
}

function equalsClicked(button) {
    button.blur();
    executePendingOperation();
    memory = null;
    historyP.innerHTML = "";
    operation = null;
}

function plusMinusClicked(button) {
    button.blur();
    resultScreen.value = -1 * parseFloat(resultScreen.value);
}

function division(a, b) {
    if (b == 0) {
        reset();
        resultScreen.value = "Cannot divide by zero";
        screenContainsMemory = true;
        throw "Division by zero";
    }
    else {
        return a / b;
    }
}

function updateHistory(operator) {
    if (screenContainsMemory) {
        historyP.innerHTML = historyP.innerHTML.substring(0, historyP.innerHTML.length - 1) + operator;
    } else {
        historyP.innerHTML += resultScreen.value + operator;
    }
}

function reset() {
    memory = null;
    operation = null;
    historyP.innerHTML = "";
    resultScreen.value = "0";
    screenContainsMemory = false;
}

function executePendingOperation() {
    if (screenContainsMemory) return;

    var scr = Number.parseFloat(resultScreen.value);
    if (operation) {
        memory = operation(memory, scr);
    } else {
        memory = scr;
    }
    screenContainsMemory = true;
    resultScreen.value = memory;
}