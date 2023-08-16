//Обявление вспомогательных функций через методы объекта rundom
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

let abc = " 0123456789|.,!№;%:?-=+;:~><|*()/AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzАаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЬьЫыЭэЮюЯяІіЇїЄє";
seed = "GLaDOS"
seedNum = ""; //объявление ГЛОБАЛЬНОЙ ПЕРЕМЕННОЙ

//преобразование сида
seed = strRepl(seed); //заменяет символы, для уменьшения путаницы
for (j=0;  (j < seed.length) && (j < 8); j++) { //функция функция которая вычисляет значение seedNum 
	seedNum += abc.indexOf(seed[j]); //здесь мы ищем индекс символа из seed в словаре "abc", и складываем все индексы в одно число 
};

seedNum = (seedNum || 455534396169); //Записывает в переменную значение 455534396169(GLaDOS), если значение seedNum равно 0, undefined, null

seedNum = { //оздание нового объекта в переменную seedNum, при этом старое знаечение переменной записывается как совойство нового объекта
  seed: +seedNum,
  next: function() { //здесь при вызове метода значение seed сразу же и записывается и меняется
    return seedNum.seed = seedNum.seed * 48271 % 2147483647;
  }
};

const ran = () => {
  let num1 = `${seedNum.next()}`;
  let num2 = `${seedNum.next()}`;
  let result = parseFloat(`0.${num1[num1.length-2]}${num2[num2.length-2]}${num1[num1.length-4]}${num2[num2.length-4]}`);
  return result
};

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


