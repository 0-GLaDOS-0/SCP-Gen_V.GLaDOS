/*V 3.0*/
//Обявление вспомогательных функций через методы объекта rundom
const rundom = {
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

const strRepl = (str) => { //функция которая заменяет похожие символы, что бы не было путаницы между рус и англ языком
  let from = "уехаросіУКЕНХВАРОСМИТ0ЁЙ3І"; //то-что заменяем
  let to = "yexapociYKEHXBAPOCMNTOENЗI"; //то-чем заменяем
  
  for (let i=0; i<str.length; i++) { //прохордится по каждому элементу в строке
    if ( from.includes(str[i]) ) {
      str = str.replaceAll(i, to[from.indexOf(str[i])] );
    } //заменяет в строке символ на другой символ с таким же индексом как у первого (индекс в масивах from и to)
  }
  return str;
};

const seedAdd = () => {//НАЧАЛО
	let abc = " 0123456789|.,!№;%:?-=+;:~><|*()/AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzАаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЬьЫыЭэЮюЯяІіЇїЄє";
	globalThis.seed = document.getElementById("seed").value;
	globalThis.seedNum = ""; //объявление ГЛОБАЛЬНОЙ ПЕРЕМЕННОЙ

	//преобразование сида
	seed = strRepl(seed); //заменяет символы, для уменьшения путаницы
	for (j=0;  (j < seed.length) && (j < 8); j++) { //функция функция которая вычисляет значение seedNum 
		seedNum += abc.indexOf(seed[j]); //здесь мы ищем индекс символа из seed в словаре "abc", и складываем все индексы в одно число 
	};
  
	seedNum = (seedNum || 455534396169); //Записывает в переменную значение 455534396169(GLaDOS), если значение seedNum равно 0, undefined, null
  globalThis.seedHTML = seedNum;

	seedNum = { //оздание нового объекта в переменную seedNum, при этом старое знаечение переменной записывается как совойство нового объекта
	  seed: +seedNum,
	  next: function() { //здесь при вызове метода значение seed сразу же и записывается и меняется
	    return globalThis.seedNum.seed = globalThis.seedNum.seed * 48271 % 2147483647;
	  }
	};
};

const ran = () => {
  let num1 = `${globalThis.seedNum.next()}`;
  let num2 = `${globalThis.seedNum.next()}`;
  let result = parseFloat(`0.${num1[num1.length-2]}${num2[num2.length-2]}${num1[num1.length-4]}${num2[num2.length-4]}`);
  return result
};

const is = {
	Object (i) {return Object.prototype.toString.call(i) === '[object Object]'},
	Array (i) {return Object.prototype.toString.call(i) === '[object Array]'},
	Function (i) {return Object.prototype.toString.call(i) === '[object Function]'},
	String (i) {return Object.prototype.toString.call(i) === '[object String]'},
	Number (i) {return Object.prototype.toString.call(i) === '[object Number]'},
	Boolean (i) {return Object.prototype.toString.call(i) === '[object Boolean]'},
	Symbol (i) {return Object.prototype.toString.call(i) === '[object Symbol]'}
};

const editArgum = (obj, Arg, parm) => {//Эта функция нужна для изменения свойств обекта passageInformation. тобавляя эту функцию мы уменьшаем количество кода
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


//Обявление переменных
const variableDeclaration = () => {
	globalThis.floorPlan = new Array(99); /*Массив содержащий комнаты как элементы, 
	индекс элеммента это координата комнаты, 
	функция Array() заполняет весь масив 99тью undefined - что бы потом можно было удобней заменять на болванки*/
	/*const maxRooms = 50;*/
	globalThis.minRooms = rundom.number(30, 50);
	globalThis.numberOfRooms = 0; //Счётчик количества комнат на плане
	globalThis.numberOfRings = []; //Счётчик колец, который хранит в себе информацию о том где были поставлены кольца, а количество колец получаем через numberOfRings.lenth
	globalThis.roomSample = { //Ячейка
		coords: null,
		file: null, //Для того что бы знать какой картинкой отображать эту комнату при визуализации
		type: null, //Нужно что бы знать, подвергалась ли комната изменениям, и какой тип этой комнаты
		s15: 0, //краткая запись шлюзов комнаты
		rotate: 0, //угол на который нужно повернуть исходник при построении визуализации
		passageInformation: {
			up: null,
			right: null,
			down: null,
			left: null
		}
	};
	globalThis.corn = rundom.number(0, 99) //Кордината startRoom - зерно
	globalThis.startRoom = {//Объект стартовой(зерновой) комнаты
		coords: corn,
		file: null,
		type: 'changed',
		s15: 0,
		rotate: 0,
		passageInformation: {
			up: rundom.boolean(),
			right: rundom.boolean(),
			down: rundom.boolean(),
			left: rundom.boolean()
		}
	};
	while (startRoom.passageInformation.up == false &&
		startRoom.passageInformation.right == false &&
		startRoom.passageInformation.down == false &&
		startRoom.passageInformation.left == false) { //Проверка стартовой комнаты на наличие выходов

		let pasInfo = startRoom.passageInformation

		editArgum(pasInfo, ["up", "right", "down", "left"], rundom.boolean);
	};
};


//Основные функции
const autoFillFloarPlan = () => { //Заполняет floorPlan пустыми Объектами комнат и присваетвает им координаты(порядковый номер в масиве)
	for (cordRoom = 0; cordRoom <= 99; cordRoom++) { //Клонирует roomSample в floorPlan
		floorPlan[cordRoom] = JSON.parse( JSON.stringify(roomSample) )  //Двойная конвертация что бы избежать мутаци
		floorPlan[cordRoom].coords = cordRoom //Присваивание координат пустым комнатам(дальше - болванкам)
	};
	floorPlan[corn] = startRoom //Вставлю ссылку на оригинальный Объект (поэтому и присваивать координаты не нужно)
};
const visitRoom = () => {
	for (cordRoom = 0; cordRoom <= 99; cordRoom++) {

		let room = floorPlan[cordRoom];
		let typeRoom = floorPlan[cordRoom].type;
		let up = floorPlan[cordRoom].passageInformation.up;
		let right = floorPlan[cordRoom].passageInformation.right;
		let down = floorPlan[cordRoom].passageInformation.down;
		let left = floorPlan[cordRoom].passageInformation.left;
		let upRoom = floorPlan[cordRoom + 10];
		let rightRoom = floorPlan[cordRoom + 1];
		let downRoom = floorPlan[cordRoom - 10];
		let leftRoom = floorPlan[cordRoom - 1];


		if (cordRoom < 90) { //Проверяет только те комнаты у которы есть соседи с верху (те которыееньше 90)
			let typeUpRoom = floorPlan[cordRoom + 10].type; //для удобства

			if (typeRoom != null &&
				up == true &&
				typeUpRoom == null) { //если наша комната существует (у неё не null тип) и у нашей комнаты есть проход на верх и верхняя комната не существует (имеет null тип)
				editCell.upRoom(upRoom) //тогда изменяем верхнюю комнату 
			}
		};

		if (cordRoom % 10 != 9) {
			let typeRightRoom = floorPlan[cordRoom + 1].type;

			if (typeRoom != null &&
				right == true &&
				typeRightRoom == null) {
				editCell.rightRoom(rightRoom)
			}
		};


		if (cordRoom > 9) {
			let typeDownRoom = floorPlan[cordRoom - 10].type;

			if (typeRoom != null &&
				down == true &&
				typeDownRoom == null) {
				editCell.downRoom(downRoom)
			}
		};

		if (cordRoom % 10 != 0) {
			let typeLeftRoom = floorPlan[cordRoom - 1].type

			if (typeRoom != null &&
				left == true &&
				typeLeftRoom == null) {
				editCell.leftRoom(leftRoom)
			}
		}

	}
};
const editCell = {
	upRoom(upRoom) {
		upRoom.type = 'changed'; //Изменяет состояние комнаты что бы потом было легче отследить какие уже изменены
		editArgum(upRoom.passageInformation, ['up', 'right', 'left'], rundom.boolean);
		editArgum(upRoom.passageInformation, 'down', true);
		/*Trut - потому что мы редактируем верхнюю комнаты от заданной в visit(),
		 поэтому автоматически в этой комнате должен быть проход с низу*/

		numberOfRooms += 1;
		return
	},
	rightRoom(rightRoom) {
		rightRoom.type = 'changed';
		editArgum(rightRoom.passageInformation, ['up', 'right', 'down'], rundom.boolean);
		editArgum(rightRoom.passageInformation, 'left', true);

		numberOfRooms += 1;
		return
	},
	downRoom(downRoom) {
		downRoom.type = 'changed';
		editArgum(downRoom.passageInformation, ['right', 'down', 'left'], rundom.boolean);
		editArgum(downRoom.passageInformation, 'up', true);

		numberOfRooms += 1;
		return
	},
	leftRoom(leftRoom) {
		leftRoom.type = 'changed';
		editArgum(leftRoom.passageInformation, ['up', 'down', 'left'], rundom.boolean);
		editArgum(leftRoom.passageInformation, 'right', true);

		numberOfRooms += 1;
		return
	}
};
const genRing = () => {
	for (cordRoom = 12; cordRoom < 89; cordRoom++) {

		if (cordRoom % 10 != 9 && 
			cordRoom % 10 != 0) {

			let room = floorPlan[cordRoom];
			let typeRoom = floorPlan[cordRoom].type;

			let upRoomPasInfo = floorPlan[cordRoom + 10].passageInformation;
			let rightRoomPasInfo = floorPlan[cordRoom + 1].passageInformation;
			let downRoomPasInfo = floorPlan[cordRoom - 10].passageInformation;
			let leftRoomPasInfo = floorPlan[cordRoom - 1].passageInformation;
			let upRightRoomPasInfo = floorPlan[cordRoom + 11].passageInformation;
			let rightDownRoomPasInfo = floorPlan[cordRoom - 9].passageInformation;
			let downLeftRoomPasInfo = floorPlan[cordRoom - 11].passageInformation;
			let leftUpRoomPasInfo = floorPlan[cordRoom + 9].passageInformation;

			let typeUpRoom = floorPlan[cordRoom + 10].type;
			let typeRightRoom = floorPlan[cordRoom + 1].type;
			let typeDownRoom = floorPlan[cordRoom - 10].type;
			let typeLeftRoom = floorPlan[cordRoom - 1].type;
			
			let typeUpRightRoom = floorPlan[cordRoom + 11].type; //Тип комнаты верху-справа (по диагонали) от заданной
			let typeRightDownRoom = floorPlan[cordRoom - 9].type; //Тип комнаты справа-снизу (по диагонали) от заданной
			let typeDownLeftRoom = floorPlan[cordRoom - 11].type; //Тип комнаты нижней-слева (по диагонали) от заданной
			let typeLeftUpRoom = floorPlan[cordRoom + 9].type; //Тип комнаты левой-сверху (по диагонали) от заданной

			if (typeRoom == 'changed' &&
				typeUpRoom == 'changed' &&
				typeRightRoom == 'changed' &&
				typeDownRoom == 'changed' &&
				typeLeftRoom == 'changed' &&
				typeUpRightRoom == 'changed' &&
				typeRightDownRoom == 'changed' &&
				typeDownLeftRoom == 'changed' &&
				typeLeftUpRoom == 'changed') {

				floorPlan[cordRoom] = JSON.parse( JSON.stringify(roomSample) ); //Замена центральной комнаты в квадрате заполненом комнатами 3х3
				floorPlan[cordRoom].coords = cordRoom;

				let arrayRoom = [upRoomPasInfo, rightRoomPasInfo, downRoomPasInfo, leftRoomPasInfo];
				let arrayArg = ['down', 'left', 'up', 'right'];
				for (let room of arrayRoom) {
					let index = arrayRoom.indexOf(room);
					editArgum(room, arrayArg[index], false)
				};


				//Делает кольцо 3х3, изменяя параметры шлюзов начиная с левого верхней комнаты, заканчивая правым шлюзом левой-верхней комнаты
				arrayRoom = [upRoomPasInfo, upRightRoomPasInfo, rightRoomPasInfo, rightDownRoomPasInfo, downRoomPasInfo, downLeftRoomPasInfo, leftRoomPasInfo, leftUpRoomPasInfo];
				arrayArg = [['left', 'right'], ['left', 'down'], ['up', 'down'], ['up', 'left'], ['right', 'left'], ['right', 'up'], ['down', 'up'], ['down', 'right']];
				for (let room of arrayRoom) {
					let index = arrayRoom.indexOf(room);
					editArgum(room, arrayArg[index], true)
				};

				numberOfRings.push(cordRoom);
				/*console.log('>' + cordRoom);*/
			}
		}
	}
};
const smoothing = () => {
	for (cordRoom = 0; cordRoom <= 99; cordRoom++) {

		let room = floorPlan[cordRoom];
		let upRoom = floorPlan[cordRoom + 10];
		let rightRoom = floorPlan[cordRoom + 1];
		let downRoom = floorPlan[cordRoom - 10];
		let leftRoom = floorPlan[cordRoom - 1];

		let pasInfo = floorPlan[cordRoom].passageInformation;


		//Соеденяет комнату с соседом
		if ((cordRoom < 90) && //проверка на то что комната с такими координатами была не самой верхней потому, что у такой комнату нету соседа с верху, и это вызывает ошибку
			upRoom.type == 'changed' && 
			room.type == 'changed' && 
			(upRoom.passageInformation.down == true || pasInfo.up == true)) {
			
			upRoom.passageInformation.down = true;
			editArgum(pasInfo, 'up', true);
		};
		if ((cordRoom % 10 != 9) &&
			rightRoom.type == 'changed' && 
			room.type == 'changed' &&
			(rightRoom.passageInformation.left == true || pasInfo.right == true)) {
			
			rightRoom.passageInformation.left = true;
			editArgum(pasInfo, 'right', true);
		};
		if ((cordRoom > 9) && 
			downRoom.type == 'changed' && 
			room.type == 'changed' &&
			(downRoom.passageInformation.up == true || pasInfo.down == true)) {
			
			downRoom.passageInformation.up = true;
			editArgum(pasInfo, 'down', true);
		};
		if ((cordRoom % 10 != 0) &&
			leftRoom.type == 'changed' && 
			room.type == 'changed' &&
			(leftRoom.passageInformation.right == true || pasInfo.left == true)) {
			
			leftRoom.passageInformation.right = true;
			editArgum(pasInfo, 'left', true);
		};

		//Уберает у крайних комнат шлюзы ведущие за пределы карты
		if (cordRoom >= 90 &&
			pasInfo.up == true) {editArgum(pasInfo, 'up', false)}; 

		if (cordRoom % 10 == 9 &&
			pasInfo.right == true) {editArgum(pasInfo, 'right', false)};

		if (cordRoom <= 9 &&
			pasInfo.down == true) {editArgum(pasInfo, 'down', false)};

		if (cordRoom % 10 == 0 &&
			pasInfo.left == true) {editArgum(pasInfo, 'left', false)};
	}
};
const endRoom = () => {
	for (cordRoom = 0; cordRoom <= 99; cordRoom++) {

		let room = floorPlan[cordRoom];
		let upRoom = floorPlan[cordRoom + 10];
		let rightRoom = floorPlan[cordRoom + 1];
		let downRoom = floorPlan[cordRoom - 10];
		let leftRoom = floorPlan[cordRoom - 1];
		
		let upGateway = floorPlan[cordRoom].passageInformation.up;
		let rightGateway = floorPlan[cordRoom].passageInformation.right;
		let downGateway = floorPlan[cordRoom].passageInformation.down;
		let leftGateway = floorPlan[cordRoom].passageInformation.left;
		
		if (room.type == 'changed') {

			if (upGateway == true) {
				if (upRoom.type == null) {

					upRoom.file = 'corridor_01.png'
					upRoom.passageInformation = {
						up: false,
						right: false,
						down: true,
						left: false
					};
					upRoom.rotate = 180;
					upRoom.s15 = 4;
					upRoom.type = 'changed';
				}; 
				if (upRoom.type == 'changed' &&
					upRoom.passageInformation.down == false) {room.passageInformation.up = false};
			};
			if (rightGateway == true) {
				if (rightRoom.type == null) {

					rightRoom.file = 'corridor_01.png'
					rightRoom.passageInformation = {
						up: false,
						right: false,
						down: false,
						left: true
					};
					rightRoom.rotate = 270;
					rightRoom.s15 = 8;
					rightRoom.type = 'changed';
				};
				if (rightRoom.type == 'changed' &&
					rightRoom.passageInformation.left == false) {room.passageInformation.right = false};
			};
			if (downGateway == true) {
				if (downRoom.type == null) {

					downRoom.file = 'corridor_01.png'
					downRoom.passageInformation = {
						up: true,
						right: false,
						down: false,
						left: false
					};
					downRoom.rotate = 0;
					downRoom.s15 = 1;
					downRoom.type = 'changed';
				};
				if (downRoom.type == 'changed' &&
					downRoom.passageInformation.up == false) {room.passageInformation.down = false};
			};
			if (leftGateway == true) {
				if (leftRoom.type == null) {

					leftRoom.file = 'corridor_01.png'
					leftRoom.passageInformation = {
						up: false,
						right: true,
						down: false,
						left: false
					};
					leftRoom.rotate = 90;
					leftRoom.s15 = 2;
					leftRoom.type = 'changed';
				};
				if (leftRoom.type == 'changed' &&
					leftRoom.passageInformation.right == false) {room.passageInformation.left = false};
			};
		};
	};
};
const s15 = () => {
	for (cordRoom = 0; cordRoom <= 99; cordRoom++) {

		let upGateway = floorPlan[cordRoom].passageInformation.up;
		let rightGateway = floorPlan[cordRoom].passageInformation.right;
		let downGateway = floorPlan[cordRoom].passageInformation.down;
		let leftGateway = floorPlan[cordRoom].passageInformation.left;

		//Блок конечных комнат
		if (upGateway == true &&
			rightGateway == false &&
			downGateway == false &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 1;
			floorPlan[cordRoom].rotate = 0;
			floorPlan[cordRoom].file = 'corridor_01.png';
		}
		else if (upGateway == false &&
			rightGateway == true &&
			downGateway == false &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 2;
			floorPlan[cordRoom].rotate = 90;
			floorPlan[cordRoom].file = 'corridor_01.png';
		}
		else if (upGateway == false &&
			rightGateway == false &&
			downGateway == true &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 4;
			floorPlan[cordRoom].rotate = 180;
			floorPlan[cordRoom].file = 'corridor_01.png';
		}
		else if (upGateway == false &&
			rightGateway == false &&
			downGateway == false &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 8;
			floorPlan[cordRoom].rotate = 270;
			floorPlan[cordRoom].file = 'corridor_01.png';
		}

		//Блок прямых коридоров
		else if (upGateway == true &&
			rightGateway == false &&
			downGateway == true &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 5;
			floorPlan[cordRoom].rotate = 0;
			floorPlan[cordRoom].file = 'corridor_05.png';
		}
		else if (upGateway == false &&
			rightGateway == true &&
			downGateway == false &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 10;
			floorPlan[cordRoom].rotate = 90;
			floorPlan[cordRoom].file = 'corridor_05.png';
		}

		//Блок изогнутых коридоров(поворотов)
		else if (upGateway == true &&
			rightGateway == true &&
			downGateway == false &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 3;
			floorPlan[cordRoom].rotate = 0;
			floorPlan[cordRoom].file = 'corridor_03.png';
		}
		else if (upGateway == false &&
			rightGateway == true &&
			downGateway == true &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 6;
			floorPlan[cordRoom].rotate = 90;
			floorPlan[cordRoom].file = 'corridor_03.png';
		}
		else if (upGateway == false &&
			rightGateway == false &&
			downGateway == true &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 12;
			floorPlan[cordRoom].rotate = 180;
			floorPlan[cordRoom].file = 'corridor_03.png';
		}
		else if (upGateway == true &&
			rightGateway == false &&
			downGateway == false &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 9;
			floorPlan[cordRoom].rotate = 270;
			floorPlan[cordRoom].file = 'corridor_03.png';
		}

		//Блок тройных развилок
		else if (upGateway == true &&
			rightGateway == true &&
			downGateway == false &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 11;
			floorPlan[cordRoom].rotate = 270;
			floorPlan[cordRoom].file = 'corridor_07.png';
		}
		else if (upGateway == true &&
			rightGateway == true &&
			downGateway == true &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 7;
			floorPlan[cordRoom].rotate = 0;
			floorPlan[cordRoom].file = 'corridor_07.png';
		}
		else if (upGateway == false &&
			rightGateway == true &&
			downGateway == true &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 14;
			floorPlan[cordRoom].rotate = 90;
			floorPlan[cordRoom].file = 'corridor_07.png';
		}
		else if (upGateway == true &&
			rightGateway == false &&
			downGateway == true &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 13;
			floorPlan[cordRoom].rotate = 180;
			floorPlan[cordRoom].file = 'corridor_07.png';
		}

		//Блок четверных развилок
		else if (upGateway == true &&
			rightGateway == true &&
			downGateway == true &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 15;
			floorPlan[cordRoom].rotate = 0;
			floorPlan[cordRoom].file = 'corridor_15.png';
		} 
		else if (floorPlan[cordRoom].type == 'changed') { //Если не один из выше перечисленых комбинаций шлюзов не подошёл, но при этом комната указана как "изменина". ТО в гинерации возникла ошибка и тогда на карту выводиться особое изображение комнаты с ошибкой. Для того что бы таблица не ломалась
			floorPlan[cordRoom].s15 = 'Error';
			floorPlan[cordRoom].rotate = 0;
			floorPlan[cordRoom].file = 'corridor_Error.png'}
	}
};
const visual = () => {

	//Изменяет значение параметров в panel нф HTML странице
	document.getElementById("showSeed").textContent = `Сиид: ${seed}`;
	document.getElementById("showSeedNum").textContent = `Номер Сида: ${seedHTML}`
	document.getElementById("showRing").textContent = `Колец: ${numberOfRings.length}`;
	document.getElementById("showRoom").textContent = `Количество комнат: ${numberOfRooms}`;


	for (i = 0; i < 10; i++) {
		for (j = 0; j < 10; j++) {
			let cordRoom = Number(`${i}` + `${j}`)
			if (floorPlan[cordRoom].type == 'changed') {
				let img = document.getElementById(`img_${i}${j}`)

				let file_img = floorPlan[cordRoom].file
				let s15 = floorPlan[cordRoom].s15
				let rotate = floorPlan[cordRoom].rotate

				img.setAttribute('src', `${file_img}`)
				img.setAttribute('alt', `corridor_${s15}`)
				img.setAttribute('style', `transform: rotate(${rotate}deg)`)
			}
		}
	}
};


//Пошговое выполнение
const start = () => {
	event.preventDefault(); //нужно только для того что бы страница не перезагружалась при нажатии "enter"

	fillTable('clear');
	seedAdd();
	variableDeclaration();
	autoFillFloarPlan();
	const writingValues = []; //"список" количеств комнат для их сравнения
	while (numberOfRooms < minRooms) {
		visitRoom();

		writingValues.push(numberOfRooms); //Добавление значения numberOfRooms после последнего visitRoom

		if (writingValues[writingValues.length-2] == numberOfRooms) { //если предидущее значение numberOfRooms равно текущемму, то должна проводиться повторная генерация
			
			let pasInfo = startRoom.passageInformation;
			corn = rundom.number(0, 99); //Изменяем координаты стартовой комнаты
			editArgum(pasInfo, ['up', 'right', 'down', 'left'], rundom.boolean);//изменяем startRoom

			while (startRoom.passageInformation.up == false &&
				startRoom.passageInformation.right == false &&
				startRoom.passageInformation.down == false &&
				startRoom.passageInformation.left == false) { //Проверка стартовой комнаты на наличие выходов

				editArgum(pasInfo, ['up', 'right', 'down', 'left'], rundom.boolean);
			};
			
			floorPlan.length = 0; //Очищаем старый план полностью, чтобы не морочиться с одной комнатой
			autoFillFloarPlan(); //Генерируем план заново
			numberOfRooms = 0; 
			writingValues.length = 0; //зачищение списка, т.к. создать новый нельзя из-за const
		}
	};
	genRing();
	smoothing();
	endRoom();
	s15();
	visual();
	con_visual();
};

	
//Визуализация
const fillTable = (mode='fill') => { //в зависимости от параметра mode эта функция либо БУДЕТ СТРОИТЬ ТАБЛИЦУ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ либо БУДЕТ ОЧИЩАТЬ ЗАПОЛНИНУЮ ТАБЛИЦУ И БУДЕТ ЗАПОЛНЯТЬ ЕЁ ПУСТЫМИ ЯЧЕЙКАМИ
	if (mode=='clear') {
		let table = document.getElementById('table');
		table.remove();

		let divTable = document.getElementById('div_table');
		table = document.createElement('table'); //значение переменной переписывается, потому что пред идущее значение уже бесполезно
		table.setAttribute('id', 'table');
		table.setAttribute('class', 'table');
		table.setAttribute('border', '0');
		table.setAttribute('cellpadding', '0');

		divTable.prepend(table)

		fillTable();
	} 
	else if (mode=='fill') {
		for (i = 9; i >= 0; i--) {
			let trElement = document.createElement('tr')
			trElement.id = `${i}`

			for (j = 0; j < 10; j++) {
				let tdElement = document.createElement('td')
				let c = `${i}` + `${j}`
				tdElement.id = c

				let imgElement = document.createElement('img')
				imgElement.setAttribute('src', 'corridor_00.png')
				imgElement.setAttribute('alt', 'corridor_00')
				imgElement.setAttribute('id', `img_${c}`)
				
				trElement.append(tdElement)
				tdElement.append(imgElement)
			}

			let table = document.getElementById('table')
			table.append(trElement)
		};
	};
};

fillTable(); //Строит таблицу при самом первом запуске 

/*Изменён код html, добавленна форма вместо обычного дива, а также немного из менён код, методом ".preventDefault()"
Написана новая функция smooth которая приводит в порядок сгенерированый, после genRing(), план карты*/

const con_visual = () => {
	console.log('Количество комнат: ' + numberOfRooms);
	console.log('Колец: ' + numberOfRings);
	console.log('Сиид: ' + seed);
	console.log('Карта: ');
	const map = [];
	for (cordRoom = 99; cordRoom >= 0; cordRoom--) {
		let type = map[cordRoom] = floorPlan[cordRoom].type;

		if (type == null) {
			map[cordRoom] = '-'
			continue
		};
		if (type == 'changed') {
			map[cordRoom] = '#'
			continue
		}
	};

	for (cordRoom = 99; cordRoom >= 0; cordRoom -= 10) {
		const a = map.slice(cordRoom - 9, cordRoom + 1);
		let l = `>`
		for (; a.length > 0; ) {
			l = l + ' ' + a.shift();
		}
		console.log(l);
	};
	console.log('Схема стыковки:');
	const connectionPlan = [];
	for (cordRoom = 99; cordRoom >= 0; cordRoom--) {
		if (floorPlan[cordRoom].s15 == 0) {connectionPlan[cordRoom] = '-'} //для красоты, заменяет значения комнаты на пане стыковки с 0 на -
		else if (floorPlan[cordRoom].s15 == 'Error') {connectionPlan[cordRoom] = 'E'} //в одной ячейче этого плана должен вмещаться не более 2х символов , а слово Error слишком большое для 2х, поэтому просто заменим его не символ #
		else {connectionPlan[cordRoom] = floorPlan[cordRoom].s15};
	};
	for (cordRoom = 99; cordRoom >= 0; cordRoom -= 10) {
		const a = connectionPlan.slice(cordRoom - 9, cordRoom + 1); //метод .slice возвращает элементы масива  индексом меньше чем cordRoom + 1 (последний указаный элемент - не включаеться)
		let l = '>'
		for (; a.length > 0; ) {
			let n = a.shift()
			if (n > 9) {
				l = l + ' ' + n; //.shift() - удаляет и возвращает первое значение масива с индексом 0 (изменяет длину исходного масива)
			} else {
				l = l + '  ' + n
			}
		};
		console.log(l);
	};
	console.log('Ending', startRoom, floorPlan);
}