var nextUrl = "rest/pizza";
var prevUrl = "rest/pizza";
angular.module('Content')
    .controller('myCtrl', function ($scope, $http, $rootScope) {
        console.log("next ----");
        $http({
            method: "GET",
            url: nextUrl

        }).then(function mySucces(response) {
            $scope.pizzas = response.data;
            $scope.hs = response.headers("link");
            console.log(response.headers());
            $rootScope.pizzas = response.data;


            nextUrl = parseLinkHeader(response.headers("link"))["next"]["href"];
            prevUrl = parseLinkHeader(response.headers("link"))["previous"]["href"];

        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });

        $rootScope.next = function () {
            console.log("next func!");
            $(".cells_cont").hide(200);

            $http({
                method: "GET",
                url: nextUrl

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
        $rootScope.previous = function () {
            console.log("next func!");
            $(".cells_cont").hide(200);

            $http({
                method: "GET",
                url: prevUrl

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

        $rootScope.ordered = [];
        $rootScope.totalSum = 0;

        $scope.getOne = function (index) {
            $scope.targetPizza = $scope.pizzas[index];
        };
        $scope.isInOrders = function (title) {
            for (var i = 0; i < $rootScope.ordered.length; i++) {
                if ($rootScope.ordered[i].pizza.title === title) {
                    return true;
                }
            }
            return false;
        };
        $scope.findInOrders = function (title) {
            for (var i = 0; i < $rootScope.ordered.length; i++) {
                if ($rootScope.ordered[i].pizza.title === title) {
                    return $rootScope.ordered[i];
                }
            }
            return null;
        };
        $scope.addToOrders = function addT(index) {
            var item = {
                pizza: $scope.pizzas[index],
                quantity: 1
            };
            if (!$scope.isInOrders($scope.pizzas[index].title)) {
                $rootScope.ordered.push(item);
                $rootScope.totalSum += item.pizza.price;
            }
            else {
                $scope.findInOrders(item.pizza.title).quantity++;
                $rootScope.totalSum += item.pizza.price;
            }

        };
        $rootScope.changeOrderQuantity = function (index) {

            var sum = 0;
            try{
                $rootScope.ordered.forEach(function (p) {
                    sum += p.pizza.price * p.quantity;
                });
            }
            catch (e){
                alert('wrong input');
            }
            $rootScope.totalSum = sum;
        };
        $rootScope.fields = {
            userName : "",
            userAddress : "",
            userPhone : ""
        };

        $rootScope.orders = [];
        $rootScope.commitOrder = function () {

            var order = {
                customer: $scope.fields.userName,
                date: "today",
                canceled: false,
                address: $scope.fields.userAddress,
                phone: $scope.fields.userPhone,

                item : $rootScope.ordered
            };
            $rootScope.orders.push(order);
            if($scope.fields.userName === "" || $scope.fields.userAddress === "" || $scope.fields.userPhone === ""){
                alert('All fields must be completed!');
                return;
            }
            $http({
                method: "POST",
                url: "rest/order",
                data: order

            }).then(function mySucces(response) {
                alert('order added!')
            }, function myError(response) {
                alert(response.statusText);
            });

            $rootScope.totalSum = 0;
            $rootScope.ordered = [];
        };


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


function format(s) {
    var newS = "";
    var flag = false;
    for (var i = 0; i < s.length; i++) {
        if (s[i] === "/") {
            flag = true;
            continue;
        }
        if (s[i] === ">")return "rest/" + newS;
        if (flag) {
            newS += s[i];
        }

    }
    return newS;
}