//Обявление переменных
const floorPlan = new Array(99) /*Массив содержащий комнаты как элементы, 
индекс элеммента это координата комнаты, 
функция Array() заполняет весь масив 99тью undefined - что бы потом можно было удобней заменять на болванки*/
/*const maxRooms = 50;*/
const minRooms = rundom.number(30, 50);
let numberOfRooms = 0; //Счётчик количества комнат на плане
const numberOfRings = []; //Счётчик колец, который хранит в себе информацию о том где были поставлены кольца, а количество колец получаем через numberOfRings.lenth
const roomSample = { //Ячейка
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
let corn = rundom.number(0, 99) //Кордината startRoom - зерно
const startRoom = {//Объект стартовой(зерновой) комнаты
	coords: corn,
	type: 'changed',
	file: null,
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

	startRoom.passageInformation.up = rundom.boolean();
	startRoom.passageInformation.right = rundom.boolean();
	startRoom.passageInformation.down = rundom.boolean();
	startRoom.passageInformation.left = rundom.boolean();
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
		let upGateway = floorPlan[cordRoom].passageInformation.up;
		let rightGateway = floorPlan[cordRoom].passageInformation.right;
		let downGateway = floorPlan[cordRoom].passageInformation.down;
		let leftGateway = floorPlan[cordRoom].passageInformation.left;
		let upRoom = floorPlan[cordRoom + 10];
		let rightRoom = floorPlan[cordRoom + 1];
		let downRoom = floorPlan[cordRoom - 10];
		let leftRoom = floorPlan[cordRoom - 1];


		if (cordRoom < 90) { //Проверяет только те комнаты у которы есть соседи с верху (те которыееньше 90)
			let typeUpRoom = floorPlan[cordRoom + 10].type; //для удобства

			if (typeRoom != null &&
				upGateway == true &&
				typeUpRoom == null) { //если наша комната существует (у неё не null тип) и у нашей комнаты есть проход на верх и верхняя комната не существует (имеет null тип)
				edit.Cell.upRoom(upRoom) //тогда изменяем верхнюю комнату 
			}
		};

		if (cordRoom % 10 != 9) {
			let typeRightRoom = floorPlan[cordRoom + 1].type;

			if (typeRoom != null &&
				rightGateway == true &&
				typeRightRoom == null) {
				edit.Cell.rightRoom(rightRoom)
			}
		};


		if (cordRoom > 10) {
			let typeDownRoom = floorPlan[cordRoom - 10].type;

			if (typeRoom != null &&
				downGateway == true &&
				typeDownRoom == null) {
				edit.Cell.downRoom(downRoom)
			}
		};

		if (cordRoom % 10 != 0) {
			let typeLeftRoom = floorPlan[cordRoom - 1].type

			if (typeRoom != null &&
				leftGateway == true &&
				typeLeftRoom == null) {
				edit.Cell.leftRoom(leftRoom)
			}
		}

	}
};
const edit = {
	Cell: {
		upRoom(upRoom) {
			upRoom.type = 'changed'; //Изменяет состояние комнаты что бы потом было легче отследить какие уже изменены
			upRoom.passageInformation.up = rundom.boolean();
			upRoom.passageInformation.right = rundom.boolean();
			upRoom.passageInformation.down = true; 
			/*Trut - потому что мы редактируем верхнюю комнаты от заданной в visit(),
			 поэтому автоматически в этой комнате должен быть проход с низу*/
			upRoom.passageInformation.left = rundom.boolean();

			numberOfRooms += 1;
			return
		},
		rightRoom(rightRoom) {
			rightRoom.type = 'changed';
			rightRoom.passageInformation.up = rundom.boolean();
			rightRoom.passageInformation.right = rundom.boolean();
			rightRoom.passageInformation.down = rundom.boolean();
			rightRoom.passageInformation.left = true;

			numberOfRooms += 1;
			return
		},
		downRoom(downRoom) {
			downRoom.type = 'changed';
			downRoom.passageInformation.up = true;
			downRoom.passageInformation.right = rundom.boolean();
			downRoom.passageInformation.down = rundom.boolean();
			downRoom.passageInformation.left = rundom.boolean();

			numberOfRooms += 1;
			return
		},
		leftRoom(leftRoom) {
			leftRoom.type = 'changed';
			leftRoom.passageInformation.up = rundom.boolean();
			leftRoom.passageInformation.right = true;
			leftRoom.passageInformation.down = rundom.boolean();
			leftRoom.passageInformation.left = rundom.boolean();

			numberOfRooms += 1;
			return
		}
	}
};
const genRing = () => {
	for (cordRoom = 12; cordRoom < 89; cordRoom++) {

		if (cordRoom % 10 != 9 && 
			cordRoom % 10 != 0) {

			let room = floorPlan[cordRoom];
			let typeRoom = floorPlan[cordRoom].type;
			
			let upRoom = floorPlan[cordRoom + 10];
			let rightRoom = floorPlan[cordRoom + 1];
			let downRoom = floorPlan[cordRoom - 10];
			let leftRoom = floorPlan[cordRoom - 1];
			let typeUpRoom = floorPlan[cordRoom + 10].type;
			let typeRightRoom = floorPlan[cordRoom + 1].type;
			let typeDownRoom = floorPlan[cordRoom - 10].type;
			let typeLeftRoom = floorPlan[cordRoom - 1].type;
			
			let upRightRoom = floorPlan[cordRoom + 11];
			let rightDownRoom = floorPlan[cordRoom - 9];
			let downLeftRoom = floorPlan[cordRoom - 11];
			let leftUpRoom = floorPlan[cordRoom + 9];
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

				upRoom.passageInformation.down = false;
				rightRoom.passageInformation.left = false;
				downRoom.passageInformation.up = false;
				leftRoom.passageInformation.right = false;

				upRightRoom.passageInformation.left = upRightRoom.passageInformation.down = true;
				rightRoom.passageInformation.up = rightRoom.passageInformation.down = true;
				rightDownRoom.passageInformation.up = rightDownRoom.passageInformation.left = true;
				downRoom.passageInformation.right = downRoom.passageInformation.left = true;
				downLeftRoom.passageInformation.right = downLeftRoom.passageInformation.up = true;
				leftRoom.passageInformation.down = leftRoom.passageInformation.up = true;
				leftUpRoom.passageInformation.down = leftUpRoom.passageInformation.right = true;
				upRoom.passageInformation.left = upRoom.passageInformation.right = true;

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

		let upGateway = floorPlan[cordRoom].passageInformation.up;
		let rightGateway = floorPlan[cordRoom].passageInformation.right;
		let downGateway = floorPlan[cordRoom].passageInformation.down;
		let leftGateway = floorPlan[cordRoom].passageInformation.left;

		//Соеденяет комнату с соседом
		if ((cordRoom < 90) && //проверка на то что комната с такими координатами была не самой верхней потому, что у такой комнату нету соседа с верху, и это вызывает ошибку
			upRoom.type == 'changed' && 
			room.type == 'changed' && 
			(upRoom.passageInformation.down == true || upGateway == true)) {
			
			upRoom.passageInformation.down = true;
			upGateway = true;
		};
		if ((cordRoom % 10 != 9) &&
			rightRoom.type == 'changed' && 
			room.type == 'changed' &&
			(rightRoom.passageInformation.left == true || rightGateway == true)) {
			
			rightRoom.passageInformation.left = true;
			rightGateway = true;
		};
		if ((cordRoom > 9) && 
			downRoom.type == 'changed' && 
			room.type == 'changed' &&
			(downRoom.passageInformation.up == true || downGateway == true)) {
			
			downRoom.passageInformation.up = true;
			downGateway = true;
		};
		if ((cordRoom % 10 != 0) &&
			leftRoom.type == 'changed' && 
			room.type == 'changed' &&
			(leftRoom.passageInformation.right == true || leftGateway == true)) {
			
			leftRoom.passageInformation.right = true;
			leftGateway = true;
		};

		//Уберает у крайних комнат шлюзы ведущие за пределы карты
		if (cordRoom >= 90 &&
			upGateway == true) {floorPlan[cordRoom].passageInformation.up = false}; 
			/*Значение шлюзов изменяеться напрямую через floorPlan[cordRoom].passageInformation. 
			а не через upGateway. Потому что при объявлении upGateway в неё сохраняеться логическое значение
			НАПРЯМУЮ а не через ссылку. Поэтому ИЗМЕНИТЬ это значение НЕЛЬЗЯ. Нужно 
			напрямую обращаться к floorPlan[cordRoom].passageInformation. и менять его так
			Нужно переделать этот момент, в целях уменьшения кода. Инструкция и способ изменения описаны
			на сервере лаборатории*/
		if (cordRoom % 10 == 9 &&
			rightGateway == true) {floorPlan[cordRoom].passageInformation.right = false};
		if (cordRoom <= 9 &&
			downGateway == true) {floorPlan[cordRoom].passageInformation.down = false};
		if (cordRoom % 10 == 0 &&
			leftGateway == true) {floorPlan[cordRoom].passageInformation.left = false};
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
		};
		if (upGateway == false &&
			rightGateway == true &&
			downGateway == false &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 2;
			floorPlan[cordRoom].rotate = 90;
			floorPlan[cordRoom].file = 'corridor_01.png';
		};
		if (upGateway == false &&
			rightGateway == false &&
			downGateway == true &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 4;
			floorPlan[cordRoom].rotate = 180;
			floorPlan[cordRoom].file = 'corridor_01.png';
		};
		if (upGateway == false &&
			rightGateway == false &&
			downGateway == false &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 8;
			floorPlan[cordRoom].rotate = 270;
			floorPlan[cordRoom].file = 'corridor_01.png';
		};

		//Блок прямых коридоров
		if (upGateway == true &&
			rightGateway == false &&
			downGateway == true &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 5;
			floorPlan[cordRoom].rotate = 0;
			floorPlan[cordRoom].file = 'corridor_05.png';
		};
		if (upGateway == false &&
			rightGateway == true &&
			downGateway == false &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 10;
			floorPlan[cordRoom].rotate = 90;
			floorPlan[cordRoom].file = 'corridor_05.png';
		};

		//Блок изогнутых коридоров(поворотов)
		if (upGateway == true &&
			rightGateway == true &&
			downGateway == false &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 3;
			floorPlan[cordRoom].rotate = 0;
			floorPlan[cordRoom].file = 'corridor_03.png';
		};
		if (upGateway == false &&
			rightGateway == true &&
			downGateway == true &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 6;
			floorPlan[cordRoom].rotate = 90;
			floorPlan[cordRoom].file = 'corridor_03.png';
		};
		if (upGateway == false &&
			rightGateway == false &&
			downGateway == true &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 12;
			floorPlan[cordRoom].rotate = 180;
			floorPlan[cordRoom].file = 'corridor_03.png';
		};
		if (upGateway == true &&
			rightGateway == false &&
			downGateway == false &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 9;
			floorPlan[cordRoom].rotate = 270;
			floorPlan[cordRoom].file = 'corridor_03.png';
		};

		//Блок тройных развилок
		if (upGateway == true &&
			rightGateway == true &&
			downGateway == false &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 11;
			floorPlan[cordRoom].rotate = 270;
			floorPlan[cordRoom].file = 'corridor_07.png';
		};
		if (upGateway == true &&
			rightGateway == true &&
			downGateway == true &&
			leftGateway == false) {

			floorPlan[cordRoom].s15 = 7;
			floorPlan[cordRoom].rotate = 0;
			floorPlan[cordRoom].file = 'corridor_07.png';
		};
		if (upGateway == false &&
			rightGateway == true &&
			downGateway == true &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 14;
			floorPlan[cordRoom].rotate = 90;
			floorPlan[cordRoom].file = 'corridor_07.png';
		};
		if (upGateway == true &&
			rightGateway == false &&
			downGateway == true &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 13;
			floorPlan[cordRoom].rotate = 180;
			floorPlan[cordRoom].file = 'corridor_07.png';
		};

		//Блок четверных развилок
		if (upGateway == true &&
			rightGateway == true &&
			downGateway == true &&
			leftGateway == true) {

			floorPlan[cordRoom].s15 = 15;
			floorPlan[cordRoom].rotate = 0;
			floorPlan[cordRoom].file = 'corridor_15.png';
		}
	}
};


