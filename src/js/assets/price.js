var dollar = 26.7;
var samsung = 750 * dollar;
var xiaomi = 650 * dollar;


var Samsung = document.getElementById('samsung');
var Xiaomi = document.getElementById('xiaomi');
var answer = document.getElementById('answer');



if(dollar > 26 || dollar === 26) {
    Samsung.innerHTML = samsung;
    Xiaomi.innerHTML = xiaomi;
} else {
    document.getElementById('app').style.display = 'none';
    answer.innerHTML = 'Товара немає в наявності'
}