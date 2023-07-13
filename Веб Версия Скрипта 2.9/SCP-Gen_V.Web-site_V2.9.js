/*V 2.9*/
//Обявление вспомогательных функций через методы объекта rundom
function strRepl(str) { //функция которая заменяет похожие символы, что бы не было путаницы между рус и англ языком
  let from = "уехаросіУКЕНХВАРОСМИТ0ЁЙ3І"; //то-что заменяем
  let to = "yexapociYKEHXBAPOCMNTOENЗI"; //то-чем заменяем
  
  for (let i=0; i<str.length; i++) { //прохордится по каждому элементу в строке
    if ( from.includes(str[i]) ) {
      str = str.replaceAll(i, to[from.indexOf(str[i])] );
    } //заменяет в строке символ на другой символ с таким же индексом как у первого (индекс в масивах from и to)
  }
  return str;
}

const seedAdd = () => {//НАЧАЛО
	let abc = "\ 0123456789|.,!№;%:?-=+;:~><|*()/AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzАаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЬьЫыЭэЮюЯяІіЇїЄє";
	let seed = document.getElementById("seed").value;
	globalThis.seedNum = ""; //объявление ГЛОБАЛЬНОЙ ПЕРЕМЕННОЙ

	//преобразование сида
	seed = strRepl(seed); //заменяет символы, для уменьшения путаницы
	for (j=0;  (j < seed.length) && (j < 8); j++) { //функция функция которая вычисляет значение seedNum 
		seedNum += abc.indexOf(seed[j]); //здесь мы ищем индекс символа seed в словаре "abc", и соеденяем все числа в одно длинное число
	};

	seedNum = (seedNum || 9) //Записывает в переменную значение 9, если значение seedNum равно 0, undefined, null

	seedNum = { //оздание нового объекта в переменную seedNum, при этом старое знаечение переменной записывается как совойство нового объекта
	  seed: +seedNum,
	  next: function() { //здесь при вызове метода значение seed сразу же и записывается и меняется
	    return globalThis.seedNum.seed = globalThis.seedNum.seed * 48271 % 2147483647;
	  }
	};
};

function ran() {
  let num1 = `${globalThis.seedNum.next()}`;
  let num2 = `${globalThis.seedNum.next()}`;
  let result = parseFloat(`0.${num1[num1.length-2]}${num2[num2.length-2]}${num1[num1.length-4]}${num2[num2.length-4]}`);
  return result
}

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
const variableDeclaration = () => {
	globalThis.floorPlan = new Array(99) /*Массив содержащий комнаты как элементы, 
	индекс элеммента это координата комнаты, 
	функция Array() заполняет весь масив 99тью undefined - что бы потом можно было удобней заменять на болванки*/
	/*const maxRooms = 50;*/
	globalThis.minRooms = rundom.number(30, 50);
	globalThis.numberOfRooms = 0; //Счётчик количества комнат на плане
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

		startRoom.passageInformation.up = rundom.boolean();
		startRoom.passageInformation.right = rundom.boolean();
		startRoom.passageInformation.down = rundom.boolean();
		startRoom.passageInformation.left = rundom.boolean();
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


		if (cordRoom > 10) {
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

				console.log('>' + cordRoom);
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

		if ((cordRoom < 90) && //проверка на то что комната с такими координатами была не самой верхней потому, что у такой комнату нету соседа с верху, и это вызывает ошибку
			upRoom.type == 'changed' && 
			room.type == 'changed' && 
			(upRoom.passageInformation.down == true || room.passageInformation.up == true)) {
			upRoom.passageInformation.down = true;
			room.passageInformation.up = true;
		};
		if ((cordRoom % 10 != 9) &&
			rightRoom.type == 'changed' && 
			room.type == 'changed' &&
			(rightRoom.passageInformation.left == true || room.passageInformation.right == true)) {
			rightRoom.passageInformation.left = true;
			room.passageInformation.right = true;
		};
		if ((cordRoom > 10) &&
			downRoom.type == 'changed' && 
			room.type == 'changed' &&
			(downRoom.passageInformation.up == true || room.passageInformation.down == true)) {
			downRoom.passageInformation.up = true;
			room.passageInformation.down = true;
		};
		if ((cordRoom % 10 != 0) &&
			leftRoom.type == 'changed' && 
			room.type == 'changed' &&
			(leftRoom.passageInformation.right == true || room.passageInformation.left == true)) {
			leftRoom.passageInformation.right = true;
			room.passageInformation.left = true;
		};
	}
};
const editGateway = {
	upGateway() {

	},
	rightGateway() {

	},
	downGateway() {

	},
	leftGateway() {

	}
};
const s15 = () => {
	for (cordRoom = 0; cordRoom <= 99; cordRoom++) {

		let upGateway = floorPlan[cordRoom].passageInformation.up
		let rightGateway = floorPlan[cordRoom].passageInformation.right
		let downGateway = floorPlan[cordRoom].passageInformation.down
		let leftGateway = floorPlan[cordRoom].passageInformation.left

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
const visual = () => {
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
	s15();
	visual();
	con_visual();
};

	
//Визуализация
const fillTable = (mode='fill') => { //в зависимости от параметра mode эта функция либо БУДЕТ СТРОИТЬ ТАБЛИЦУ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ либо БУДЕТ ОЧИЩАТЬ ЗАПОЛНИНУЮ ТАБЛИЦУ И БУДЕТ ЗАПОЛНЯТЬ ЕЁ ПУСТЫМИ ЯЧЕЙКАМИ
	if (mode=='clear') {
		let table = document.getElementById('table');
		table.remove();

		let board = document.getElementById('board');
		table = document.createElement('table'); //значение переменной переписывается, потому что пред идущее значение уже бесполезно
		table.setAttribute('id', 'table');
		table.setAttribute('class', 'table');
		table.setAttribute('border', '0');
		table.setAttribute('cellpadding', '0');

		board.prepend(table)

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
	console.log(connectionPlan);
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
}