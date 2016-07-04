$(function () {
    $('.city-selector').change(function () {
        window.location = '/' + $(this).val() + '/?city_changing=1';
    });
    var $buttons = $('.btn-add, .btn-add2, .btn-order, #top_menu_right .btn-01, #top_menu_right .btn-02, .btn-submit, .btn-submit-green, .btn-submit-flat');
    $buttons.live('mousedown', function () {
        $(this).addClass('pushed');
    });
    $buttons.live('mouseup', function () {
        $(this).removeClass('pushed');
    });

    if ('\v' == 'v') // test if IE
        return;
    $('form[rel="ajax"]').live('submit', function (e) {
        var form = $(this);
        form.fadeOut('normal');
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form.serialize(),
            success: function (data) {
                if (typeof data === 'object') {
                    if (data.status === 'ok') {
                        if (typeof data.text === 'string')
                            alert_popup(data.text, data.action, data);
                        else if (data.action === 'reload')
                            window.location = window.location;
                        else if (data.action === 'redirect')
                            window.location = data.redirect;
                        else if (data.action === 'close_facebox')
                            $(document).trigger('close.facebox');
                    } else if (data.action == 'errors') {
                        form.find('.errors').html(data.html);
                        form.fadeIn('slow');
                    } else {
                        form.queue(function () {
                            form.find('fieldset').html(data.html);
                            $(this).dequeue();
                        });
                        form.fadeIn('slow');
                    }
                } else {
                    form.queue(function () {
                        form.find('fieldset').html(data);
                        $(this).dequeue();
                    });
                    form.fadeIn('slow');
                }
            }
        });
        e.preventDefault();
        return false;
    });
    /* open big images in facebox popup */
    //$('#flatpage img').each(function() {
    //    var $this = $(this);
    //    if ($this.width() > 680) {
    //        $this.height(200/$this.width() * $this.height());
    //        $this.width(200);
    //        var html = '<a href="'+this.src+'" rel="facebox">';
    //        html += $this.get(0).outerHTML + '</a>';
    //        $this.get(0).outerHTML = html;
    //    }
    //});

    /* open big images in facebox popup
     keep popups functionality and keep links from pictures*/
    $('#flatpage img').each(function () {
        var $this = $(this);
        if ($this.width() > 680) {
            //$this.height(200/$this.width() * $this.height());
            //$this.width(200);
            var html = '<a href="' + this.src + '" rel="facebox">';
            html += $this.get(0).outerHTML + '</a>';
            $this.get(0).outerHTML = html;
        }
    });


    /* move gallery if needed */
    if ($('#place-for-gallery').length && $('.gallery-widget').length) {
        $('#place-for-gallery').html('');
        $('.gallery-widget').appendTo($('#place-for-gallery'));
    }

    $('#cer_login').live('keyup', function (ev) {
        var input = $(this);
        var login = input.val();
        if (!login) {
            input.css('color', 'initial');
            return;
        }
        $.ajax({
            type: 'POST',
            url: '/cabinet/check_mail_login/',
            data: {'login': login},
            beforeSend: function (jqXHR, settings) {
                jqXHR.setRequestHeader('X-CSRFToken', $('input[name=csrfmiddlewaretoken]').val());
            },
            success: function (result) {
                if (result.exists) {
                    input.css('color', 'red');
                } else {
                    input.css('color', 'initial');
                }
            }
        });
    });

    $('#cer_passwd').live('keyup', function (ev) {
        var input = $(this);
        var passwd = input.val();
        if (!passwd || passwd.length < 8) {
            input.css('color', 'red');
        } else {
            if (0) $.ajax({
                type: 'POST',
                url: '/cabinet/check_mail_passwd/',
                data: {'passwd': passwd},
                beforeSend: function (jqXHR, settings) {
                    jqXHR.setRequestHeader('X-CSRFToken', $('input[name=csrfmiddlewaretoken]').val());
                },
                success: function (result) {
                    if (result.exists) {
                        input.css('color', 'red');
                    } else {
                        input.css('color', 'initial');
                    }
                }
            });
            input.css('color', 'initial');
        }
    });

    $(document).ready(function () {
        var loginElement = $('#cabinet_mail_box a[login]');
        var text = loginElement.text();
        var login = loginElement.attr('login');
        text = text.replace('mafia.ua', login + '@mafia.ua')
        loginElement.text(text);
    });

    function gen_password(limit) {
        limit = limit || 8;
        var password = '';
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var list = chars.split('');
        var len = list.length, i = 0;
        do {
            i++;
            var index = Math.floor(Math.random() * len);
            password += list[index];
        } while (i < limit);
        return password;
    }


    $('#email_register_form input.gen').live('click', function (ev) {
        var password = gen_password();
        $('#email_register_form input.generated').val(password);
    });

    function hideAddress(hide) {
        if (hide) {
            $('div[name="hidden_address"]').hide();
        } else {
            $('div[name="hidden_address"]').show();
        }
    }

    function disableItem(item) {
        if (item.val()) {
            item.removeClass('disabled');
            item.parent('div').removeClass('disabled2');
            item.addClass('identify');
        } else {
            item.addClass('disabled');
            item.removeClass('identify');
            item.parent('div').addClass('disabled2');
        }
    }

    var orderForm = $('#form-order');
    orderForm.find('.disabled').live('keyup', function (ev) {
        var item = $(ev.target);
        disableItem(item);
    });

    orderForm.find('select.disabled').live('change', function (ev) {
        var item = $(ev.target);
        disableItem(item);
    });

    orderForm.find('.identify').live('change', function (ev) {
        var item = $(ev.target);
        disableItem(item);
    });

    orderForm.find('.identify').live('keydown', function (ev) {
        var item = $(ev.target);
        var key = (ev.keyCode ? ev.keyCode : ev.which);
        if (key === 8 || event.keyCode === 46) {
            disableItem(item);
        }
    });


    $('#menu').find('>li').live('click', function () {
        var index = $(this).index();
        $("#formType").attr("value", index);
        cart_update('/shop/cart/update/');
        if (!$(this).hasClass('active')) {
            $('#menu').find('>li').removeClass('active');
            $(this).addClass('active');
            var fds = $('#form-order').find('fieldset');
            switch (index) {
                case 0: // delivery
                    fds.eq(2).hide();
                    fds.eq(3).hide();
                    hideAddress(false);
                    break;
                case 1: // in time
                    fds.eq(2).hide();
                    fds.eq(3).show();
                    hideAddress(false);
                    break;
                case 2: // to go
                    fds.eq(2).show();
                    fds.eq(3).show();
                    hideAddress(true);
                    break;
            }
            //if there were errors in the form - clear them all so the next form we switched to is clear
            $(".check").removeClass("warning");
            $(".warning-label-name").remove(); // remove message about wrong customer name
            $(".warning-label").remove();

            // the next two lines ensure that after switch of order type - form is checked
            // in case obligatory fields are empty - appropriate errors are issued
            // it is a submission of order form - same as click of Order button in popup
            //$('#form-order').submit();
            //error();
        }
    });

    $('#SMS').live('click', function (ev) {
        var callOperItem = $('#callOperator');
        if (callOperItem.hasClass('checked')) {
            callOperItem.click();
        }
    });

    $('#callOperator').live('click', function (ev) {
        var smsItem = $('#SMS');
        if (smsItem.hasClass('checked')) {
            smsItem.click();
        }
        var self = $('#callOperatorReal');
        if (self.is(':checked')) {
            self.parent('div').addClass('disabled3');
        } else {
            self.parent('div').removeClass('disabled3');
        }
    });

    $('.payment').live('click', function (ev) {
        var payment = $('#get_payment').val();
    });

    $('#cash').live('click', function (ev) {
        var creditCardItem = $('#creditCard');
        if (creditCardItem.is(':visible')) {
            if (creditCardItem.hasClass('checked')) {
                creditCardItem.click();
            }
        }
    });

    $('#creditCard').live('click', function (ev) {
        var cacheItem = $('#cash');
        if (cacheItem.hasClass('checked')) {
            cacheItem.click();
        }
        var self = $('#creditCardReal');
        if (self.is(':checked')) {
            self.parent('div').addClass('disabled3');
        } else {
            self.parent('div').removeClass('disabled3');
        }
    });

    $('#buy').live('click', function (ev) {
        var self = $('#buyReal');
        if (self.is(':checked')) {
            self.parent('div').addClass('disabled3');
        } else {
            self.parent('div').removeClass('disabled3');
        }
    });

    $('#menu').find('>li').live('click', function (ev) {
        $('.errors').text('');
        $('[name="type"]').val($(ev.target).index());
        var hour = new Date().getHours();
        var minute = new Date().getMinutes();
        var minutes = hour * 60 + minute;
        if (minutes > 22 * 60 + 30) {
            $('select[name="date"]').val(1);
            $('select[name="time_hours"]').val(0);
            $('select[name="time_minutes"]').val(30);
        } else {
            minutes += 90;
            $('select[name="time_hours"]').val(Math.floor(minutes / 60));
            $('select[name="time_minutes"]').val(Math.floor((minutes % 60) / 10) * 10 + 10);
        }
    });

    $('select[name="date"],select[name="time_hours"],select[name="time_minutes"]').live('change', function (ev) {
        var city = $.cookie('city');
        // Default time for most cities
        var tech_break_start_time = 5 * 60 + 50;
        var tech_break_end_time = 10 * 60;

        if (city == "kharkov") {
            // Харьков - 05.00 - 10.00
            tech_break_start_time = 5 * 60;
            tech_break_end_time = 10 * 60;
        }
        if (city == "dnepropetrovsk" || city == "kiev") {
            // Днепропетровск - 06.00 - 10.00
            // Киев - 05.00 - 6.00
            tech_break_start_time = 6 * 60;
            tech_break_end_time = 10 * 60;
        }
        if (city == "mariupol") {
            // Харьков - 05.00 - 10.00
            tech_break_start_time = 21 * 60;
            tech_break_end_time = 10 * 60;
        }


        var now = new Date();
        // Calculate minutes count from 00:00 to current time
        var minutes = now.getHours() * 60 + now.getMinutes();
        // Get time that client choose for order arrived
        var client_minutes = $('select[name="time_hours"]').val() * 60 + $('select[name="time_minutes"]').val() * 1;
        //console.log("client_minutes -> " + client_minutes );
        var date_delivery = $('select[name="date"]').val().split(' ')[0];
        var date_now = now.getDate();
        console.log("minutes = " + minutes + "client minutes = " + client_minutes);
        var show_alert = false;
        var th_b_st_time_h = Math.floor(tech_break_start_time / 60);
        var th_b_st_time_m = tech_break_start_time % 60;
        var th_b_end_time_h = Math.floor(tech_break_end_time / 60);
        var th_b_end_time_m = tech_break_end_time % 60;

        if (th_b_end_time_h.toString().length == 1) {
            th_b_end_time_h = "0" + th_b_end_time_h;
        }
        if (th_b_end_time_m.toString().length == 1) {
            th_b_end_time_m = "0" + th_b_end_time_m;
        }
        if (th_b_st_time_h.toString().length == 1) {
            th_b_st_time_h = "0" + th_b_st_time_h;
        }
        if (th_b_st_time_m.toString().length == 1) {
            th_b_st_time_m = "0" + th_b_st_time_m;
        }

        // If delivery time 'less' than 'current' time. Marti Mu vse prosrali
        if (minutes + 90 > client_minutes) {
            console.log('Past Simple');
            show_alert = true;
            console.log(show_alert);
            if ($('select[name="date"]').val().split(' ')[0] != now.getDate()) {
                console.log('Future Simple');
                show_alert = false
            }
        }

        console.log("Break time - start " + tech_break_start_time);
        console.log("Break time - end " + tech_break_end_time);
        // If delivery time get get into technical break
        if (client_minutes >= tech_break_start_time && client_minutes <= tech_break_end_time) {
            // We have to convert 90 minutes to 01:30.
            console.log("Techbreak");
            show_alert = true;
        }
        if (show_alert) {

            window.alert('Неверно заданное время: Технический перерыв с '
                + th_b_st_time_h + ':' + th_b_st_time_m + ' до '
                + th_b_end_time_h + ':' + th_b_end_time_m + '.');
        }
    });

    $('#order-bottom').find('.customChckBox').live('click', function (ev) {
        var realChckBox = $('#' + this.id + 'Real');
        if (!($(ev.target).attr('disabled') !== undefined)) {
            realChckBox[0].click();
            if (realChckBox.is(':checked')) {
                $(ev.target).addClass('checked');
            }
            else {
                $(ev.target).removeClass('checked');
            }
        }
    });

    if ($("div").is(".increase_banner")) {
        $('.col-l').addClass('hideMenu')
        $('.col-r').hide();
    }
    ;

    ymaps.ready();

});
