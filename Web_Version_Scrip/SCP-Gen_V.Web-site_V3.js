/*V 3.0*/

const seedAdd = () => {
	let abc = " 0123456789|.,!№;%:?-=+;:~><|*()/AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzАаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЬьЫыЭэЮюЯяІіЇїЄє";
	globalThis.seed = document.getElementById("seed").value;
	globalThis.seedNum = 0; //объявление ГЛОБАЛЬНОЙ ПЕРЕМЕННОЙ

	//преобразование сида
	seed = strRepl(seed); //заменяет символы, для уменьшения путаницы

	for (let i = 0; i < seed.length; i++) {//здесь seed воспринимаеться как число, записаное в системе счисления abc, этот цикл форм, написан по принципу перевода числа из одной системы счисления, в другую
		seedNum += abc.indexOf(seed[i]) * Math.pow(abc.length, seed.length-(1+i));
	};
  
	seedNum = (seedNum || seedGen(abc)); //Записывает в переменную значение 455534396169(GLaDOS), если значение seedNum равно 0, undefined, null
  globalThis.seedNumHTML = seedNum; //запоминает текущее числовое значение, для того что бы потом вывести его на HTML-странице

	seedNum = { //оздание нового объекта в переменную seedNum, при этом старое знаечение переменной записывается как совойство нового объекта
	  seed: +seedNum,
	  next: function() { //здесь при вызове метода значение seed сразу же и записывается и меняется
	    return globalThis.seedNum.seed = globalThis.seedNum.seed * 48271 % 2147483647;
	  }
	};
};


