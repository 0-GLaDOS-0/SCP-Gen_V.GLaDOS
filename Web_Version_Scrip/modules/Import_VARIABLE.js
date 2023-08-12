'use strict';

/*export */function Dictionary() { //Эта функция генерирует и возвращает словарь Map. Словарь будет как объект у которого значения будут доступны по индексам, только индексы будут начинаться с 1
	let map = new Map();
	const abc = " 0123456789|.,!№;%:?-=+;:~><|*()/AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzАаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЬьЫыЭэЮюЯяІіЇїЄє"
	
	for (let i of abc) {
		map.set(abc.indexOf(i) + 1, i);
	};

	return map;
};

/*export */function Replacement() {
	let map = new Map();
	const from = "уехаросіУКЕНХВАРОСМИТ0ЁЙ3І";
	const to = "yexapociYKEHXBAPOCMNTOENЗI";

	for (let i = 0; (i < from.length) || (i < to.length); i++) {
		map.set(from[i], to[i]);
	};

	return map;
};

/*Немного пояснения. этот модуль не будет  работать без packege.json в корневом каталоге.
так же в это файле должен быть указан "type": "module" и в name указано имя директории
файл package.json создаёться в терминале командой 'npm init -y' а после редактируеться под себя
Что бы импортировать функции от сюда нужно в файле указать import {название функции, другой функции , и т.д...} from './путь до файла/название этого файла.js'*/