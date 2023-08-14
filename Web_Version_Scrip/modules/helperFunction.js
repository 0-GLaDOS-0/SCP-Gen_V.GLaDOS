/*export*/ const codShow = {
	On () {
		let elementsCod = Array.from(document.querySelectorAll(".cod"));
		
		for (let p of elementsCod) {
			p.removeAttribute("hidden", '');
		}
	},
	Off () {
		let elementsCod = Array.from(document.querySelectorAll(".cod"));

		for (let p of elementsCod) {
			p.setAttribute("hidden", '');
		}
	}
};

/*export*/ const editArgum = (obj, Arg, parm) => {//Эта функция нужна для изменения свойств обекта passageInformation. тобавляя эту функцию мы уменьшаем количество кода
	if (is.Array(Arg)) { //Если переданный в функцию параметр Arg являеться масивом с названиями параметрами в нутри, то функция будет использовать цикл for для перебора этих названий
		for (let argum of Arg) { //Цик помогает ещё сократить количество строк в коде, что бы не вызывать функцию editArgum четыре разаа, мы передадим в один вызов функции, те параметры которые должны быть с одинаковыми значениями
			if (is.Object(parm)) {//Это проверка на то являеться ли parm обектом, или в него передали только значение только одного параметра - value

				Object.defineProperty(obj, argum, parm)
			} 
			else if (is.Function(parm)) {

				Object.defineProperty(obj, argum, {value: parm()})
			} 
			else if ( is.String(parm) || is.Number(parm) || is.Boolean(parm) ) {
				Object.defineProperty(obj, argum, {value: parm})
			} 
		} 
	} 
	else if (is.String(Arg)) {
		if (is.Object(parm)) {//Это проверка на то являеться ли parm обектом, или в него передали только значение только одного параметра - value

			Object.defineProperty(obj, Arg, parm)
		} 
		else if (is.Function(parm)) {

			Object.defineProperty(obj, Arg, {value: parm()})
		} 
		else if ( is.String(parm) || is.Number(parm) || is.Boolean(parm) ) {
			Object.defineProperty(obj, Arg, {value: parm})
		} 
	}
}; //Если в функцию передали только один параметр Arg то она выполнит это относительного него

/*export*/ const is = { //Этот объкт с методами нужен для того что бы однозначно проверить являеться ли значение в переменной объектом или же другим каким-то объектом, возвращает логическое значение
	Object (i) {return Object.prototype.toString.call(i) === '[object Object]'},
	Array (i) {return Object.prototype.toString.call(i) === '[object Array]'},
	Function (i) {return Object.prototype.toString.call(i) === '[object Function]'},
	String (i) {return Object.prototype.toString.call(i) === '[object String]'},
	Number (i) {return Object.prototype.toString.call(i) === '[object Number]'},
	Boolean (i) {return Object.prototype.toString.call(i) === '[object Boolean]'},
	Symbol (i) {return Object.prototype.toString.call(i) === '[object Symbol]'}
};

//Обявление вспомогательных функций через методы объекта rundom
/*export*/ const rundom = {
	number(min, max) { //Возвращет случайное число в заданном диапазоне min-max
		return Math.floor( ran() * (max - min + 1)) + min;
	},
	boolean() { //Возвращает случайным убразом true или false
		const a = Math.floor( ran() * 2)
			
		if (a == 1) {
			return true;
		} else { return false; }
	}
};
/*export*/ const ran = () => {
  let num1 = `${globalThis.seedNum.next()}`;
  let num2 = `${globalThis.seedNum.next()}`;
  let result = parseFloat(`0.${num1[num1.length-2]}${num2[num2.length-2]}${num1[num1.length-4]}${num2[num2.length-4]}`);
  return result
};

/*export*/ const strRepl = (str) => { //функция которая заменяет похожие символы, что бы не было путаницы между рус и англ языком
  let from = "уехаросіУКЕНХВАРОСМИТ0ЁЙ3І"; //то-что заменяем
  let to = "yexapociYKEHXBAPOCMNTOENЗI"; //то-чем заменяем
  
  for (let i=0; i<str.length; i++) { //прохордится по каждому элементу в строке
    if ( from.includes(str[i]) ) {
      str = str.replaceAll(i, to[from.indexOf(str[i])] );
    } //заменяет в строке символ на другой символ с таким же индексом как у первого (индекс в масивах from и to)
  }
  return str;
};

/*export*/ const seedGen = (abc) => { //функция для гинерации сида из 8 случайных сиволов, если пользователь сам не ввёл его
	let gen ='';
	num = 0;

	for (let i = 0; i < 8; i++) {
		gen += abc[Math.floor( Math.random() * ((abc.length-1)/*max*/ - 0/*min*/ + 1)) + 0/*min*/]
	};
	gen = strRepl(gen); //преобразование сида заменой некоторых символов на похожие из англи раскладки
	seed = gen;

	 for (let i = 0; i < gen.length; i++) {//здесь seed воспринимаеться как число, записаное в системе счисления abc, этот цикл форм, написан по принципу перевода числа из одной системы счисления, в другую
		num += abc.indexOf(gen[i]) * Math.pow(abc.length, gen.length-(1+i));
	};
  
	return num;
};

/*export*/ const writeCod = (textCordRoom) => { //функция добавляет элемент с текстом в элемент таблицы
	let td = document.getElementById(textCordRoom);
	let cordRoom = Number(textCordRoom);
	let cod = floorPlan[cordRoom].cod;

	let p = document.createElement('p');

	p.textContent = cod;
	p.setAttribute("class", "cod");

	td.append(p);
};
 
/*export*/ const chekKeysRoom = (zone='L') => {
	//Нужно сделать счётчики особых комнат для зоны хард и офисов отдельно
	let specialRoom = counter.ofSpecialRooms/*zone*/;
	let arraySpecialRooms = [];

	if (zone === 'L') {
		for (let cordSpecialRoom of specialRoom) {
			let room = floorPlan[cordSpecialRoom];
			let codRoom = room.cod;
			let structureRoom = room.structure;

			if (codRoom === 'DCL' ||
				codRoom === 'EXT') {
				arraySpecialRooms.push(cordSpecialRoom);
			} else {continue}
		}
	} else if (zone === 'H') {} else if (zone === 'O') {}
	
	return arraySpecialRooms;
};

/*export*/ const coppyObject = (object) => { //вспомогательная функция для копирования объектов
	return JSON.parse( JSON.stringify(object) );
};