//Обявление переменных
const variableDeclaration = () => {
	globalThis.floorPlan = new Array(99); /*Массив содержащий комнаты как элементы, 
	индекс элеммента это координата комнаты, 
	функция Array() заполняет весь масив 99тью undefined - что бы потом можно было удобней заменять на болванки*/
	/*const maxRooms = 50;*/
	globalThis.minRooms = rundom.number(30, 50);
	globalThis.roomSample = { //Ячейка
		coords: null,
		file: null, //Для того что бы знать какой картинкой отображать эту комнату при визуализации
		changed: false, //Нужно что бы знать, подвергалась ли комната изменениям
		cod: null, //НУжно что бы знать, какой код этой комнаты по manifestRoom
		zone: 'L', //Должно быть на вобор : L , H , O Но что бы не усложнять разработку, пока так оставлю
		structure: null, //Нужно для гинерации карты в майнрафт
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
		changed: true,
		cod: null,
		zone: 'L', 
		structure: null,
		s15: 0,
		rotate: 0,
		passageInformation: {
			up: rundom.boolean(),
			right: rundom.boolean(),
			down: rundom.boolean(),
			left: rundom.boolean()
		}
	};
	globalThis.counter = { //Объект-счётчик в котором будут собраны все счётчики, для удобства
		ofRooms: 0, //Счётчик количества комнат на плане
		ofRings: [], //Счётчик колец, который хранит в себе информацию о том где были поставлены кольца, а количество колец получаем через counter.ofRings.lenth
		ofSpecialRooms: [], //счётчик особых комнат. В основном нужен что бы знать используеться specialRooms() в первый ли раз
		ofCorridor01: [], //сохраняет в себе координаты комнаты, количество комнат с данным типом можно узнать через counter.ofCorridor01.length
		ofCorridor03: [],
		ofCorridor05: [],
		ofCorridor07: [],
		ofCorridor15: [],
			log() {
			console.log(`counter:\n\tofCorridor01: ${this.ofCorridor01}\n\tofCorridor03: ${this.ofCorridor03}\n\tofCorridor05: ${this.ofCorridor05}\n\tofCorridor07: ${this.ofCorridor07}\n\tofCorridor15: ${this.ofCorridor15}\n\tofRings: ${this.ofRings}\n\tofSpecialRooms: ${this.ofSpecialRooms}\n\tofRooms: ${this.ofRooms}`)
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
		floorPlan[cordRoom] = coppyObject(roomSample);  //Двойная конвертация что бы избежать мутаци
		floorPlan[cordRoom].coords = cordRoom; //Присваивание координат пустым комнатам(дальше - болванкам)
	};
	floorPlan[corn] = startRoom //Вставлю ссылку на оригинальный Объект (поэтому и присваивать координаты не нужно)
};
const visitRoom = () => {
	for (cordRoom = 0; cordRoom <= 99; cordRoom++) {

		let room = floorPlan[cordRoom];
		let changedRoom = floorPlan[cordRoom].changed;
		let up = floorPlan[cordRoom].passageInformation.up;
		let right = floorPlan[cordRoom].passageInformation.right;
		let down = floorPlan[cordRoom].passageInformation.down;
		let left = floorPlan[cordRoom].passageInformation.left;
		let upRoom = floorPlan[cordRoom + 10];
		let rightRoom = floorPlan[cordRoom + 1];
		let downRoom = floorPlan[cordRoom - 10];
		let leftRoom = floorPlan[cordRoom - 1];


		if (cordRoom < 90) { //Проверяет только те комнаты у которы есть соседи с верху (те которыееньше 90)
			let changedUpRoom = floorPlan[cordRoom + 10].changed; //для удобства

			if (changedRoom != false &&
				up == true &&
				changedUpRoom == false) { //если наша комната существует (у неё не null тип) и у нашей комнаты есть проход на верх и верхняя комната не существует (имеет null тип)
				editCell.upRoom(upRoom) //тогда изменяем верхнюю комнату 
			}
		};

		if (cordRoom % 10 != 9) {
			let changedRightRoom = floorPlan[cordRoom + 1].changed;

			if (changedRoom != false &&
				right == true &&
				changedRightRoom == false) {
				editCell.rightRoom(rightRoom)
			}
		};


		if (cordRoom > 9) {
			let changedDownRoom = floorPlan[cordRoom - 10].changed;

			if (changedRoom != false &&
				down == true &&
				changedDownRoom == false) {
				editCell.downRoom(downRoom)
			}
		};

		if (cordRoom % 10 != 0) {
			let changedLeftRoom = floorPlan[cordRoom - 1].changed

			if (changedRoom != false &&
				left == true &&
				changedLeftRoom == false) {
				editCell.leftRoom(leftRoom)
			}
		}

	}
};
const editCell = {
	upRoom(upRoom) {
		upRoom.changed = true; //Изменяет состояние комнаты что бы потом было легче отследить какие уже изменены
		editArgum(upRoom.passageInformation, ['up', 'right', 'left'], rundom.boolean);
		editArgum(upRoom.passageInformation, 'down', true);
		/*Trut - потому что мы редактируем верхнюю комнаты от заданной в visit(),
		 поэтому автоматически в этой комнате должен быть проход с низу*/

		counter.ofRooms += 1;
		return
	},
	rightRoom(rightRoom) {
		rightRoom.changed = true;
		editArgum(rightRoom.passageInformation, ['up', 'right', 'down'], rundom.boolean);
		editArgum(rightRoom.passageInformation, 'left', true);

		counter.ofRooms += 1;
		return
	},
	downRoom(downRoom) {
		downRoom.changed = true;
		editArgum(downRoom.passageInformation, ['right', 'down', 'left'], rundom.boolean);
		editArgum(downRoom.passageInformation, 'up', true);

		counter.ofRooms += 1;
		return
	},
	leftRoom(leftRoom) {
		leftRoom.changed = true;
		editArgum(leftRoom.passageInformation, ['up', 'down', 'left'], rundom.boolean);
		editArgum(leftRoom.passageInformation, 'right', true);

		counter.ofRooms += 1;
		return
	}
};
const genRing = () => {
	for (cordRoom = 12; cordRoom < 89; cordRoom++) {

		if (cordRoom % 10 != 9 && 
			cordRoom % 10 != 0) {

			let room = floorPlan[cordRoom];
			let changedRoom = floorPlan[cordRoom].changed;

			let upRoomPasInfo = floorPlan[cordRoom + 10].passageInformation;
			let rightRoomPasInfo = floorPlan[cordRoom + 1].passageInformation;
			let downRoomPasInfo = floorPlan[cordRoom - 10].passageInformation;
			let leftRoomPasInfo = floorPlan[cordRoom - 1].passageInformation;
			let upRightRoomPasInfo = floorPlan[cordRoom + 11].passageInformation;
			let rightDownRoomPasInfo = floorPlan[cordRoom - 9].passageInformation;
			let downLeftRoomPasInfo = floorPlan[cordRoom - 11].passageInformation;
			let leftUpRoomPasInfo = floorPlan[cordRoom + 9].passageInformation;

			let changedUpRoom = floorPlan[cordRoom + 10].changed;
			let changedRightRoom = floorPlan[cordRoom + 1].changed;
			let changedDownRoom = floorPlan[cordRoom - 10].changed;
			let changedLeftRoom = floorPlan[cordRoom - 1].changed;
			
			let changedUpRightRoom = floorPlan[cordRoom + 11].changed; //Тип комнаты верху-справа (по диагонали) от заданной
			let changedRightDownRoom = floorPlan[cordRoom - 9].changed; //Тип комнаты справа-снизу (по диагонали) от заданной
			let changedDownLeftRoom = floorPlan[cordRoom - 11].changed; //Тип комнаты нижней-слева (по диагонали) от заданной
			let changedLeftUpRoom = floorPlan[cordRoom + 9].changed; //Тип комнаты левой-сверху (по диагонали) от заданной

			if (changedRoom == true &&
				changedUpRoom == true &&
				changedRightRoom == true &&
				changedDownRoom == true &&
				changedLeftRoom == true &&
				changedUpRightRoom == true &&
				changedRightDownRoom == true &&
				changedDownLeftRoom == true &&
				changedLeftUpRoom == true) {

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

				counter.ofRings.push(cordRoom);
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
			upRoom.changed == true && 
			room.changed == true && 
			(upRoom.passageInformation.down == true || pasInfo.up == true)) {
			
			upRoom.passageInformation.down = true;
			editArgum(pasInfo, 'up', true);
		};
		if ((cordRoom % 10 != 9) &&
			rightRoom.changed == true && 
			room.changed == true &&
			(rightRoom.passageInformation.left == true || pasInfo.right == true)) {
			
			rightRoom.passageInformation.left = true;
			editArgum(pasInfo, 'right', true);
		};
		if ((cordRoom > 9) && 
			downRoom.changed == true && 
			room.changed == true &&
			(downRoom.passageInformation.up == true || pasInfo.down == true)) {
			
			downRoom.passageInformation.up = true;
			editArgum(pasInfo, 'down', true);
		};
		if ((cordRoom % 10 != 0) &&
			leftRoom.changed == true && 
			room.changed == true &&
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
		
		if (room.changed == true) {

			if (upGateway == true) {
				if (upRoom.changed == false) {

					upRoom.file = 'corridor_01.png'
					upRoom.passageInformation = {
						up: false,
						right: false,
						down: true,
						left: false
					};
					upRoom.rotate = 180;
					upRoom.s15 = 4;
					upRoom.changed = true;
				}; 
				if (upRoom.changed == true &&
					upRoom.passageInformation.down == false) {room.passageInformation.up = false};
			};
			if (rightGateway == true) {
				if (rightRoom.changed == false) {

					rightRoom.file = 'corridor_01.png'
					rightRoom.passageInformation = {
						up: false,
						right: false,
						down: false,
						left: true
					};
					rightRoom.rotate = 270;
					rightRoom.s15 = 8;
					rightRoom.changed = true;
				};
				if (rightRoom.changed == true &&
					rightRoom.passageInformation.left == false) {room.passageInformation.right = false};
			};
			if (downGateway == true) {
				if (downRoom.changed == false) {

					downRoom.file = 'corridor_01.png'
					downRoom.passageInformation = {
						up: true,
						right: false,
						down: false,
						left: false
					};
					downRoom.rotate = 0;
					downRoom.s15 = 1;
					downRoom.changed = true;
				};
				if (downRoom.changed == true &&
					downRoom.passageInformation.up == false) {room.passageInformation.down = false};
			};
			if (leftGateway == true) {
				if (leftRoom.changed == false) {

					leftRoom.file = 'corridor_01.png'
					leftRoom.passageInformation = {
						up: false,
						right: true,
						down: false,
						left: false
					};
					leftRoom.rotate = 90;
					leftRoom.s15 = 2;
					leftRoom.changed = true;
				};
				if (leftRoom.changed == true &&
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
			floorPlan[cordRoom].structure = `L_corridor_01`;

			counter.ofCorridor01.push(cordRoom);
		}
		else if (upGateway == false &&
			rightGateway == true &&
			downGateway == false &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 2;
			floorPlan[cordRoom].rotate = 90;
			floorPlan[cordRoom].file = 'corridor_01.png';
			floorPlan[cordRoom].structure = `L_corridor_01`;

			counter.ofCorridor01.push(cordRoom);
		}
		else if (upGateway == false &&
			rightGateway == false &&
			downGateway == true &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 4;
			floorPlan[cordRoom].rotate = 180;
			floorPlan[cordRoom].file = 'corridor_01.png';
			floorPlan[cordRoom].structure = `L_corridor_01`;

			counter.ofCorridor01.push(cordRoom);
		}
		else if (upGateway == false &&
			rightGateway == false &&
			downGateway == false &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 8;
			floorPlan[cordRoom].rotate = 270;
			floorPlan[cordRoom].file = 'corridor_01.png';
			floorPlan[cordRoom].structure = `L_corridor_01`;

			counter.ofCorridor01.push(cordRoom);
		}

		//Блок прямых коридоров
		else if (upGateway == true &&
			rightGateway == false &&
			downGateway == true &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 5;
			floorPlan[cordRoom].rotate = 0;
			floorPlan[cordRoom].file = 'corridor_05.png';
			floorPlan[cordRoom].structure = `L_corridor_05`;

			counter.ofCorridor05.push(cordRoom);
		}
		else if (upGateway == false &&
			rightGateway == true &&
			downGateway == false &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 10;
			floorPlan[cordRoom].rotate = 90;
			floorPlan[cordRoom].file = 'corridor_05.png';
			floorPlan[cordRoom].structure = `L_corridor_05`;

			counter.ofCorridor05.push(cordRoom);
		}

		//Блок изогнутых коридоров(поворотов)
		else if (upGateway == true &&
			rightGateway == true &&
			downGateway == false &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 3;
			floorPlan[cordRoom].rotate = 0;
			floorPlan[cordRoom].file = 'corridor_03.png';
			floorPlan[cordRoom].structure = `L_corridor_03`;

			counter.ofCorridor03.push(cordRoom);
		}
		else if (upGateway == false &&
			rightGateway == true &&
			downGateway == true &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 6;
			floorPlan[cordRoom].rotate = 90;
			floorPlan[cordRoom].file = 'corridor_03.png';
			floorPlan[cordRoom].structure = `L_corridor_03`;

			counter.ofCorridor03.push(cordRoom);
		}
		else if (upGateway == false &&
			rightGateway == false &&
			downGateway == true &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 12;
			floorPlan[cordRoom].rotate = 180;
			floorPlan[cordRoom].file = 'corridor_03.png';
			floorPlan[cordRoom].structure = `L_corridor_03`;

			counter.ofCorridor03.push(cordRoom);
		}
		else if (upGateway == true &&
			rightGateway == false &&
			downGateway == false &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 9;
			floorPlan[cordRoom].rotate = 270;
			floorPlan[cordRoom].file = 'corridor_03.png';
			floorPlan[cordRoom].structure = `L_corridor_03`;

			counter.ofCorridor03.push(cordRoom);
		}

		//Блок тройных развилок
		else if (upGateway == true &&
			rightGateway == true &&
			downGateway == false &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 11;
			floorPlan[cordRoom].rotate = 270;
			floorPlan[cordRoom].file = 'corridor_07.png';
			floorPlan[cordRoom].structure = `L_corridor_07`;

			counter.ofCorridor07.push(cordRoom);
		}
		else if (upGateway == true &&
			rightGateway == true &&
			downGateway == true &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 7;
			floorPlan[cordRoom].rotate = 0;
			floorPlan[cordRoom].file = 'corridor_07.png';
			floorPlan[cordRoom].structure = `L_corridor_07`;

			counter.ofCorridor07.push(cordRoom);
		}
		else if (upGateway == false &&
			rightGateway == true &&
			downGateway == true &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 14;
			floorPlan[cordRoom].rotate = 90;
			floorPlan[cordRoom].file = 'corridor_07.png';
			floorPlan[cordRoom].structure = `L_corridor_07`;

			counter.ofCorridor07.push(cordRoom);
		}
		else if (upGateway == true &&
			rightGateway == false &&
			downGateway == true &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 13;
			floorPlan[cordRoom].rotate = 180;
			floorPlan[cordRoom].file = 'corridor_07.png';
			floorPlan[cordRoom].structure = `L_corridor_07`;

			counter.ofCorridor07.push(cordRoom);
		}

		//Блок четверных развилок
		else if (upGateway == true &&
			rightGateway == true &&
			downGateway == true &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 15;
			floorPlan[cordRoom].rotate = 0;
			floorPlan[cordRoom].file = 'corridor_15.png';
			floorPlan[cordRoom].structure = `L_corridor_15`;

			counter.ofCorridor15.push(cordRoom);
		} 

		//Отработчик ошибок, который выводи в ячейку специальную картинку обозначающую ошибку 
		else if (floorPlan[cordRoom].changed == true) { //Если не один из выше перечисленых комбинаций шлюзов не подошёл, но при этом комната указана как "изменина". ТО в гинерации возникла ошибка и тогда на карту выводиться особое изображение комнаты с ошибкой. Для того что бы таблица не ломалась
			floorPlan[cordRoom].s15 = 'Error';
			floorPlan[cordRoom].rotate = 0;
			floorPlan[cordRoom].file = 'corridor_Error.png'}
	}
};
const specialRooms = (objectSpecialRoom, counterCOPY) => {		//Эта функция устанавливает специальные атрибуты для того что бы определить комнату как специальную, в зависимости от переданного манифест-объекта
	let unique = objectSpecialRoom.unique;
	let selectOfElement = counterCOPY[objectSpecialRoom.counter]; //сылка на масив счёткика, "[i.counter]" - определяет какой конкретно нам нужен счётчик из свойства объекта manifestRoom

	if (unique) { //Если комната уникальна, то генерируем только её одну
		
		if (selectOfElement.length > 0) { //Заканчиваем гинерацию комнат, т.к. закончились Возможные варианты
			let indexCordRoom = rundom.number(0, (selectOfElement.length - 1)); 
			let cordRoom = selectOfElement[indexCordRoom];
			let room = floorPlan[cordRoom];

			room.cod = objectSpecialRoom.cod;
			room.structure = objectSpecialRoom.structure;

			counter.ofSpecialRooms.push(cordRoom);
			selectOfElement.splice(indexCordRoom, 1); //Удаляет комнату из счётчика , что бы одна комната не попалась два раза
		}

	} else if (!(unique)) { //если комната не уникальна то ....

		let maxRoom = objectSpecialRoom.max;
		let minRoom = objectSpecialRoom.min;
		let quantityRoom = rundom.number(minRoom, maxRoom); //...Выбираем сколько комнат даного типа заспавниться, взависимости от чисел min и max
		
		if (maxRoom === 0) { //Если maxRoom равне нулю, это означает что комнаты должны сгенерироваться обязательно на месте тех комнат которые имеют такой же с15
			//тут должны генерироваться тупики из офисов, во всех конечных комнатах зоны
			//Счётчик для хард зоны нужно будет переделать, т.к. он будет считать конечные комнаты из хард и из офисов в один и тот же параметр
		};
	
		if (selectOfElement.length >= quantityRoom &&
			quantityRoom !== 0) {
			for (let i = 0; i < quantityRoom; i++) { //Повторим генерацию 1 комнаты столько раз сколько указано quantityRoom

				let indexCordRoom = rundom.number(0, (selectOfElement.length - 1)); //Выбираеться случайный индекс, и поэтому индексу достаёться комната из масива, "-1" нужен для того что бы в случаи когда в selectOfElement 1 елемент - генерируется ошибка
				let cordRoom = selectOfElement[indexCordRoom];
				let room = floorPlan[cordRoom];

				room.cod = objectSpecialRoom.cod;
				room.structure = objectSpecialRoom.structure;

				counter.ofSpecialRooms.push(cordRoom);
				selectOfElement.splice(indexCordRoom, 1);
			}
		}
	}
};
const preoritySpecialRooms = (zone='L') => { //Функция отвечает за соблюдение приоретета гинерации специальных комнат
	let counterCOPY = coppyObject(counter); //Полная копия объекта, для того что бы исходник не изменялся
	
	for (let preority = 0; preority < Object.keys(manifestRoom[zone]).length; preority++) {
		for (let objectSpecialRoom in manifestRoom[zone]) {

			objectSpecialRoom = manifestRoom[zone][objectSpecialRoom]; //Переопределение перемнной, т.к. в цикле for значение для objectSpecialRoom устанавливаеться только название аргумента, а вэтой строчке мы записываем значание этого параметра

			if (preority === objectSpecialRoom.preority) {
				specialRooms(objectSpecialRoom, counterCOPY) //вызов функции для гинерации конаты по её манифест-объекту
			}
		}
	}
};
const visual = () => {

	//Изменяет значение параметров в panel нф HTML странице
	document.getElementById("showSeed").textContent = `Сиид: ${seed}`;
	document.getElementById("showSeedNum").textContent = `Номер Сида: ${seedNumHTML}`
	document.getElementById("showRing").textContent = `Колец: ${counter.ofRings.length}`;
	document.getElementById("showRoom").textContent = `Количество комнат: ${counter.ofRooms}`;
	document.getElementById("showTime").textContent = `Время генерации: ${timeFinish - timeStart}ms`;


	for (i = 0; i < 10; i++) {
		for (j = 0; j < 10; j++) {
			let textCordRoom = `${i}` + `${j}`;
			let cordRoom = Number(textCordRoom);
			if (floorPlan[cordRoom].changed == true) {
				let img = document.getElementById(`img_${i}${j}`);

				let file_img = floorPlan[cordRoom].file;
				let s15 = floorPlan[cordRoom].s15;
				let rotate = floorPlan[cordRoom].rotate;
				let cod = floorPlan[cordRoom].cod;

				img.setAttribute('src', `${file_img}`);
				img.setAttribute('alt', `corridor_${s15}`);
				img.setAttribute('style', `transform: rotate(${rotate}deg)`);

				if (!(cod === null)) {writeCod(textCordRoom)}; //Добавляет элемент с текстом в элемент таблицы 
			}
		}
	}
};

//Пошговое выполнение
const start = () => {
	event.preventDefault(); //нужно только для того что бы страница не перезагружалась при нажатии "enter"

	globalThis.timeStart = new Date(); // для замера скорости работы алгоритма

	fillTable('clear');
	seedAdd();

	do {
		variableDeclaration();
		autoFillFloarPlan();

		const writingValues = []; //"список" количеств комнат для их сравнения
		while (counter.ofRooms < minRooms) {
			visitRoom();
			

			writingValues.push(counter.ofRooms); //Добавление значения counter.ofRooms после последнего visitRoom

			if (writingValues[writingValues.length-2] == counter.ofRooms) { //если предидущее значение counter.ofRooms равно текущемму, то должна проводиться повторная генерация
				
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
				counter.ofRooms = 0; 
				writingValues.length = 0; //зачищение списка, т.к. создать новый нельзя из-за const
			}
		}

		genRing();
		smoothing();
		endRoom();
		s15(); 
	} while (counter.ofCorridor01.length <= 2);
	
	do {

		if (counter.ofSpecialRooms.length != 0) { //Эта часть удаляет специальные комнаты, если при запуске функции сгенерировалась не правильная комбинация комнат
			while (counter.ofSpecialRooms.length >= 1) {
				let room = floorPlan[counter.ofSpecialRooms[0]];
				
				room.cod = null;
				room.structure = null;

				counter.ofSpecialRooms.shift();
				/*console.log('SpecR: ' + counter.ofSpecialRooms)*/
			}
		};

		preoritySpecialRooms(/*zone*/)
	} while (chekKeysRoom(/*zone*/).length < manifestRoom.keysRoom[/*zone*/'L']);//Возвращает массив из ключевых комнат для данной зоны
	
	globalThis.timeFinish = new Date(); // для замера скорости работы алгоритма

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
		for (let i = 9; i >= 0; i--) {
			let tr = document.createElement('tr')
			tr.id = `${i}`

			for (let j = 0; j < 10; j++) {
				let td = document.createElement('td')
				let c = `${i}` + `${j}`
				td.id = c
				td.setAttribute('class', 'td_table')

				let img = document.createElement('img')
				img.setAttribute('src', 'corridor_00.png')
				img.setAttribute('alt', 'corridor_00')
				img.setAttribute('id', `img_${c}`)
				img.setAttribute('draggable', 'false') //запрешает перетаскивание элемента
				
				tr.append(td)
				td.append(img)
			}

			let table = document.getElementById('table')
			table.append(tr)
		};
	};
};

fillTable(); //Строит таблицу при самом первом запуске 

/*Изменён код html, добавленна форма вместо обычного дива, а также немного из менён код, методом ".preventDefault()"
Написана новая функция smooth которая приводит в порядок сгенерированый, после genRing(), план карты*/

const con_visual = () => {
	/*console.clear();*/ //Очищает консоль

	counter.log();

	console.log('Количество комнат: ' + counter.ofRooms);
	console.log('Колец: ' + counter.ofRings);
	console.log('Сиид: ' + seed);
	console.log('Карта: ');
	const map = [];
	for (cordRoom = 99; cordRoom >= 0; cordRoom--) {
		let changed = map[cordRoom] = floorPlan[cordRoom].changed;

		if (changed == false) {
			map[cordRoom] = '-'
			continue
		};
		if (changed == true) {
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