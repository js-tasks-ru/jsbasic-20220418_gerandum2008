/**
 * Эту функцию трогать не нужно
 */
function print(text) {
	console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
if(!!name){let foundPos = name.indexOf(' ');
	return((name.length >= 4 && foundPos == -1))
  }
else{return false}
}

function sayHello() {
	let userName = prompt('Введите ваше имя');

	if (isValid(userName)) {
		print(`Welcome back, ${userName}!`);
	} else {
		print('Некорректное имя');
	}
}
sayHello();