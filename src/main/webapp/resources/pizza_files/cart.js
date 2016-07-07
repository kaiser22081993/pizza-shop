$(function () {
    $('.btn-add').live('click', cart_button_click);
    $('.btn-add2').live('click', cart_button_click);
    $('#facebox [rel="update_cart"]').live('click', cart_button_click);
    $('.order .btn-close').live('click', cart_button_click);
    $('.cart_item_count').live('change', cart_count_change);
});

function cart_button_click(e) {
    e.preventDefault();
    cart_update($(this).attr('href'));
}

function cart_count_change() {
    cart_update('/shop/cart/change/' + this.id.substring(3) + '/' + this.value + '/');
}

function cart_update(url) {
    _gaq.push(['_trackPageview', url]);
    var checkout_popup_exists = false;
    if ($('#facebox:visible').length) {
        if (url.indexOf('?') == -1)
            url += '?';
        else
            url += '&';
        url += 'checkout_popup=1';
        checkout_popup_exists = true;
    }
    if ($("#formType").attr('value') == 2) {
        if (url.indexOf('?') == -1)
            url += '?';
        else
            url += '&';
        url += 'from_restaurant=true';
    } else {
        if (url.indexOf('?') == -1)
            url += '?';
        else
            url += '&';
        url += 'from_restaurant=false';
    }
    var send_url;
    if (url.indexOf('?') == -1)
        send_url = url + '?';
    else
        send_url = url + '&';
    send_url += Math.random()
    $.ajax({
        url: send_url,
        success: function (data) {
            if (data.status == 'ok') {
                if ($('#cart_inline') && data.cart_inline) {
                    if (data.cart_inline.search('show_inline_cart') < 1)
                        $('#main_cart').fadeOut(function () {
                            $('#cart_inline').html(data.cart_inline);
                        });
                    $('#cart_inline').html(data.cart_inline);
                }
                $('#cart').html(data.html);
                /*if (checkout_popup_exists)
                 $('#facebox #order_details').html(data.checkout_cart_html);*/
                if (checkout_popup_exists) {
                    $('#dishList').replaceWith($(data.checkout_cart_html).find('#dishList'));
                    $('#inTotal').replaceWith($(data.checkout_cart_html).find('#inTotal'));
                }

                if (typeof data.popup_url === 'string')
                    if ('\v' == 'v') // test if IE
                        document.location = data.popup_url + '?next=' + escape(document.location);
                    else
                        $.facebox({ajax: data.popup_url}, {
                            opacity: 0.5,
                            closeButtonHTML: closeButtonText
                        });
                else if (data.action === 'close_facebox')
                    $(document).trigger('close.facebox');
            } else if (data.status === 'error') {
                alert(data.text);
            }
        },
    });
}

function cart_bl_add(url, bl_item, bl_selected) {
    cart_update(url + '?id=' + bl_item + '&selected=' + bl_selected);
}
