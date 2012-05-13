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
            alert('not implemented yet');
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