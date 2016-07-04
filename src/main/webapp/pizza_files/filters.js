$(function() {
    $(document).click(function() {
        $('.drop_down .languages .content:not(:animated)').fadeOut(function() {
            $(this).parents('.drop_down').removeClass('activated');
        });
    });
    $(document).click(function() {
        $('.drop_down .phones .content:not(:animated)').fadeOut(function() {
            $(this).parents('.drop_down').removeClass('activated');
        });
    });
    $(document).click(function() {
        $('.drop_down .input .content:not(:animated)').fadeOut(function() {
            $(this).parents('.drop_down').removeClass('activated');
        });
    });
    $("a[rel=drop_link]").live('click', function(e) {
        e.preventDefault();
        var $drop_down = $(this).parents('.drop_down');
        var $obj = $drop_down.find('.content');
        if ($obj.is(':visible')) {
            $obj.fadeOut(function() {
                $drop_down.removeClass('activated');
            });
        } else {
            $drop_down.addClass('activated');
            $obj.fadeIn();
        }
    });
});
