# SCP-Gen_V.GLaDOS
Цель : генерация комнат на карте 

Весь код поделён на блоки. Названия блоков находяться над самими же блоками. Разделены блоки - тремя строчками, считая название блока.
Алгоритм генерации плана разбит на части и заключён в функии и методы, для удобства. Каждая из частей-функций это шаги к полностью случайному плану уровня, но некоторые "шаги" могут повторяться не один раз.
Но для начала в ведём небольшую терменологию

Терменология:
• Зерно - Базовое значение, типа int, помогающие в "случайности" генерации плана
• Ячейка - Участок мира 25х25 блока в которой либо ничего нет либо содержиться объект комнаты (если мы говорим про план) или структура комнаты (если мы говорим про карту)
• Комната - это ячейка, значение которой по с15 не равно нулю
• Болванка - объект комнаты с "чистыми" значениями параметров.
• План - Массив или список, элементы которого это ячейки 
• Карта - сетка нумеряция ячеек которой начинаеться с левого нижнего угла и продолжаеться с лева на право(ОХ), с низу в верх(ОУ), от 00 до 99
• Координата комнаты - это индекс массива floorPlan (от 0 до 99) присвоенный взаимо однозначно объекту комнаты в параметр cords; также это двузначное число разряд десятков которого показывает положение по Оси ОУ(с низу в верх), а разряд едениц по Оси ОХ(с лева на право)
• Блок комнат - это 9 комнат расположеных на карте, в форме квадрат
• Конечня комнта - комната которая имеет ровно один ощий шлюз с любой соседней комнатой (или по s15 равно или 1 или 2 или 4 или 8)
• Шлюз - это проход соединяющий данную комнату с соседней(по карте), бывают 4х типов: верхний, правый, нижний, левый
• Сосед - ближайшая комната в одном из четырёх напровлений по карте. По клану сосед с верху от данной комнаты находиться в +10 позициях, сосед снизу в -10 позиях, справа +1, с лева -1
• Кольцо - блок комнат, без центральной комнаты

Блоки: 
1. Объявление Вспомогательных функций 
    Выделлено в отдельный, самый верхний, блок из-за того что в следующем блоке используються функции какраз из этого блока. Объявление функций-методов происходит через объект rundom.
2. Объявление переменных
	Объявление всех переменных, в основном через сonst, крое numberOfRooms т.к. она содержит элементарное значение int изменяющиеся на протяжении работы кода.
3. Основные функции
	Основные функции - алгоритм разбитый на части и заключённый функции или методы объектов.
4. Пошаговое выполнение
	Последовательный вызов основных вункций. Кроме visitRoom он будет выполняться пока количество комнат не привысит минимум комнат.
5. Визуализация
	Временная часть кода. Нужна для отладки и визуализации генерации.

Алгоритм(в крацие):
1. Генериируеться массив из пустых комнат(план)
2. В план добавляеться сттартовая комната
3. Тамгде у стартовой комнаты есть открытые шлюзы ставяться комнаты
3.1 У этих комнат случайным образом генерируються значения шлююзов (кроме шлюза, который ведёт к изначальной комнате, он всегда true)
4. Если есть на карте блоки комнат, тогда генерируеться кольцо
5. Далее генерируеться карта по созданному плану и выводиться в  консоль, для отладки и визуализации

Алгоритм:
0. startRoom - это не совсем метод или функция, но остановимся по подробней
	При определении значений шлюзов у стартовой комнаты может возникнуть ошибка "нулевых шлюзов", когда все шлюзы равны false, и код уходит в рекурсию на стадии visitRoom(т.к. никогда не наберёться нужное количество комнат).
	Для такого случая после объявления startRoom идёт цикл while который изменяет параметр уже созданной стартовой комнаты. Пока шлюзы будут равны false, цикл будет продолжаться.
1. autoFillFloarPlan() - Заполняет пустой массив floorPlan болванками, в количестве 100 шт (по индексам от 0 до 99)
    1.1 
        Цик for проходит кооординаты всех 100 комнат. 
    1.2 
        Если координата равна зерну, то на это место в массиве вставляеться объект стартовой комнаты (!оригинальный, не скопированый), во всех остальных вставляються копии болванок и  срзу присваивают в их свойство "cords" координату комнаты "cordRoom". Копирование происходит через двойную конвертацию в строковый формат JSON и обратно в формат объекта.
