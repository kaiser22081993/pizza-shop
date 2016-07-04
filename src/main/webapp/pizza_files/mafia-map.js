var myMap;
var g_route;

function getRoute(event){
            event = event || window.event;
            var rest_event = event.target || event.srcElement; // make it cross-browser
            var rest_str = rest_event.getAttribute("data-coord"); // data from restaurant onclick
            var rest_coords = rest_str.split(',').map(function(e){
                                                            return e.trim() // split string to array
                                                        }) 
        
            ymaps.geolocation.get().then(function (res) {
                user_position = res.geoObjects.get(0).properties.get('boundedBy')[0];
                var user_city = [user_position[0], user_position[1]];                
                var position_set = [user_city, rest_coords]; // array for route [from_coords, to_coords]
                ymaps.route(position_set, {
                    mapStateAutoApply: true // map automatic positioning 
                }).then(function (route) {
                    if ('undefined' !== typeof g_route) { // если ранее прокладывали маршрут
                        myMap.geoObjects.remove(g_route); // уберем его с карты
                    }
                    // прокладываем новый маршрут
                    myMap.geoObjects.add(route);
                    g_route = route; // сохраняем в глобальном scope
                    // когда будем прокладывать второй маршрут, в g_route будет храниться предыдущий
                },
                    function (error) {
                         alert('Возникла ошибка: ' + error.message);
                    }
                );    
            })
};

/* ===================================

    ИНИЦИАЛИЗАЦИЯ КАРТЫ

====================================== */

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    
   var data = $('#map').data('data'); // get json data with name data
   var city_center = data.current_city; // current city
   var restaurants = data.restaurants; // restaurants in city
   var cities = data.cities; // other cities
   var listBoxItems = [];
   // populates listBoxItems with each city data
   for(i=0;i<cities.length;i++){
        var data = {};
        data.content = cities[i]["city"][0]["name"];
        data.href = cities[i]["city"][0]["url"];
        data.zoom = 9;        
        var city_object = new ymaps.control.ListBoxItem({data: data});
        listBoxItems.push(city_object);
    };
    
   myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: city_center[0]["coord"], // city center coordinates
        zoom: 11,
        controls: [],
    });

    //myMap.events.add('click', function (e) { 
        //myMap.balloon.close();
    //});  
    
    
    

/* ===================================

    ДОБАВЛЕНИЕ ВЫПАДАЮЩЕГО СПИСКА

====================================== */

   // Создадим собственный макет выпадающего списка.
        ListBoxLayout = ymaps.templateLayoutFactory.createClass(
            "<button id='my-listbox-header' class='dropdown-toggle mafia-list-btn' data-toggle='dropdown'>" +
               "<span class='map-icon-dropdown'></span>" + "<span>{{data.title}}</span>   " + "<span class='arrow-dropdown'></span>" +
            "</button>" +
            // Этот элемент будет служить контейнером для элементов списка.
            // В зависимости от того, свернут или развернут список, этот контейнер будет
            // скрываться или показываться вместе с дочерними элементами.
            "<ul id='my-listbox'" +
                " class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu'" +
                " style='display: {% if state.expanded %}block{% else %}none{% endif %};'></ul>", {

            build: function() {
                // Вызываем метод build родительского класса перед выполнением
                // дополнительных действий.
                ListBoxLayout.superclass.build.call(this);

                this.childContainerElement = $('#my-listbox').get(0);
                // Генерируем специальное событие, оповещающее элемент управления
                // о смене контейнера дочерних элементов.
                this.events.fire('childcontainerchange', {
                    newChildContainerElement: this.childContainerElement,
                    oldChildContainerElement: null
                });
            },

            // Переопределяем интерфейсный метод, возвращающий ссылку на
            // контейнер дочерних элементов.
            getChildContainerElement: function () {
                return this.childContainerElement;
            },

            clear: function () {
                // Заставим элемент управления перед очисткой макета
                // откреплять дочерние элементы от родительского.
                // Это защитит нас от неожиданных ошибок,
                // связанных с уничтожением dom-элементов в ранних версиях ie.
                this.events.fire('childcontainerchange', {
                    newChildContainerElement: null,
                    oldChildContainerElement: this.childContainerElement
                });
                this.childContainerElement = null;
                // Вызываем метод clear родительского класса после выполнения
                // дополнительных действий.
                ListBoxLayout.superclass.clear.call(this);
            }
        }),

        // Также создадим макет для отдельного элемента списка.
        ListBoxItemLayout = ymaps.templateLayoutFactory.createClass(
            "<li><a href={{data.href}}>{{data.content}}</a></li>"
        ),

        // Теперь создадим список, содержащий 2 пунтка.
        listBox = new ymaps.control.ListBox({
                items: listBoxItems,
                data: {
                    title: "Рестораны / " + city_center[0]["name"] // current city name
                },
                options: {
                    // С помощью опций можно задать как макет непосредственно для списка,
                    layout: ListBoxLayout,
                    // так и макет для дочерних элементов списка. Для задания опций дочерних
                    // элементов через родительский элемент необходимо добавлять префикс
                    // 'item' к названиям опций.
                    itemLayout: ListBoxItemLayout
                }
            });

        listBox.events.add('click', function (e) {
            // Получаем ссылку на объект, по которому кликнули.
            // События элементов списка пропагируются
            // и их можно слушать на родительском элементе.
            var item = e.get('target');
            // Клик на заголовке выпадающего списка обрабатывать не надо.
            if (item != listBox) {
                myMap.setCenter(
                    item.data.get('center'),
                    item.data.get('zoom')
                );
            }
        });

    myMap.controls.add(listBox, {float: 'left'});
    
