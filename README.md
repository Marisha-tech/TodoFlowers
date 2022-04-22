# TodoFlowers

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.10.

## Шаблон
https://www.creative-tim.com/product/material-dashboard/?partner=49926

## Подключение bootstrap
<p>https://github.com/fyockm/bootstrap-css-onl</p>
<code>npm install bootstrap-css-only</code>
<p>После чего в папке node_modules создана папка bootstrap-css-only</p>

## Установка библиотеки Angular Material
<p>https://material.angular.io/guide/getting-started</p>
<code>ng add @angular/material</code>
<p>После чего появится папка node_modules/@angular/material</p>

## DI (Dependency Injection)
<p>Dependency Injection - Готовый механизм 'из коробки' Angular</p>
<p>Внедрение зависимости - получение ссылки на экземпляр класса в любом месте, где это необходимо</p>
<p>CategoriesComponent получает доступ к DataHandlerService</p>
<p>Экземпляры компонентов и сервисов создаются автоматически при запуске приложения (либо при первом
обращении к ним)</p>

## Directive
<p>Directive - Директива, инструкция, указание</p>
<p>Инструкция движку Angular для обработки тега </p>
<p>Изменяет/дополняет поведение тега</p>
<p>Component Directives - подставляет содержимое компонент</p>
<p>Attribute Directives - изменяет поведение/отображение тега: <code>[title]=”titleVar”</code></p>
<p>Structural Directives - изменяет структуру: *ngIf, *ngFor (все начинаются с символа *)</p>
https://angular.io/guide/attribute-directives
https://angular.io/guide/structural-directives

## Компонент - это тоже директива
<p>@Component - декоратор - добавляет метаданные к классу, который обрабатывает движок Angular</p>

<p>Когда добавляем тег компонента в  HTML - Angular обрабатывает его и  добавляет весь функционал компонента</p>

## Binding
<p>Binding - связывание чего-либо из HTML (тег, действие, значение) с чем-либо из класса (метод, переменная)</p>
<p>Event binding - связывание событий</p>
<p>С помощью этого механизма обрабатываются почти все действия пользователя</p>
<p>(click) - событие нажатия мышкой, которое можно обработать в классе TS</p>
<p>Доступно множество готовых HTML событий (двойное нажатие, наведение и пр.)</p>

## Реактивное программирование (РП)
<p>Reactive programming (от слова "реакция") - программирование с асинхронными потоками данных</p>
<p>Получаете данные, вызывается метод - всё это "потоки"</p>
<p>Поток - это контейнер для реализации принципов РП</p>
<p>Асинхронные вызовы (не зависает UI) - как только получаем результат - обновляем UI</p>
<p>Принципы "издатель-подписчик" (Observable - за кем наблюдают, observer - кто наблюдает) - нет жесткой связи между объектами, каждый сам выбирает какие данные "слушать" (пример "Excel" - в одном месте меняете значение, в других местах обновляется)</p>
<p>Принцип отопок ("всё - потоки") - можно комбинировать, вкладывать друг в друга и пр. - собирать итоговый вариант как конструктор</p>

## RxJS
<p>https://rxjs.dev/</p>
<p>Реализация РП в JavaScript (TypeScript)</p>
<p>Angular изначально создавался под РП - частичное обновление страниц, быстрый отклик UI, автоматические Ajax запросы</p>
<p>Вручную не нужно выполнять Ajax запросы - все за вас делают Angular + RxJS</p>

## Объекты в RxJS
<p>Объекты в RxJS - готовые решения (контейнеры) для асинхронных вызовов с различным поведением</p>
<p>Нужно "обернуть" данные в контейнер и любой может подписаться на их изменение</p>
<p>Observable - объект, за которым наблюдаем (базовый класс)</p>
<p>Subject - можно слушать изменения и реагировать на них (сам может подписывать на другие Observable)</p>
<p>BehaviorSubject - хранит последнее значение</p>
<p>RelaySubject - хранит N последних значений</p>
<p>Observer (подписчик) не работает напрямую с данными, а только "слушают" изменения и получают обновления</p>

## Pipe
<p>Pipe - позволяет преобразовать значение в любой другой вид</p>
<p>Pipe - класс TS, который "прогоняет" через себя значение и на выходе дает измененный результат. Например, значение даты в нужный формат</p>
<p>Преобразования могут быть любыми (можно создавать свои классы pipe, если нужно специфическое преобразование)</p>
<p>Можно использовать сразу на странице HTML</p>

