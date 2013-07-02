var app = angular.module('app', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
          when('/welcome', {templateUrl: 'partials/welcome.html',   controller: Welcome}).
          otherwise({redirectTo: '/welcome'});   
}]);


app.factory('cordovaReady', function() {
  return function (fn) {

    var queue = [];

    var impl = function () {
      queue.push(Array.prototype.slice.call(arguments));
    };

    document.addEventListener('deviceready', function () {
      queue.forEach(function (args) {
        fn.apply(this, args);
      });
      impl = fn;
    }, false);

    return function () {
      return impl.apply(this, arguments);
    };
  };
});

app.factory('geolocation', function ($rootScope, cordovaReady) {
  return {
    getCurrentPosition: cordovaReady(function (onSuccess, onError, options) {
      navigator.geolocation.getCurrentPosition(function () {
        var that = this,
          args = arguments;

        if (onSuccess) {
          $rootScope.$apply(function () {
            onSuccess.apply(that, args);
          });
        }
      }, function () {
        var that = this,
          args = arguments;

        if (onError) {
          $rootScope.$apply(function () {
            onError.apply(that, args);
          });
        }
      },
      options);
    })
  };
});


FB.Event.subscribe('auth.login', function(response) {
                   alert('auth.login event');
                   });

FB.Event.subscribe('auth.logout', function(response) {
                   alert('auth.logout event');
                   });

FB.Event.subscribe('auth.sessionChange', function(response) {
                   alert('auth.sessionChange event');
                   });

FB.Event.subscribe('auth.statusChange', function(response) {
                   alert('auth.statusChange event');
                   });

/*function getSession() {
    alert("session: " + JSON.stringify(FB.getSession()));
}
*/
function getLoginStatus() {
    FB.getLoginStatus(function(response) {
                      if (response.status == 'connected') {
                      alert('logged in');
                      } else {
                      alert('not logged in');
                      }
                      });
}
var friendIDs = [];
var fdata;
function me() {
    FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
           if (response.error) {
           alert(JSON.stringify(response.error));
           } else {
           var data = document.getElementById('data');
           fdata=response.data;
           console.log("fdata: "+fdata);
           response.data.forEach(function(item) {
                                 var d = document.createElement('div');
                                 d.innerHTML = "<img src="+item.picture+"/>"+item.name;
                                 data.appendChild(d);
                                 });
           }
        var friends = response.data;
        console.log(friends.length); 
        for (var k = 0; k < friends.length && k < 200; k++) {
            var friend = friends[k];
            var index = 1;

            friendIDs[k] = friend.id;
            //friendsInfo[k] = friend;
        }
        console.log("friendId's: "+friendIDs);
           });
}

function logout() {
    FB.logout(function(response) {
              alert('logged out');
              });
}

function login() {
    FB.login(
             function(response) {
             if (response.session) {
             alert('logged in');
             } else {
             alert('not logged in');
             }
             },
             { scope: "email" }
             );
}


function facebookWallPost() {
    console.log('Debug 1');
    var params = {
        method: 'feed',
        name: 'Facebook Dialogs',
        link: 'https://developers.facebook.com/docs/reference/dialogs/',
        picture: 'http://fbrell.com/f8.jpg',
        caption: 'Reference Documentation',
        description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
      };
    console.log(params);
    FB.ui(params, function(obj) { console.log(obj);});
}

function publishStoryFriend() {
    randNum = Math.floor ( Math.random() * friendIDs.length ); 

    var friendID = friendIDs[randNum];
    if (friendID == undefined){
        alert('please click the me button to get a list of friends first');
    }else{
        console.log("friend id: " + friendID );
        console.log('Opening a dialog for friendID: ', friendID);
        var params = {
            method: 'feed',
            to: friendID.toString(),
            name: 'Facebook Dialogs',
            link: 'https://developers.facebook.com/docs/reference/dialogs/',
            picture: 'http://fbrell.com/f8.jpg',
            caption: 'Reference Documentation',
            description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
        };
        FB.ui(params, function(obj) { console.log(obj);});
    }
}

document.addEventListener('deviceready', function() {
                            alert("device is reaady");
                          try {
                          alert('Device is ready! Make sure you set your app_id below this alert.');
                          FB.init({ appId: "678702565479891", nativeInterface: CDV.FB, useCachedDialogs: false });
                          document.getElementById('data').innerHTML = "";
                          } catch (e) {
                          alert(e);
                          }
                          }, false);
      