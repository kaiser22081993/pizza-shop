
var bl_global_key = 'bl_selected';

function business_lunch_over(obj) {
    $(obj).addClass('business_lunch_selected');
}

function business_lunch_out(obj) {
    $(obj).removeClass('business_lunch_selected');
}

function business_lunch_select(obj) {
    var childs = $(obj).parent().children();
    var level = $($(obj).parent()).attr('id').substring(6) - 1;
    for (var i = 0; i < childs.size(); i++) {
        $(childs[i]).removeClass('business_lunch_cart');
    }
    $(obj).addClass('business_lunch_cart');
    var id = $(obj).attr('id').substring(5);
    bl_selected[level] = id;
    try {
        localStorage[bl_global_key] = JSON.stringify(bl_selected);
    } catch(err) { }
    bl_current_cost = '0';
    bl_item = 0;
    for (var i = 0; i < bl_selected.length; i++) {
        if (bl_selected[i])
        if (bl_data[bl_selected[i]] != undefined)
        if (bl_costs[bl_data[bl_selected[i]]] > bl_current_cost) {
            bl_current_cost = bl_costs[bl_data[bl_selected[i]]];
            bl_item = bl_data[bl_selected[i]];
        }
    }
    bl_item = bl_data[id];
    $('#current_cost').text(bl_current_cost);
}

function business_lunch_init(bl_key) {
    if (bl_key) {
        bl_global_key = bl_key;
    }
    try {
        _bl_selected = JSON.parse(localStorage[bl_global_key]);
    } catch(err) {
        _bl_selected = null;
    }
    if (!_bl_selected && bl_selected) {
        _bl_selected = bl_selected;
    }
    for (var i = 0; i < bl_selected.length; i++) {
        obj = "";
        if (_bl_selected[i])
            obj = $('#item_' + _bl_selected[i]);
        if (obj.length == 0)
            obj = $('#item_' + bl_selected[i]);
        business_lunch_select(obj);
    }
}
