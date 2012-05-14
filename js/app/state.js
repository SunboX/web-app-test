/*
 * Copyright 2012, André Fiedler < http://twitter.com/sonnenkiste >
 * licensed under the MIT license.
 *
 * Inspired by HN mobile by Lim Chee Aun < http://github.com/cheeaun/hnmobile > and
 *          by Bombay-Crushed by the SaftigeKumquat team < http://github.com/SaftigeKumquat/Bombay-Crushed >
 */

(function(w){
    
    var $ = App.$;

    w.State = {
        /**
          * Create an object that keeps the application state.
          * It's purpose is to bundle all data collected during runtime.
          */
        create: function() {
            var state = {
                fail: function(logmessage, errorcode) {
                    alert('Fehler Code ' + errorcode);
                },
                sendToLogin: function(currentView) {
                    var view = $('not-logged-in'),
                        title = 'Anmeldung';
                        
                    Navigation.lastSecureView = currentView;
                        
                    if(currentView === 'overview') title = 'Übersicht';
                    
                    view.querySelectorAll('header h1')[0].innerHTML = title;
                    
                    if (!Navigation.currentView){
                        Navigation.hideAllViews();
                        view.classList.remove('hidden');
                    } else if (Navigation.currentView != 'not-logged-in'){
                        Navigation.changeHard({
                            in: view,
                            out: $(Navigation.currentView),
                            direction: 'ltr'
                        });
                    }
                    Navigation.currentView = 'not-logged-in';
                },
                context: {
                    meta: {
                        currentpage: ''
                    }
                }
            };
        
    	    var session_key, user_id;
            
            // convenience..
            state.session_key = function(key) {
                if(key === undefined) {
                    if(session_key === undefined) {
                        session_key = amplify.store('lqfb-session_key');
                    }
                    return session_key;
                } else {
                    session_key = key;
                    amplify.store('lqfb-session_key', session_key);
                    return session_key;
                }
            };
            
            state.user_id = function(id) {
                if(id === undefined) {
                    if(user_id === undefined) {
                        user_id = amplify.store('lqfb-user_id');
                    }
                    return user_id;
                } else {
                    user_id = id;
                    amplify.store('lqfb-user_id', user_id);
                    return user_id;
                }
            };
            
            return state;
        }
    };

})(window);