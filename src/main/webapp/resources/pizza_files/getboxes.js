function getScript(e, t) {
    var n = document.createElement("script");
    n.src = e;
    var a = document.getElementsByTagName("head")[0],
        o = !1;
    n.onload = n.onreadystatechange = function() {
        o || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (o = !0, t(), n.onload = n.onreadystatechange = null, a.removeChild(n))
    }, a.appendChild(n)
}

function lbb_load_scripts() {
    window.$j = jQuery, getScript("//app.ezpopups.com/app/resources/js/front_end.js?v="+Math.random(), function() {
        $j("head").append('<link rel="stylesheet" href="//app.ezpopups.com/app/builder/fe_assets/css/front_end.css?v='+Math.random()+'" type="text/css" />');
        // $j.get("//app.ezpopups.com/timestamp.php" , {id:EZP.user_id}, function(data) {
	        var e = {
	            // timestamp: data,
	            url: window.location.toString(),
	            previewing: GET("lightboxbuilder_preview"),
	            preview_popup_id: GET("id"),
	            preview_popup_config: decodeURI(window.location.toString().split("?")[1]).QueryStringToJSON()
	        };

            var link_plus_get_data = "//app.ezpopups.com/getboxes.php?user_id=" + EZP.user_id + "&" + window.location.search.substring(1, window.location.search.length);
            $j.get(link_plus_get_data, e, function(e) {
                window.ezp_dom = e;

                window.ezp_dom_interval = setInterval(function(){
                    if(typeof LBB == 'undefined')
                    {
                        $j("body").prepend(ezp_dom);
                    }
                    else
                    {
                        lbb_load_libs();
                        clearInterval(ezp_dom_interval);
                    }
                }, 100);

	        });
        // });
    })
}

function lbb_load_libs()
{
    getScript("//app.ezpopups.com/app/resources/js/front_end_libs.js?v="+Math.random(), function() {
        lbb_init_all();
    });
}

function GET(e) {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var t = new RegExp("[\\?&]" + e + "=([^&#]*)"),
        n = t.exec(location.search);
    return null === n ? "" : decodeURIComponent(n[1].replace(/\+/g, " "))
}
"undefined" == typeof jQuery ? getScript("//app.ezpopups.com/standalone/js/jquery-1.11.2.min.js", function() {
    "undefined" == typeof jQuery ? console.log("ezPopups says: jQuery could not be loaded.") : lbb_load_scripts()
}) : lbb_load_scripts(), String.prototype.QueryStringToJSON = function() {
    href = this, qStr = href.replace(/(.*?\?)/, ""), qArr = qStr.split("&"), stack = {};
    for (var e in qArr) {
        var t;
        if (qArr[e].split) {
            t = qArr[e].split("=");
            var n = t[0],
                a = isNaN(t[1]) ? t[1] : parseFloat(t[1]);
            n.match(/(.*?)\[(.*?)]/) ? (n = RegExp.$1, name2 = RegExp.$2, name2 ? (n in stack || (stack[n] = {}), stack[n][name2] = a) : (n in stack || (stack[n] = []), stack[n].push(a))) : stack[n] = a
        }
    }
    return stack
};