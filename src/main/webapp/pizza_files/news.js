$(function() {
    $('.restaurant-selector').change(function() {
        var val = $(this).val();
        var href =  window.location.href;
        var q = "";
        var idx = href.indexOf('?');
        if (idx > 0)
            q = href.substring(idx);
        if (val != "")
            window.location = $(this).attr('href') + $(this).val() + '/' + q;
        else
            window.location = $(this).attr('href') + q;
    });
}); 
