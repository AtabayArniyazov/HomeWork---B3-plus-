"use strict";

var button1 = document.getElementById('button1'),
	button2 = document.getElementById('button2'),
	button3 = document.getElementById('button3'),
	button4 = document.getElementById('button4'),
	button5 = document.getElementById('button5'),
	button6 = document.getElementById('button6'),
	button7 = document.getElementById('button7'),
	button8 = document.getElementById('button8'),
	button9 = document.getElementById('button9'),
	button0 = document.getElementById('button0'),
	buttonDot = document.getElementById('buttonDot'),
	buttonBracketLeft = document.getElementById('buttonBracketLeft'),
	buttonBracketRight = document.getElementById('buttonBracketRight'),
	buttonDivide = document.getElementById('buttonDivide'),
	buttonMultiply = document.getElementById('buttonMultiply'),
	buttonMinus = document.getElementById('buttonMinus'),
	buttonPlus = document.getElementById('buttonPlus'),
	buttonEquality = document.getElementById('buttonEquality'),
	buttonReset = document.getElementById('buttonReset'),
	display = document.getElementById('display');

	display.innerHTML = 0;

//ф-ция для того чтоб отображала на индикаторе то, что Мы делаем
function buttonClick(argument) {
	argument.onclick = function() {
		if (display.innerHTML[0] == 0) {
			display.innerHTML = argument.value;
		} else {
			display.innerHTML += argument.value;
		}
	}
}

//ф-ция для того чтоб обнулял индикатор
buttonReset.onclick = function() {
	display.innerHTML = 0;
}

//ф-ция, когда Мы кликаем на "="
buttonEquality.onclick = function() {
	var arrForCalcFragment = [];
	var displayVal = [];

//разбираем на части числа, скобки и +,-,*,/ 
	for (var i = 0; i < display.innerHTML.length; i++) {
		if (isNaN(display.innerHTML[0]) === true && "+") {
			var temporary = display.innerHTML[0];
			displayVal.push(temporary);
			display.innerHTML = display.innerHTML.replace(temporary, "");
			i -= 1;
		} else if (isNaN(display.innerHTML[0]) === true && "-") {
			var temporary1 = display.innerHTML[0];
			displayVal.push(temporary1);
			display.innerHTML = display.innerHTML.replace(temporary1, "");
			i -= 1;
		} else if (isNaN(parseFloat(display.innerHTML)) === false) {
			var temporary2 = String(parseFloat(display.innerHTML));
			displayVal.push(temporary2);
			display.innerHTML = display.innerHTML.replace(temporary2, "");
			i -= 1;
		} else {
			var temporary3 = display.innerHTML[0];
			displayVal.push(temporary3);
			display.innerHTML = display.innerHTML.replace(temporary3, "");
			i -= 1;
		}
	}
	
//например "3" - число 3 это строка, так вот Мы эти числа переводим в числа 
	for (var i = 0; i < displayVal.length; i++) {
		if (isNaN(displayVal[i]) === false) {
			arrForCalcFragment.push(parseFloat(displayVal[i]));
		} else {
			arrForCalcFragment.push(displayVal[i]);
		}
	}

// вызываем ф-цию calcFragment с готовым массивом
	display.innerHTML = calcFragment(arrForCalcFragment);
}

// функция calcFragment которая получает массив, считает и возвращает ответ
function calcFragment(argument) {
	for (var i = 0; i < argument.length; i++) {
		if (argument[i] === "(") {
			var splce;

			if (i === 0) {
				splce = argument.splice(i, i+5);
			} else {
				splce = argument.splice(i, i+4);
			}

			splce.forEach(function(val, ind, arr) {
				if (arr[ind] === "+") {
					splce = arr[ind-1] + arr[ind+1];
				} else if (arr[ind] === "-") {
					splce = arr[ind-1] - arr[ind+1];
				} else if (arr[ind] === "*") {
					splce = arr[ind-1] * arr[ind+1];
				} else if (arr[ind] === "/") {
					splce = arr[ind-1] / arr[ind+1];
				}

				return splce;
			});

			argument.splice(i, 0, splce);
		}


	}

	for (var i = 0; i < argument.length; i++) {
		if (argument[i] === "*") {
			var splce = argument.splice(i-1, 3);
			splce = parseFloat(splce[0]) * parseFloat(splce[2]);
			argument.splice(i-1, 0, splce);
			i--;
		}
	}

	for (var i = 0; i < argument.length; i++) {
		if (argument[i] === "/") {
			var splce = argument.splice(i-1, 3);
			splce = parseFloat(splce[0]) / parseFloat(splce[2]);
			argument.splice(i-1, 0, splce);
			i--;
		}
	}

	for (var i = 1; i < argument.length; i++) {
		if (argument[i] === "-") {
			var splce = argument.splice(i-1, 3);
			splce = parseFloat(splce[0]) - parseFloat(splce[2]);
			argument.splice(i-1, 0, splce);
			i--;
		}
	}

	for (var i = 1; i < argument.length; i++) {
		if (argument[i] === "+") {
			var splce = argument.splice(i-1, 3);
			splce = parseFloat(splce[0]) + parseFloat(splce[2]);
			argument.splice(i-1, 0, splce);
			i--;
		}
	}

	return argument;
}

buttonClick(button1);
buttonClick(button2);
buttonClick(button3);
buttonClick(button4);
buttonClick(button5);
buttonClick(button6);
buttonClick(button7);
buttonClick(button8);
buttonClick(button9);
buttonClick(button0);
buttonClick(buttonDot);
buttonClick(buttonBracketLeft);
buttonClick(buttonBracketRight);
buttonClick(buttonDivide);
buttonClick(buttonMultiply);
buttonClick(buttonMinus);
buttonClick(buttonPlus);