## Attribute directive
<p>Можно динамически работать со стилями - включать или исключать классы для тега</p>
<p>Angular заменяет готовое решение, которое заменяет jQuery и другие JS-коды для динамической работы со стилями</p>
<p><code>class.active</code></p>
<p><code>checked</code></p>
<p><code>title</code></p>
<p>Если фигурных скобок нет - будет присваиваться текст, а не вычисленное значение</p>
<p>С помощью директивы атрибутов можно указывать динамическое значение из переменной. Значение указывается в двоынйх кавычках <code>[title]="titleValue"</code>, где [title] - атрибут тега, "titleValue" - любое значение, переменная, true/false</p>

## Не путать
<p><b>(click)</b> - event binding - действие, событие, которое вызовет метод из класса</p>
<p><b>{{'значение из переменной'}}</b> - интерполяция, применяется в любом месте на странице (но не для значения атрибута)</p>
<p><b>[title] = “titleValue”</b> - attribute directive, считывание значения из переменной titleValue и запись ее в атрибут <b>title</b>. </p>
<p>Если не будет скобок [], то в атрибут <b>title</b> присвоится текст <b>titleValue</b></p>
<p><b>One-way binding</b> - односторонняя связь</p>
<p><b>[class.completed] = “task.completed”</b> - включение или исключение для тега селектора .completed из CSS</p>

## Таблица
<p>mat-table( mat - от слова material) - Специальный компонент для отображения списка объектов. Встроенные возможности для постраничности, сортировки. Будем отображать список задач (вместо таблицы, которая предоставляется в шаблоне)</p>
<p>https://material.angular.io/components/table/</p>
<p>Компонент находится внутри библиотеки Angular Material (ранее подключали через npm) https://material.angular.io/guide/getting-started</p>

## Импорт
<p>Библиотека @angular/material в файле package.json (обычно добавляется автоматически при установке библиотеки через npm)</p>
<ul> Модули
<li>MatTableModule</li>
<li>MatPaginatorModule</li>
<li>MatSortModule</li>
<li>BrowserAnimationsModule</li>
</ul>
<ul>Модули должны быть импортированы в 2-х местах в файле app.module.ts (Иначе функционал просто не будет работать, хотя никаких ошибок может не отображаться):
<li>import в начале файла</li>
<li>imports в @NgModule</li>
</ul>

## Тема
<p>Подключить тему, в которой уже прописаны многие стили компонентов Angular Material</p>
<p>Выбираем тему deeppurple</p>
<p>Можно выбирать любую другую: https://material.angular.io/guide/theming</p>
<p>Прописать импорт в styles.css: <code>@import '~@angular/material/prebuilt-themes/deeppurple-amber.css';</code> </p>

## DataSource
<p>Mat-table использует datasource -  контейнер с данными и доп. возможностями</p>

## Сортировка и пагинация
<p>Будем использовать: <code>[ngClass] - включение/исключение классов CSS</code><code>*ngIf - условие для отображения тега</code></p>
<p>mat-table - готовые решения для сортировки и постраничности</p>
<p>Можно задавать свои правила сортировки (по какому полю объекта выполнять сортировку) с помощью SortingDataAccessor</p>
<p>Последовательность действий - применить attribute directives: matSort - для таблицы; mat-header-cell - для каждого столбца, по которому нужно сортировать</p>
<p>Если использовать <code>@ViewChild</code>, то с данными можно работать только после <code>ngOnInit(){}</code>, например в <code> ngAfterViewInit(){}</code></p>

## Жизненный цикл компонента - LifeCycle
<p>https://angular.io/guide/lifecycle-hooks</p>
<p>LifeCycle - набор методов, которые вызываются на разных этапах работы компонента (от создания до уничтожения)</p>
<p>Нужно знать, для правильной инициализации переменных (чтобы не было ошибки undefined)</p>
<p>Без полного знаний как работает Angular - нет смысла запоминать все методы. Только по мере их использования (понимания)</p>
<code>
constructor <br>
ngOnChanges <br>
ngOnInit <br>
ngDoCheck <br>
ngAfterContentInit <br>
ngAfterContentChecked <br>
ngAfterViewInit <br>
ngAfterViewChecked <br>
ngOnDestroy
</code>

## DAO (Data Access Object) - паттерн (шаблон)

