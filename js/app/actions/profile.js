/*
 * Copyright 2012, André Fiedler < http://twitter.com/sonnenkiste >
 * licensed under the MIT license.
 *
 * Inspired by HN mobile by Lim Chee Aun < http://github.com/cheeaun/hnmobile > and
 *          by Bombay-Crushed by the SaftigeKumquat team < http://github.com/SaftigeKumquat/Bombay-Crushed >
 */

(function(w, d){
    
    var $ = App.$;
    
    tappable('button.logout', {
        noScroll: true,
        onTap: function(e, target){
            State.session_key(null);
            State.user_id(null);
            State.sendToLogin(Navigation.currentView);
        }
    });
    
})(window, document);