//Пошговое выполнение
autoFillFloarPlan();
const writingValues = []; //"список" количеств комнат для их сравнения
while (numberOfRooms < minRooms) {
	visitRoom();

	writingValues.push(numberOfRooms); //Добавление значения numberOfRooms после последнего visitRoom

	if (writingValues[writingValues.length-2] == numberOfRooms) { //если предидущее значение numberOfRooms равно текущемму, то должна проводиться повторная генерация
		
		corn = rundom.number(0, 99); //Изменяем координаты стартовой комнаты
		startRoom.passageInformation.up = rundom.boolean();//изменяем startRoom
		startRoom.passageInformation.right = rundom.boolean();
		startRoom.passageInformation.down = rundom.boolean();
		startRoom.passageInformation.left = rundom.boolean();

		while (startRoom.passageInformation.up == false &&
			startRoom.passageInformation.right == false &&
			startRoom.passageInformation.down == false &&
			startRoom.passageInformation.left == false) { //Проверка стартовой комнаты на наличие выходов

			startRoom.passageInformation.up = rundom.boolean();
			startRoom.passageInformation.right = rundom.boolean();
			startRoom.passageInformation.down = rundom.boolean();
			startRoom.passageInformation.left = rundom.boolean();
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

	
//Визуализация
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
console.log('Ending', startRoom);

/*Добавлен параметр "s15" в ячейку
Теперь стартовая комната вставляеться в план после его полной генерации
Добавлена функция s15 определяющая значение комнаты по с15
Переделана система визуализации*/