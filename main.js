var resultScreen = null;
var memory = null;
var operation = null;
var historyScreen = null;
var screenContainsUserInput = true;

window.onload = function () {
    resultScreen = document.getElementById("result-screen");
    historyScreen = document.getElementById("history-screen");
    resultScreen.value = "0";
}

function numClicked(button) {
    button.blur();
    if (!screenContainsUserInput) {
        resultScreen.value = "";
        screenContainsUserInput = true;
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
    } else {
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
    if (resultScreen.value.length > 1) {
        resultScreen.value = resultScreen.value.slice(0, resultScreen.value.length -1);
    } else {
        resultScreen.value = "0";
    }
}

function plusMinusClicked(button) {
    button.blur();
    resultScreen.value = -1 * parseFloat(resultScreen.value);
}

function equalsClicked(button) {
    button.blur();
    executePendingOperation();
    memory = null;
    historyScreen.innerHTML = "";
    operation = null;
}

function executePendingOperation() {
    if (!screenContainsUserInput) return;

    var scr = Number.parseFloat(resultScreen.value);
    if (operation) {
        memory = operation(memory, scr);
    }
    else {
        memory = scr;
    }
    resultScreen.value = memory;
    screenContainsUserInput = false;
}

function updateHistory(operator) {
    if (screenContainsUserInput) {
        historyScreen.innerHTML += resultScreen.value + operator;
    } else {
        historyScreen.innerHTML = historyScreen.innerHTML.substring(0, historyScreen.innerHTML.length - 1) + operator;
    }
}

function reset() {
    memory = null;
    operation = null;
    historyScreen.innerHTML = "";
    resultScreen.value = "0";
    screenContainsUserInput = true;
}

function division(a,b) {
    if (b == 0) {
        reset();
        resultScreen.value = "Cannot divide by zero";
        screenContainsUserInput = false;
        throw "Division by zero";
    }
    return a/b;
}