2. visitRoom() - проходит по всему плану и проверяет комнаты.
	2.0.1 
		Цик while нужен чтобы этот шаг алгоритма выполнялся до тех пор пока количество комнат не привысит минимум. Также этот цикл после каждой итерации(вызова функции visitRoom) записывает текущее(на момент итерации) значение numberOfRooms в специальный массив writingValues.
	2.0.2 
		Далее текущие значение numberOfRooms сравниваеться с предпоследним значением из массива writingValues, если они совпадают это означает что произошла ошибка - осталась единственная комната со свободным шлюзом, при этом шлюз лежит на краях карты(дальше комнаты генерироваться не могут), а минимум комнат всё ещё не привышен. Код уходит в рекурсию.
	2.0.3 
		При возникновении ошибки, код перезадаёт значение зерна и значение шлюзов у стартовой комнаты
	2.0.4 
		При помощи цикла while испраляем ошибку нулевых шлюзов
	2.0.5 
		Очиска плана(через сокращение его длины до нуля), запуск повторного заполнения плана(уже с изменёными значениями стартовой комнаты), сброс счётчика комнат и списка значений счётчика
	2.1.1 
		Выбираеться определённый элеммент мессива loorPlan и относительно него объявляються временные переменные, постоянные только для итерации именно данного элемента, такие как: тип данной комнаті, тип комнат-соседей, и состояние шлюзов данной комнаты
	2.1.2 Если данная комната не лежит в самой верхней строке карты(cordRoom<90), тогда мы можем определить тип верхней комнаты в перемменую typeUpRoom
		1.2.1 
			Если тип данной комнаты определён и верхний шлюз существует и сосед с верху - ячейка(typeUpRoom == null), то мы передаём верхнюю комнату в метод upRoom объекта edit
		1.2.2 
			Метод upRoom именяет тип этой комнаты на "changed"("отредактировано") и все шлюзы кроме нижнего, который будет установлен true(т.к. дожен быть шлюз с исходной комнатой), определяет значение случайно. После чего увеличивает значение счётчика комнат numberOfRooms на еденицу
	2.1.3 Если данная комната не лежит в самм правом столбце карты(cordRoom%10 != 9), тогда мы можем определить тип правой комнаты в перемменую typeRightRoom
		1.3.1 
			Если тип данной комнаты определён и правый шлюз существует и сосед с права - ячейка(typeRightRoom == null), то мы передаём правую комнату в метод rightRoom объекта edi
		1.3.2 
			Метод rightRoom именяет тип этой комнаты на "changed"("отредактировано") и все шлюзы кроме левого, который будет установлен true(т.к. дожен быть шлюз с исходной комнатой), определяет значение случайно. После чего увеличивает значение счётчика комнат numberOfRooms на еденицу
	2.1.4 Если данная комната не лежит в самой нижней строке карты(cordRoom>9), тогда мы можем определить тип нижней комнаты в перемменую typeDownRoom
		1.4.1 
			Если тип данной комнаты определён и нижний шлюз существует и сосед с низу - ячейка(typeDownRoom == null), то мы передаём нижнюю комнату в метод downRoom объекта edit
		1.4.2 
			Метод downRoom именяет тип этой комнаты на "changed"("отредактировано") и все шлюзы кроме верхнего, который будет установлен true(т.к. дожен быть шлюз с исходной комнатой), определяет значение случайно. После чего увеличивает значение счётчика комнат numberOfRooms на еденицу
	2.1.5 Если данная комната не лежит в самом левом столбце карты(cordRoom%10 != 0), тогда мы можем определить тип левой комнаты в перемменую typeLeftRoom
		1.5.1 
			Если тип данной комнаты определён и левый шлюз существует и сосед с лева - ячейка(typeLeftRoom == null), то мы передаём левую комнату в метод leftRoom объекта edit
		1.5.2 
			Метод leftRoom именяет тип этой комнаты на "changed"("отредактировано") и все шлюзы кроме правого, который будет установлен true(т.к. дожен быть шлюз с исходной комнатой), определяет значение случайно. После чего увеличивает значение счётчика комнат numberOfRooms на еденицу
3. genRing() - создаёт кольца на карте из блоков комнат 
	3.1 Цик for проходит каждую ячейку в плане от 12(потому что ячейки ниже чем 12 не моогут быть центрами блоков) до 88(потому что ячейки выше не могут быть центрами комнатами)
		3.1.0 
			Если ячейка не крайняя с лева и с права(если она карайняя с лева то её координата при делении с сотатокм на 10 будет давать 0, если с права до 9)
		3.1.1
			Если Комнаты по диагоналям также сверху и снизу также справа и слева - определены 
		3.1.2 
			Тогда центральная комната блока перезаписываеться через двойную конвертацию JSON 
			К параметру cords, новой комнаты, присваиваеться "координаты на которых сейчас цикл"(индекс итерации внешнего цикла)
			У верхней, правой, нижней и левой комнаты значение шлюзов ведущих к новой комнате изменяеться на false
			...
 <!-- важно!! генератор колец, просто уберает комнату, вполне возможно что он может разрубить карту на две части -->

Дополнительно: 
• Систма 15ти(*также "с15", "s15"*) - формат записи, параметров шлюзов объекта комнаты
	Эта система была разработана Minovel, также и спользуеться в SCP-Gen_V.Minovel. 
	Суть: численно показать с какими комнатами состыкована данная. Такой формат хранения данных очень компактен, практично его использовать в #генераторе типа коомнат#.
	Принцип работы: 
		Пусть имееться данная ячейка. Если у неё появляеться общий шлюз с верхней комнатой, то к параметру s15 данной ячейке прибавляеться значени 1; и эта ячейкка становиться комнатой(в даном случае конечной).
		Для каждого направления по карте имееться свой коэффициент добавляющийся к параметру s15: для верхнего шлюза = +1, правый = +2, нижний = +4, левый = +8.
		Для каждой комбинации шлюзов в комнате взаимо однозначно определенно число по с15. *Проверить не сложно: есть только два состояния шлюза(открытый - true; закрытый - false), всего шлюзов 4 => 2^4 = 16 - шестнадцать вариантов комнат. Но тогдп почему система 15ти а не 16ти? Потому, что случай когда все шлюззы = false - это ячейка а не комната. __Система 15ти определяет только комнаты!!!__*