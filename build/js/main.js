$(function() {
    if ($(window).width() < 992) {
        $('#edit-btn-pop').on('click', function() {
            $('#order-form').fadeIn()
        })
        $('.order-pop-close ').on('click', function() {
            $('#order-form').fadeOut()
        })
        $('#order-form').mouseup(function(e) { // событие клика по веб-документу
            var div = $(".order__form__back"); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                &&
                div.has(e.target).length === 0) { // и не по его дочерним элементам
                $('#order-form').fadeOut()
            }
        });

    }

    $(window).scroll(function() {
        var wt = $(window).scrollTop();
        var wh = $(window).height();
        var et = $("#order-bot").offset().top;
        var eh = $("#order-bot").outerHeight();
        var dh = $(document).height();
        if ($(window).width() > 991) {
            if (wt + wh >= et || wh + wt == dh || eh + et < wh) {
                $("#order-form").fadeOut()
            } else {
                $("#order-form").fadeIn()
            }
        }

    });

    $('.step6-radio').on('change', function() {
        if ($('.step6-radio-active').is(':checked')) {
            $('.step6__wrap').slideDown()
        } else {
            $('.step6__wrap').slideUp()
        }
    })

    $("[data-tooltip]").mousemove(function(eventObject) {
        $data_tooltip = $(this).attr("data-tooltip");
        $("#tooltip").html($data_tooltip)
            .css({
                "top": eventObject.pageY + 5,
                "left": eventObject.pageX + 5
            })
            .show();
    }).mouseout(function() {
        $("#tooltip").hide()
            .html("")
            .css({
                "top": 0,
                "left": 0
            });
    });


    if ($(window).width() > 992) {
        var date = new Date();
        date.setDate(date.getDate() + 1);

        $("#datepicker").datepicker({
            minDate: date,
            onSelect: function(date) {
                $('#datepicker_value').val(date)
            }
        });
        $.datepicker.regional['ru'] = {
            closeText: 'Закрыть',
            prevText: 'Предыдущий',
            nextText: 'Следующий',
            currentText: 'Сегодня',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
            dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            weekHeader: 'Не',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };
        $.datepicker.setDefaults($.datepicker.regional['ru']);

        $("#datepicker").datepicker("setDate", $('#datepicker_value').val());
    } else {
        $('#datepicker_value').removeAttr('readonly')
    }
    ymaps.ready(function() {
        var myMap = new ymaps.Map('map', {
                center: [55.751574, 37.573856],
                zoom: 9,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            }),

            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),

            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: 'Собственный значок метки',
                balloonContent: 'Это красивая метка'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: './img/label.png',
                // Размеры метки.
                iconImageSize: [44, 55],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-5, -38]
            });

        myMap.geoObjects.add(myPlacemark)


        myMap.behaviors.disable('scrollZoom');

        var ctrlKey = false;
        var ctrlMessVisible = false;
        var timer;

        // Отслеживаем скролл мыши на карте, чтобы показывать уведомление
        myMap.events.add(['wheel', 'mousedown'], function(e) {
            if (e.get('type') == 'wheel') {
                if (!ctrlKey) { // Ctrl не нажат, показываем уведомление
                    $('#ymap_ctrl_display').fadeIn(300);
                    ctrlMessVisible = true;
                    clearTimeout(timer); // Очищаем таймер, чтобы продолжать показывать уведомление
                    timer = setTimeout(function() {
                        $('#ymap_ctrl_display').fadeOut(300);
                        ctrlMessVisible = false;
                    }, 1500);
                } else { // Ctrl нажат, скрываем сообщение
                    $('#ymap_ctrl_display').fadeOut(100);
                }
            }
            if (e.get('type') == 'mousedown' && ctrlMessVisible) { // Скрываем уведомление при клике на карте
                $('#ymap_ctrl_display').fadeOut(100);
            }
        });

        // Обрабатываем нажатие на Ctrl
        $(document).keydown(function(e) {
            if (e.which === 17 && !ctrlKey) { // Ctrl нажат: включаем масштабирование мышью
                ctrlKey = true;
                myMap.behaviors.enable('scrollZoom');
            }
        });
        $(document).keyup(function(e) { // Ctrl не нажат: выключаем масштабирование мышью
            if (e.which === 17) {
                ctrlKey = false;
                myMap.behaviors.disable('scrollZoom');
            }
        });
    });

    // вторая карта
    ymaps.ready(function() {
        var myMap = new ymaps.Map('map2', {
                center: [55.751574, 37.573856],
                zoom: 9,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            }),

            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),

            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: 'Собственный значок метки',
                balloonContent: 'Это красивая метка'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: './img/label.png',
                // Размеры метки.
                iconImageSize: [44, 55],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-5, -38]
            });

        myMap.geoObjects.add(myPlacemark)


    });

})