function Welcome($scope){

    
    document.addEventListener('deviceready', function() {
                              try {      
                                  console.log(FB);
                              FB.init({ appId: "678702565479891", nativeInterface: CDV.FB, useCachedDialogs: false });
                                  
                              } catch (e) {
                              alert(e);
                              }
                              }, false);
    
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
}