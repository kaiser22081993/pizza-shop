
var app = angular.module('myApp', []);
var nextUrl = "rest/pizza";
var prevUrl = "rest/pizza";

app.controller('myCtrl',function ($scope, $http) {
    console.log("next ----")
    $http({
        method : "GET",
        url : nextUrl

    }).then(function mySucces(response) {
        $scope.pizzas = response.data;
        $scope.hs = response.headers("link");
        console.log(response.headers());




        nextUrl = parseLinkHeader(response.headers("link"))["next"]["href"];
        prevUrl = parseLinkHeader(response.headers("link"))["previous"]["href"];

    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });

    $scope.next = function(){
        console.log("next func!");
        $(".cells_cont").hide(200);

        $http({
            method : "GET",
            url : nextUrl

        }).then(function mySucces(response) {
            console.log("next func then");
            $scope.pizzas = response.data;
            $scope.hs = response.headers("link");
            console.log(response.headers());
            nextUrl = parseLinkHeader(response.headers("link"))["next"]["href"];
            prevUrl = parseLinkHeader(response.headers("link"))["previous"]["href"];


        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
        $(".cells_cont").show(200);
    };
    $scope.previous = function(){
        console.log("next func!");
        $(".cells_cont").hide(200);

        $http({
            method : "GET",
            url : prevUrl

        }).then(function mySucces(response) {
            console.log("next func then");
            $scope.pizzas = response.data;
            $scope.hs = response.headers("link");
            console.log(response.headers());
            nextUrl = parseLinkHeader(response.headers("link"))["next"]["href"];
            prevUrl = parseLinkHeader(response.headers("link"))["previous"]["href"];


        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
        $(".cells_cont").show(200);
    };
    $scope.firstName = "Oleh";
    $scope.lastName = "Kapustkin";

    $scope.getOne = function(index){
        $scope.targetPizza = $scope.pizzas[index];
    }


});






// Unquote string (utility)
function unquote(value) {
    if (value.charAt(0) == '"' && value.charAt(value.length - 1) == '"') return value.substring(1, value.length - 1);
    return value;
}

// Parse a Link header
function parseLinkHeader(header) {
    var linkexp = /<[^>]*>\s*(\s*;\s*[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g;
    var paramexp = /[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g;

    var matches = header.match(linkexp);
    var rels = new Object();
    for (i = 0; i < matches.length; i++) {
        var split = matches[i].split('>');
        var href = split[0].substring(1);
        var ps = split[1];
        var link = new Object();
        link.href = href;
        var s = ps.match(paramexp);
        for (j = 0; j < s.length; j++) {
            var p = s[j];
            var paramsplit = p.split('=');
            var name = paramsplit[0];
            link[name] = unquote(paramsplit[1]);
        }

        if (link.rel != undefined) {
            rels[link.rel] = link;
        }
    }

    return rels;
}




function format(s){
    var newS="";
    var flag = false;
    for (var i = 0;i < s.length; i++) {
        if(s[i]==="/"){
            flag = true;
            continue;
        }
        if(s[i]===">")return "rest/" + newS;
        if(flag){
            newS += s[i];
        }

    }
    return newS;
}