<p>Используется для того, чтобы код был расширяемым, правильно написанным</p>
<p>DAO - слой между данными и бизнес-процессами</p>
<p>В интерфейсах - описание. В классах - реализация</p>
<p>Доступ к данным не напрямую, а через “интерфейс”</p>
<p>Для чего: формализация, расширяемость, логичность. Часто используется на backend</p>
<p><code>Business Layer <-> DAO (CRUD: Create, Read, Update, Delete). Сам DAO для доступа к БД может использовать что угодно (JDBC API, Hibernate API) <-> DB</code></p>
<p>https://www.netguru.com/codestories/top-5-most-used-patterns-in-oop-with-typescript</p>

## Реализация DAO - Сервисы + DAO
<p>
<code>
Сервисы (@Injectable) -> DAO (Классы, Интерфейсы) -> Данные (любой источник)
</code>
</p>
<p>
!!!!!НЕЛЬЗЯ!!!!!
Сервисы -> Данные
</p>
<p>Сервисы напрямую не обращаются к данным - только с помощью DAO-реализации</p>

Если необходимо добавить новые методы - добавляем в:
    <ol>
        <li>Интерфейсы</li>
        <li>Реализации</li>
        <li>Сервисы</li>
    </ol>
<h4>Принципы подхода:</h4>

<ul>
<li>Не зависим от источника данных - можем подключать любой источник (БД, удаленный сервер, который передает JSON и тд), главное - соблюдать интерфейсы</li>
<li>Виден весь возможный API из интерфейсов - можно оценить общий функционал (какие есть возможности и тд)</li>
<li>Единая точка взаимодействия с данными</li>
</ul>

## Декоратор @Input
<p>@Input - декоратор для передачи входящих параметров компонента</p>
<p>https://angular.io/guide/template-syntax#input-and-outputproperties</p>
<p>Сервис передает нужные данные компоненту (после какого-либо события или при инициализации)</p>
<p>@Input - автоматически подписывается на изменение  данных (как с Observable и subscribe) и заменяет по смыслу</p>
<p>Видны все входящие данные для компонента (все @Input параметры)</p>
<p>Компонент может иметь ряд @Input переменных, нужные для отображения данных</p>
<p>Компонент сам напрямую не запрашивает данные, ему их передает сервис (по необходимости)</p>
<img src="https://github.com/Marisha-tech/TodoFlowers/blob/master/src/assets/img/ac1b7e67c9.png" alt="">

<h4>Parent и Child компоненты</h4>
<p>Parent - родитель - в нашем случае AppComponent</p>
<p>Child - дочерний - в нашем случае TasksComponent</p>

AppComponent (parent)
<ul>
<li>Подписывается на все необходимые данные (subscribe) из DAO</li>
<li>“Раздает” данные всем дочерним элементам</li>
<li> Собирает итоговую страницу из компонентов как “конструктор”</li>
</ul>

