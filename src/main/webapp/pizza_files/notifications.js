// Config
// Set to false to disable console output
var mafia_debug_enabled = true;

// Cities which also serve as URL pointers and tags
var mafia_cities = ["kiev", "kharkov", "dnepropetrovsk", "vinnitsa", "mariupol", "lvov", "simferopol"];


// Init OneSignal based on language
if (mafia_getCookie("lang")=="ru"){
    // Init OneSignal
    console.log('2121');
    var OneSignal = OneSignal || [];
    OneSignal.push(["init", {
      // ff88cac1-7cfa-4b5d-8ca4-8e26d3588240
      appId: "ff88cac1-7cfa-4b5d-8ca4-8e26d3588240",
      safari_web_id: 'web.onesignal.auto.14469d21-a548-446f-9323-a0e21fc14d38',
      subdomainName: 'mafiaua',   
      notifyButton: {
          enable: true, // Set to false to hide
          size: 'medium', // One of 'small', 'medium', or 'large'
          prenotify: true, // Show an icon with 1 unread message for first-time site visitors
          showCredit: false, // Hide the OneSignal logo
          text: {
              'tip.state.unsubscribed': 'Subscribe to notifications',
              'tip.state.subscribed': "You're subscribed to notifications",
              'tip.state.blocked': "You've blocked notifications",
              'message.prenotify': 'Click to subscribe to notifications',
              'message.action.subscribed': "Thanks for subscribing!",
              'message.action.resubscribed': "You're subscribed to notifications",
              'message.action.unsubscribed': "You won't receive notifications again",
              'dialog.main.title': 'Manage Site Notifications',
              'dialog.main.button.subscribe': 'SUBSCRIBE',
              'dialog.main.button.unsubscribe': 'UNSUBSCRIBE',
              'dialog.blocked.title': 'Unblock Notifications',
              'dialog.blocked.message': "Follow these instructions to allow notifications:"
        }
      }
    }]);   
}
else {
  console.log('dsds');
    // Init OneSignal
    var OneSignal = OneSignal || [];
    OneSignal.push(["init", {
      appId: "ff88cac1-7cfa-4b5d-8ca4-8e26d3588240",
      safari_web_id: 'web.onesignal.auto.14469d21-a548-446f-9323-a0e21fc14d38',
      subdomainName: 'mafiaua',
      notifyButton: {
          enable: true, // Set to false to hide
          size: 'medium', // One of 'small', 'medium', or 'large'
          prenotify: true, // Show an icon with 1 unread message for first-time site visitors
          showCredit: false, // Hide the OneSignal logo
          text: {
              'tip.state.unsubscribed': 'Subscribe to notifications',
              'tip.state.subscribed': "You're subscribed to notifications",
              'tip.state.blocked': "You've blocked notifications",
              'message.prenotify': 'Click to subscribe to notifications',
              'message.action.subscribed': "Thanks for subscribing!",
              'message.action.resubscribed': "You're subscribed to notifications",
              'message.action.unsubscribed': "You won't receive notifications again",
              'dialog.main.title': 'Manage Site Notifications',
              'dialog.main.button.subscribe': 'SUBSCRIBE',
              'dialog.main.button.unsubscribe': 'UNSUBSCRIBE',
              'dialog.blocked.title': 'Unblock Notifications',
              'dialog.blocked.message': "Follow these instructions to allow notifications:"
        }
      }
    }]);  
}
// Get cookie easily
function mafia_getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
// Function for debugging
function mafia_debug(message){
    if (mafia_debug_enabled){
        console.log(message);      
    }
}

// Set proper tag if doesn't exist
function mafia_set_city_tag(city){
    
    OneSignal.push(["getTags", function(tags) {
        mafia_debug(tags);
        
        if (tags.city!=city){
        
            mafia_debug("Found different value for tag city so setting tag "+ city);
            
            OneSignal.push(["sendTag", "city", city, function(tagsSent) {
                mafia_debug("Added city tag "+ city);
            }]);
        }
        else
            mafia_debug("User already has tag "+city);
    }]);
}
// Match city and ask notification permission
function mafia_match_city(){

    // Var for loop
    var i;

    OneSignal.push(function() {
        if (OneSignal.isPushNotificationsSupported()){
            mafia_debug("Push notifications are supported");
            
            OneSignal.push(["isPushNotificationsEnabled", function(enabled) {
                if (enabled){
                    
                    // Test if we're in correct city page
                    for (i = 0; i < mafia_cities.length; i++) { 
                        if  (mafia_getCookie("city")==mafia_cities[i]){
                            
                            mafia_debug("FOUND");
                            
                            mafia_set_city_tag(mafia_cities[i]);
                            
                            // Stop loop
                            break;
                            
                        }
                        else {
                            mafia_debug("No matching city found");
                        }
                    }  
                }
                else
                    mafia_debug("Notifications not enabled by user");
            }]);
        }
    });
    OneSignal.push(["getUserId", function(userId) {
      if(userId == null) {
        window.setTimeout(function() {
                  OneSignal.push(["registerForPushNotifications"]);
                }, 30000);
      }
    }]);
}


$(document).ready(function() {
    // start
    mafia_match_city(); 
});