/* ===================================

    ДОБАВЛЕНИЕ ПОЛЗУНКА МАСШТАБА

====================================== */
        ZoomLayout = ymaps.templateLayoutFactory.createClass("<div class='btn-wrap'>" +
                "<div id='zoom-in' class='btn'><i class='icon-plus'></i></div>" +
                "<div id='zoom-out' class='btn'><i class='icon-minus'></i></div>" +
            "</div>", {

            // Переопределяем методы макета, чтобы выполнять дополнительные действия
            // при построении и очистке макета.
            build: function () {
                // Вызываем родительский метод build.
                ZoomLayout.superclass.build.call(this);

                // Привязываем функции-обработчики к контексту и сохраняем ссылки
                // на них, чтобы потом отписаться от событий.
                this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                // Начинаем слушать клики на кнопках макета.
                $('#zoom-in').bind('click', this.zoomInCallback);
                $('#zoom-out').bind('click', this.zoomOutCallback);
            },

            clear: function () {
                // Снимаем обработчики кликов.
                $('#zoom-in').unbind('click', this.zoomInCallback);
                $('#zoom-out').unbind('click', this.zoomOutCallback);

                // Вызываем родительский метод clear.
                ZoomLayout.superclass.clear.call(this);
            },

            zoomIn: function () {
                var map = this.getData().control.getMap();
                // Генерируем событие, в ответ на которое
                // элемент управления изменит коэффициент масштабирования карты.
                this.events.fire('zoomchange', {
                    oldZoom: map.getZoom(),
                    newZoom: map.getZoom() + 1
                });
            },

            zoomOut: function () {
                var map = this.getData().control.getMap();
                this.events.fire('zoomchange', {
                    oldZoom: map.getZoom(),
                    newZoom: map.getZoom() - 1
                });
            }
        }),
        zoomControl = new ymaps.control.ZoomControl({ options: { layout: ZoomLayout} });

    myMap.controls.add(zoomControl, {
        float: 'none',
        position: {
            top: 50,
            right: 10
        }
    });

   // Макет кнопки должен отображать поле data.content
        // и изменяться в зависимости от того, нажата кнопка или нет.
        ButtonLayout = ymaps.templateLayoutFactory.createClass(
            "<div class='fullscreen-button {% if state.selected %}my-button-selected{% endif %}'>" +
                "{{data.content}}" +
                "</div>"
        ),
            
        button = new ymaps.control.Button({           
            options: {
                layout: ButtonLayout
            }
        });


     var fullscreenControl = new ymaps.control.FullscreenControl({ options: { layout: ButtonLayout} });
myMap.controls.add(fullscreenControl);
            


 
/* ===================================

    СОЗДАНИЕ СТИЛИЗИРОВАННОЙ МЕТКИ И БАЛУНА

====================================== */

    // marks for each restaurant
    for(i=0; i<restaurants.length; i++){
        var coord = restaurants[i]["rest"][0]["coord"];
        var address = restaurants[i]["rest"][0]["address"];
        var location = restaurants[i]["rest"][0]["location"];
        var phone = restaurants[i]["rest"][0]["phone"];
        var hours = restaurants[i]["rest"][0]["hours"];
        var url = restaurants[i]["rest"][0]["url"];
        var myPlacemark = new ymaps.Placemark(coord, {
            balloonContentBody: [
                                '<div class="baloon-wrapper">',
                                    '<div class="baloon">',
                                        '<p>' + address + '</p>',
                                        '<p>' + location + '</p>',
                                        '<p class="baloon-phone">' + phone + '</p>',
                                        '<div class="baloon-divider"></div>',
                                            '<p>Режим работы: ' + hours + '</p>',
                                            '<div class="baloon-buttons">',
                                                '<div class="baloon-button-wrap">',
                                                    '<a href="' + url + '">Подробнее о ресторане</a></div>',
                                                '<div class="baloon-button-wrap route" data-coord="' + coord + '" onclick="getRoute(event);">Проложить маршрут</div>',
                                            '</div>',
                                        '</div>',
                                    '<a id="close" onclick="myMap.balloon.close()"></a>',
                                '</div>'
            ].join('')            
            },              
            
            {iconLayout: 'default#image',
            iconImageHref: '/static/img/mark.png',
            iconImageSize: [36, 50],
            hideIconOnBalloonOpen: false,
            balloonOffset: [3, -40],
            balloonContentSize: [245, 141],
            balloonContentOffset: [20, 0],
            balloonLayout: "default#imageWithContent",
            balloonImageHref: '/static/img/baloon.png',
            balloonImageOffset: [25, 5],
            balloonImageSize: [245, 141],
            balloonCloseButton: true            
            });
    
        myMap.geoObjects.add(myPlacemark);
   };
   
  
   //myMap.geoObjects.add(myPlacemark);

   myPlacemark.events
    .add('mouseenter', function (e) {
        // Ссылку на объект, вызвавший событие,
        // можно получить из поля 'target'.
        e.get('target').options.set('iconImageHref', '/static/img/mark-active.png');
    })
    .add('mouseleave', function (e) {
        e.get('target').options.set('iconImageHref', '/static/img/mark.png');
    })
}


$(document).ready(function(){
    if($("#map").length){
        // Дождёмся загрузки API и готовности DOM.
        ymaps.ready(init);
    }
});