TasksComponent (child)
<ul> 
<li>Ждет входящие данные через @Input (как только данные изменятся, @Input это увидит и обновит переменную)</li>
<li>Отображает данные в своем view</li>
</ul>
<p>Сохранить в закладку “Cheat sheet” (шпаргалка) https://angular.io/guide/cheatsheet</p>
<p>Прочитать только до раздела @Output https://angular.io/guide/template-syntax#input-and-output-properties</p>
=======
<p>![ac1b7e67c9](https://user-images.githubusercontent.com/51979512/161208176-e6985301-071f-45d2-8ef4-bb15139eccc8.png)
</p>

## @Output
https://angular.io/guide/template-syntax#how-to-use-output
<p>Событие в дочернем компоненте, на которое может реагировать родительский компонент</p>
<p>@Output - Способ передачи данных от дочернего компонента к родительскому</p>
<p>В одном компоненте могут быть и @Input и @Output</p>
<p>С помощью @Input и @Output:</p>
<ul>
<li>реализовывается принцип слабой связанности компонентов</li>
<li>инкапсуляция компонентов (взаимодействуем с компонентом только с помощью @Input и @Output и не знаем всей “внутренней кухни”)
</li>
</ul>

## Диалоговые окна

<p>https://material.angular.io/components/dialog/overview</p>
<p>MatDialog - готовое решения для работы с диалоговыми окнами из Angular Material</p>
<p>Гибкие настройки, передача данных, изменение внешнего вида</p>
<p>Создадим отдельный компонент EditTaskDialog для создания/редактирования задачи, который будет помещен в диалоговое окно</p>

В файле app.module.ts:
    <ul>
    <li>Импорт MatDialogModule</li>
    <li>Добавить в entryComponents</li>
    </ul>

<p>Void - Указывает, что метод ничего не возвращает. При попытке добавить return - будет ошибка компиляции</p>
<p>Для всех методов желательно указывать void или возвращаемый тип, чтобы облегчить работу компилятора и решать многие проблемы на этапе компиляции. Если тип метода не указан - можно возвращать или не возвращать значение</p>

## Two-way data binding
https://angular.io/guide/template-syntax#two-way-binding
<p>Two-way data binding - Двустороннее связывание.</p>
<p>Считывает и при изменении в HTML (пользователь ввел данные) - записывает значение</p>
<p>Используется везде, где пользователь изменяет значения, в формах, input - компонентах</p>
One-way data binding (read-only):
<ul>
<li><code>Interpolation {{}}</code> - считать свойство и отобразить в HTML</li>
<li><code>Property Binding [ ]</code> - считать свойство и атрибут</li>
<li><code>Event Binding ( )</code> - обработка действия пользователя (метод)</li>
</ul>
Two-way binding:
<ul>
<li> <code>[()]</code> - совмещает считывание свойства атрибута и обработка действия пользователя</li>
</ul>
<p>Директива [(ngModel)] - Используется в тегах, где можно изменить/выбрать данные (текстовое поле, списки и пр.). Считывает значение в элемент и при изменении - записывает в переменную
</p>

## Выбор даты - компонент MatDatepicker

https://v12.material.angular.io/components/datepicker/overview
<p>MatDatepicker - готовый выпадающий календарь. Связываем с текстовым полем input</p>
<p>В app.module.ts импортировать: MatNativeDateModule и MatDatepickerModule</p>

## Pipes
https://angular.io/guide/pipes
<p>Pipe - Готовый набор различных “пайпов”. Можно создавать свои “форматтеры”</p>

## mat-checkbox
https://material.angular.io/components/checkbox/overview
MatCheckboxModule - добавить в add.module.ts
<p>Если на строке “висят” также и другие действия(редактирование задачи и пр.) - желательно сначала выполнять метод $event.stopPropagation()</p>
<p>$event.stopPropagation() - чтобы дальше не выполнялись никакие действия</p>

## Smart and Dumb components

<h2>Архитектура</h2>
<p>Smart компонент - управляет другими компонентами, предоставляет данные</p>
Dumb компонент - получает данные и отображает их, обрабатывает действия пользователей и отправляет их на обработку в Smart компонен<p></p>
<p>Одна из задач - правильно разбить приложение на Smart и Dumb компоненты</p>
<p>Избегаем “каши” из компонентов, которые взаимодействуют не формализовано</p>
<p>Четкое понимание API - как взаимодействуют компоненты</p>
Один из способов решения: архитектура “Smart and Dumb components”:
<ul>
<li>Взаимодействие с компонентами преимущественно через декораторы @Input и @Output</li>
<li>@Input не должны изменяться внутри dumb компонента (это делает smart)</li>
<li>Разделить компоненты-представления (Presentational, Dumb, Pure) и компонентыменеджеры (Smart, Container)</li>
</ul>

<h2>Структура</h2>
<p>Сервисы - AppComponent (вся бизнес-логика) - TodosComponent (отображение) @Input @Output и CategoriesComponent (отображение)  @Input @Output - Другие Dump компоненты</p>
<img src="https://github.com/Marisha-tech/TodoFlowers/blob/master/src/assets/img/Smart-and-Dumb-components.png">
AppComponent - smart, container:
<ul>
<li>Собирает всю страницу из других компонентов</li>
<li>Управляет данными дочерних компонентов</li>
<li>Реагирует на действия дочерних компонентов</li>
</ul>
<p>Минусы: при сложном дереве компонентов - трудно передавать параметры и отслеживать события (решение - использовать библиотеку для хранения состояний, например</p>
TodosComponent, CategoriesComponent - dumb, presentational, pure
<ul>
<li>Получают данные через @Input и отображают</li>
<li>Не знаю откуда данные берутся, их задача - просто отобразить</li>
<li>При необходимости - отправляют действия пользователя с помощью @Output в Smart-компонент</li>
<li>Напрямую не обращаются к данным</li>
</ul>
<p>Каждый компонент должен заниматься только своим делом</p>
<p>**Smart** компоненты нужно разделять логически, в зависимости от круга задач - в нашем случае достаточно одного: **AppComponent**</p>
<p>Содержит все бизнес-процессы, может запрашивать данные</p>
<p>**Dumb** - все компоненты для отображения</p>
<p>Можно изменять внутреннюю реализацию, но это не отразится на работу приложения (т.к. API из набора @Input и @Output не меняется)</p>
<p>Легче тестировать</p>

## Выбор цвета
https://www.npmjs.com/package/ngx-color-picker
<p><code>ngx-color-picker</code> - готовый компонент для выбора цвета в палитре</p>
<p><code>ColorPickerModule</code> - добавить в app.module.ts</p>

## Intro
https://introjs.com/
<p>intro.js - Популярная библиотека на JavaScript, у которой существует адаптированная версия под Angular</p>
<p><code>npm install intro.js --save</code> - установка</p>

## Слайд-меню

https://www.npmjs.com/package/ng-sidebar
<p>ng-sidebar</p>
<p>Боковое слайд-меню формируется с помощью дополнительных тегов. Позволяет реализовать меню с любой стороны и по различным настройкам</p>
<p><code>npm install --save ng-sidebar</code></p>

## Мобильная версия
<p>Основная задача - отображать весь контент на мобильных устройствах</p>
<p>Верстка под небольшие экраны мобильных устройств</p>
<p>Используем Google Chrome для проверки (device toolbar)</p>
<p>Заменяем таблицу с задачами отдельным списком задач (карточки)</p>
<p>Боковое меню будет иметь свои настройки для мобильной версии</p>
<p>Большинство компонентов Angular Material уже адаптированы под моб. Устройства</p>
<p>Если пользователь зашел в приложение через мобильное устройство - используем мобильную верстку, иначе - используем обычную верстку</p>
<p>DeviceDetector - Позволяет определять тип устройства. Внедряется с помощью DI как сервис в любой компонент (https://www.npmjs.com/package/ngx-device-detector)</p>
<p><code>npm i ngx-device-detector --save</code></p>

## TTFB - Производительность приложения
<p>TTFB - Time To First Byte (время до первого байта) - полезен для работы с клиентами или группой тестирования</p>
<p>Можно "отловить" медленную работы сервера (например, закончилась оперативная память и сервер "свопит" данные на жесткий диск и только потом "отдает")</p>
<p>Медленная работа жесткого диска (битые сектора и пр)</p>
<p>Медленная сеть на стороне сервера</p>

## Performance
<p>Performance - производительность приложения в Angular</p>
<p>Как узнать на чьей стороне проблема?</p>
<ul>
Базовые причины медленной работы приложения:
<li>Лишняя отрисовка (обновление всего дерева компонентов, а не только то, что изменилось)</li>
<li>Синхронные запросы (неиспользование RxJS)</li>
<li>Нагрузка сети, жесткого диска, ОЗУ и пр. - как у клиента, так и у сервера</li>
<li>антивирусы, фаерволы</li>
</ul>
<p>С помощью инструмента Google Chrome Developer Tools можно проверить производительность</p>
<p>Кэширование браузера - ускоряет работы приложения</p>

## HAR file (HTTP Archive)
<p>HAR file - полезен для работы с клиентами или группой тестирования</p>
<p>Как только кто-то нашел баг в отображении - можно сформировать HAR файл и отправить для анализа</p>
<p>Файл могут формировать почти все современные браузеры</p>

## Heap snapshot
https://developer.chrome.com/docs/devtools/memory-problems/heap-snapshots/

https://developer.chrome.com/docs/devtools/memory-problems/memory-101/

https://www.yourkit.com/docs/java/help/sizes.jsp

https://slides.com/gruizdevilla/memory - Поиск и отладка утечек памяти в JavaScript с помощью Chrome DevTools

<p>Heap snapshot - в консоли вкладка "Memory" - кнопка "Take heap snapshot"</p>
<p>Главная задача - избежать memory leak - объекты не удаляются из памяти инструментов Garbage Collector, а накапливаются и "забивают" память</p>
<p>GC удаляет те объекты, на которые никто не ссылается</p>
<p>Distance - расстояние от GC root до объекта</p>
  
![Heap snapshots distance](https://user-images.githubusercontent.com/51979512/164588616-9cc3d313-a003-475e-b642-ed74ec9bacdd.jpg)
<p>Подробно по значениям сети</p>
![memory leak](https://user-images.githubusercontent.com/51979512/164588425-da5d0410-4b6e-4235-ae73-70f7188e7ee5.jpg)

<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>

<p>
Может данные позже приходят, в ts файле когда таскс присваивается?
У меня проблемы были, когда в онИните присваивал вместо конструктора например.
В сервисе можно сделал сабджект loading$ и ставить ему true в начале ручки, где таски получаешь и в конце false, затем прокинуть сервис в конструктор компонента и уже там в вёрстке сделать ngif на лоадинг из сервиса
</p>


