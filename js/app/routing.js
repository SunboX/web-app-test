/*
 * Copyright 2012, André Fiedler < http://twitter.com/sonnenkiste >
 * licensed under the MIT license.
 *
 * Inspired by HN mobile by Lim Chee Aun < http://github.com/cheeaun/hnmobile > and
 *          by Bombay-Crushed by the SaftigeKumquat team < http://github.com/SaftigeKumquat/Bombay-Crushed >
 */

(function(w, d){
    
    var App = w.App,
        $ = App.$,
        hideAllViews = Navigation.hideAllViews,
        flip = Navigation.flip,
        slide = Navigation.slide,
        changeHard = Navigation.changeHard,
        routes = {
            '/': function(){
                var view = $('overview');
                if (!Navigation.currentView){
                    hideAllViews();
                    view.classList.remove('hidden');
                } else if (Navigation.currentView != 'overview'){
                    slide({
                        in: view,
                        out: $(Navigation.currentView),
                        direction: 'ltr'
                    });
                }
                Navigation.currentView = 'overview';
            },
            '/overview': function(){
                if(!State.session_key()) {
                	State.sendToLogin('overview');
            		return;
            	}
                
                var view = $('overview');
                if (!Navigation.currentView){
                    hideAllViews();
                    view.classList.remove('hidden');
                } else if (Navigation.currentView != 'overview'){
                    var fn = Navigation.menuOpen ? changeHard : slide;
                        
                    fn({
                        in: view,
                        out: $(Navigation.currentView),
                        direction: 'ltr'
                    });
                }
                Navigation.currentView = 'overview';
            },
            '/topics': function(){
                var view = $('topics');
                if (!Navigation.currentView){
                    hideAllViews();
                    view.classList.remove('hidden');
                } else if (Navigation.currentView != 'topics'){
                    var fn = Navigation.menuOpen ? changeHard : slide;
                    
                    fn({
                        in: view,
                        out: $(Navigation.currentView),
                        direction: 'ltr'
                    });
                }
                Navigation.currentView = 'topics';
            },
            '/contacts': function(){
                var view = $('contacts');
                if (!Navigation.currentView){
                    hideAllViews();
                    view.classList.remove('hidden');
                } else if (Navigation.currentView != 'contacts'){
                    var fn = Navigation.menuOpen ? changeHard : slide;
                    
                    fn({
                        in: view,
                        out: $(Navigation.currentView),
                        direction: 'ltr'
                    });
                }
                Navigation.currentView = 'contacts';
            },
            '/profile': function(){
                var view = $('profile');
                if (!Navigation.currentView){
                    hideAllViews();
                    view.classList.remove('hidden');
                } else if (Navigation.currentView != 'profile'){
                    var fn = Navigation.menuOpen ? changeHard : slide;
                    
                    fn({
                        in: view,
                        out: $(Navigation.currentView),
                        direction: 'ltr'
                    });
                }
                Navigation.currentView = 'profile';
            },
            '/timeline': function(){
                var view = $('timeline');
                if (!Navigation.currentView){
                    hideAllViews();
                    view.classList.remove('hidden');
                } else if (Navigation.currentView != 'timeline'){
                    var fn = Navigation.menuOpen ? changeHard : slide;
                    
                    fn({
                        in: view,
                        out: $(Navigation.currentView),
                        direction: 'ltr'
                    });
                }
                Navigation.currentView = 'timeline';
            },
            '/about': function(){
                var view = $('about');
                if (!Navigation.currentView){
                    hideAllViews();
                    view.classList.remove('hidden');
                } else if (Navigation.currentView != 'about'){
                    var fn = Navigation.menuOpen ? changeHard : slide;
                    
                    fn({
                        in: view,
                        out: $(Navigation.currentView),
                        direction: 'ltr'
                    });
                }
                Navigation.currentView = 'about';
            }
        };
    
    Navigation.routes = routes;
	
	Router(routes).configure({
		on: function(){
			amplify.store('lqfb-togo-hash', location.hash);
		},
		notfound: function(){
			location.hash = '/';
		}
	}).init(amplify.store('lqfb-togo-hash') || '/');
	
})(window, document);