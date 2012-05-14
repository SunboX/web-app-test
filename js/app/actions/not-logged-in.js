/*
 * Copyright 2012, André Fiedler < http://twitter.com/sonnenkiste >
 * licensed under the MIT license.
 *
 * Inspired by HN mobile by Lim Chee Aun < http://github.com/cheeaun/hnmobile > and
 *          by Bombay-Crushed by the SaftigeKumquat team < http://github.com/SaftigeKumquat/Bombay-Crushed >
 */

(function(w, d){
    
    var $ = App.$;
    
    /* view */
    
    tappable('#not-logged-in button', {
        noScroll: true,
        onTap: function(e, target){
            Navigation.showLoginWindow();
        }
    });
    
    /* window */
    
    tappable('#login-window button.login', {
        noScroll: true,
        onTap: function(e, target){
            
            var key = $('login-api-key').value;
            
            lqfb_api.query('/session', { key: key }, function(res){
                if(res.status === 'not found'){
                    alert('Der API-Key ' + key + ' ist ungültig!');
                } else {
                    
                    State.session_key(res.session_key);
                    
                    lqfb_api.query('/info', {}, function(res) {
                        State.user_id(res.current_member_id);
                        Navigation.showLastSecure();
                    });
                }
            }, function(e){ alert(e); }, 'POST');
            
            Navigation.hideLoginWindow();
        }
    });
    
    tappable('#login-window button.cancel', {
        noScroll: true,
        onTap: function(e, target){
            Navigation.hideLoginWindow();
        }
    });
    
})(window, document);