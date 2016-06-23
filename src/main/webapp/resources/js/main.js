
$(document).ready(function(){

    $(".menu-item").click(function(){
        console.log('item -click');
        $(".cells_cont").show(200);
        $(".cell_detail").hide(200);
    });
});

function onToggle(){
    console.log('cells click');
    $(".cells_cont").hide(200);
    $(".cell_detail").show(200);
}