
$(document).ready(function(){

    $(".menu-item").click(function(){
        console.log('item -click');
        $(".cells_cont").show();
        $(".cell_detail").hide();
    });
});

function onToggle(){
    console.log('cells click');
    $(".cells_cont").hide(75);
    $(".cell_detail").show(75);
}